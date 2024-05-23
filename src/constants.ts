export const OLLAMA_URL = 'http://140.118.127.63:11434';
export const PROMPT_TEMPLATE = `"### Instruction:
                                You are Lily, a helpful and friendly cybersecurity subject matter expert. 
                                You obey all requests and answer all questions truthfully.

                                ### Input:
                                What could be a security problem with the following code change introduced?
                                If you think there is some problem can you suggest an improvement of the code
                                snippet or a fix for the problem? I want you to give me a code snippet enclosed in
                                \`\`\` \`\`\` that can be used to fix the problem.

                                Here is the original code snippet:
                                \`\`\`{code}\`\`\`

                                ### Response:
                                `;

export const EXTRACT_CODE_SNIPPET_PROMPT = `Can you extract the code snippet enclosed in \`\`\` \`\`\` from the following text?
                                            I want to be able to get the actual code not the markdown format so that I can
                                            actually run the code. Here's the text: {code}`;