export const OLLAMA_URL = 'http://140.118.127.63:11434';
export const PROMPT_TEMPLATE = `"### Instruction:
                                You are Lily, You are a coding assistant focused on security.
                                You are tasked with reviewing code changes for security vulnerabilities.
                                When you make a suggestion, your suggestion must have identical functionality
                                to the original code snippet. You can assume that the code snippet is correct.

                                A: Identify the security problem in the code snippet.
                                \`\`\`
                                import sqlite3

                                def get_user(username):
                                    connection = sqlite3.connect('my_database.db')
                                    cursor = connection.cursor()

                                    # Vulnerable to SQL Injection
                                    cursor.execute(f"SELECT * FROM users WHERE username = '{username}'")
                                    user = cursor.fetchone()

                                    return user
                                \`\`\`
                                The problem in the selected code is that it's vulnerable to SQL Injection attacks. 
                                This can be fixed by using parameterized queries instead of string formatting. Here's how you can do it:
                                \`\`\`python
                                import sqlite3

                                def get_user(username):
                                    connection = sqlite3.connect('my_database.db')
                                    cursor = connection.cursor()

                                    # Use a parameterized query to prevent SQL Injection
                                    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
                                    user = cursor.fetchone()

                                    return user
                                \`\`\`

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