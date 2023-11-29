import React from "react";

interface EditorProps {
    markdown: string;
    setMarkdown: (markdown: string) => void;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const Editor: React.FC<EditorProps> = ({ markdown, setMarkdown, textAreaRef }) => {

    return (
    <div className="border-dashed border-y-2 border-l-2 border-gray-600">
        {/* <div className="w-full bg-gray-900 p-3 text-grey-200 uppercase tracking-wider rounded-t-lg">
            Markdown
        </div> */}
        <textarea 
        //   ref={textAreaRef}
          className="w-full h-full resize-none bg-gray-800 outline-none p-6 text-gray-200 box-border rounded-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700"
          style={{ height: 'calc(100% - 3rem)' }}
          onChange={(e) => setMarkdown(e.target.value)}
          value={markdown}
        >
        </textarea>
    </div>
    );
}

export default Editor;