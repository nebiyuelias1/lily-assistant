// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from 'path';
import * as vscode from 'vscode';
import * as child_process from 'child_process';
import { constructPrompt, generateOllamaResponse } from './utilities';
import { PROMPT_TEMPLATE } from './constants';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "lily-assistant" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('lily-assistant.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from VS code!');
	});

	let modifyDiffDisposable = vscode.commands.registerCommand('lily-assistant.modifyDiff', () => {
		// Get the currently open file
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found');
			return;
		}
	
		const filePath = editor.document.fileName;

		// Get the directory of the file
		const fileDir = path.dirname(filePath);
	
		// Execute the Git diff command
		child_process.exec(`git diff "${filePath}"`,  { cwd: fileDir }, (error, stdout, stderr) => {
			if (error) {
				vscode.window.showErrorMessage(`Error getting diff: ${error.message}`);
				return;
			}
	
			if (stderr) {
				vscode.window.showErrorMessage(`Error getting diff: ${stderr}`);
				return;
			}
	
			// The diff is in stdout
			console.log(stdout);
			
			const diffCheckFailed = true;
			// Here you can add your diff checking logic
			// If the diff check fails, suggest changes to the user
			if (diffCheckFailed) {
				const prompt = constructPrompt(PROMPT_TEMPLATE, stdout);
				console.log(prompt);
				generateOllamaResponse({
					model: "lily",
					prompt,
					stream: false
				}).then(response => {
					vscode.window.showInformationMessage(response.response, { modal: true }, 'Apply Changes').then(async selectedAction => {
							if (selectedAction === 'Apply Changes') {
								// Apply the changes
								const edit = new vscode.WorkspaceEdit();
								const activeEditor = vscode.window.activeTextEditor;
								if (activeEditor) {
									const document = activeEditor.document;
									const fullRange = new vscode.Range(
										document.positionAt(0),
										document.positionAt(document.getText().length)
									);
									// Extract code snippet within ```python ``` in the response
									const regex = /^```(?:\w+)?\s*\n(.*?)(?=^```)```/msg;
									const codeSnippet = regex.exec(response.response);

									console.log('code snippet', codeSnippet);
									if (!codeSnippet) {
										vscode.window.showErrorMessage('No code snippet found in response');
										return;
									}
									edit.replace(document.uri, fullRange, codeSnippet[1]);
									vscode.workspace.applyEdit(edit);
							}
						}
					});
				});

			}
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(modifyDiffDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
