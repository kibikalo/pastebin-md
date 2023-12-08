export const handleEnter = (event, textAreaRef, markdown, setMarkdown) => {
    if (textAreaRef.current) {
        const { selectionStart } = textAreaRef.current;
        const lines = markdown.split('\n');
        let currentLine = markdown.substring(0, selectionStart).split('\n').length - 1;

        if (lines[currentLine].startsWith('- ')) {
            if (lines[currentLine].trim() === '-') {
                lines[currentLine] = '';
            } else {
                lines.splice(currentLine + 1, 0, '- ');
            }
            event.preventDefault();
            const newText = lines.join('\n');
            setMarkdown(newText);
        } else if (lines[currentLine].match(/^\d+\.\s/)) {
            const numberMatch = lines[currentLine].match(/^(\d+)\.\s/);
            if (numberMatch && lines[currentLine].trim() === `${numberMatch[1]}.`) {
                lines[currentLine] = '';
            } else {
                const number = numberMatch ? parseInt(numberMatch[1], 10) + 1 : 1;
                lines.splice(currentLine + 1, 0, `${number}. `);
            }
            event.preventDefault();
            const newText = lines.join('\n');
            setMarkdown(newText);
        }
    }
};