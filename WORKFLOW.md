# AI Workflow Comparison

## Overview

This assignment was completed in two different AI-assisted development rounds to compare the quality of AI output based on prompt quality.

## Round 1

In the first round, I used a simple prompt to generate a React contact form. The AI created a basic form with a modern design, but it was missing several important features. The submit button only printed the form data to the browser console. There was no form validation, no success message, no loading state, and no user feedback. I accepted the initial output and saved it as the first version.

## Round 2

For the second round, I started a fresh branch and wrote a much more detailed prompt. I specified that the project should use React functional components, JavaScript, pure CSS, a glassmorphism dark theme, responsive design, animations, validation, loading states, and beginner-friendly code. The generated result was much closer to my expectations and required fewer manual changes.

## AI Mistakes I Found

One issue I found was that the submit button did not give any visible feedback after submission. I fixed this by adding validation, a loading state, and a success message.

Another issue occurred when I asked the AI to replace the native HTML select elements with custom dropdown components. The generated implementation caused display problems and covered parts of the page. After testing it, I decided to use the native HTML select elements again because they were more stable and easier to maintain.

## Comparison

Compared with Round 1, the second version included:

- Better prompt instructions.
- Required field validation.
- Email and phone validation.
- Loading indicator during submission.
- Success notification after submission.
- Improved user experience.
- Cleaner project structure.
- Less manual debugging.

Although writing the second prompt took more time, the overall development process was faster because the generated code required fewer corrections.

## Lessons Learned

This assignment showed me that AI produces much better results when given clear requirements and constraints. A detailed prompt reduces mistakes, improves code quality, and saves time during review. I also learned that every AI-generated solution should be tested before accepting it because some generated features may introduce unexpected bugs.