import React, { FunctionComponent, KeyboardEvent } from "react";

interface EditorProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const Editor: FunctionComponent<EditorProps> = ({ markdown, setMarkdown, textAreaRef }) => {

    // Handles automatic continuation of List elements
    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && textAreaRef.current) {
            const { selectionStart } = textAreaRef.current;
            const lines = markdown.split('\n');
            let currentLine = markdown.substring(0, selectionStart).split('\n').length - 1;

            if (lines[currentLine].startsWith('- ')) {
                // Check if current list item is empty (only contains '- ')
                if (lines[currentLine].trim() === '-') {
                    // Replace current line with empty line
                    lines[currentLine] = '';
                } else {
                    // Continue with new unordered list item
                    lines.splice(currentLine + 1, 0, '- ');
                }
                event.preventDefault();
                const newText = lines.join('\n');
                setMarkdown(newText);
            } else if (lines[currentLine].match(/^\d+\.\s/)) {
                // Check if current list item is empty (only contains '1. ')
                const numberMatch = lines[currentLine].match(/^(\d+)\.\s/);
                if (numberMatch && lines[currentLine].trim() === `${numberMatch[1]}.`) {
                    // Replace current line with empty line
                    lines[currentLine] = '';
                } else {
                    // Continue with new ordered list item
                    const number = numberMatch ? parseInt(numberMatch[1], 10) + 1 : 1;
                    lines.splice(currentLine + 1, 0, `${number}. `);
                }
                event.preventDefault();
                const newText = lines.join('\n');
                setMarkdown(newText);
            }
        }
    };

    return (
        <div className="rounded-l-[20px] bg-gray-600 border-r-2 border-gray-500">
            <textarea 
                ref={textAreaRef}
                className="w-full h-full resize-none outline-none p-6 text-gray-200 box-border rounded-l-[20px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-600 bg-gray-600"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                onKeyDown={handleKeyDown}
            >
            </textarea>
        </div>
    );
}

export default Editor;