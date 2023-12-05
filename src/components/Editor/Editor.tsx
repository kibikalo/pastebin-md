import React, { FunctionComponent, useRef } from "react";

interface EditorProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const Editor: FunctionComponent<EditorProps> = ({ markdown, setMarkdown, textAreaRef }) => {
    return (
        <div className="rounded-l-[20px] bg-gray-600 border-r-2 border-gray-500">
            <textarea 
                ref={textAreaRef}
                className="w-full h-full resize-none outline-none p-6 text-gray-200 box-border rounded-l-[20px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-600 bg-gray-600"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
            >
            </textarea>
        </div>
    );
}

export default Editor;