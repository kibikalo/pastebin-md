import React from "react";

interface EditorProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
}

export default function Editor({markdown, setMarkdown} : EditorProps) {
    return (
    <div className="border-r-2 border-gray-600">
        <div className="w-full bg-gray-900 p-3 text-grey-200 uppercase tracking-wider ">
            Markdown
        </div>
        <textarea 
          className="w-full h-full bg-gray-800 outline-none p-6 text-gray-200" 
          onChange={(e) => setMarkdown(e.target.value)}
        > 
            {markdown}
        </textarea>
    </div>
    );
}