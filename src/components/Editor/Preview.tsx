import React from "react";
import {marked, parse} from 'marked';
import DOMPurify from 'dompurify';
import hljs from "highlight.js"
import 'highlight.js/styles/tokyo-night-dark.css'

interface PreviewProps {
    markdown: string;
}

export default function Preview({markdown} : PreviewProps) {
    const renderer = new marked.Renderer();

    renderer.code = (code, language) => {
        const validLang = !!(language && hljs.getLanguage(language));
        const highlightedCode = validLang
            ? hljs.highlight(language, code).value
            : code;

        return `<pre class="hljs"><code>${highlightedCode}</code></pre>`;
    };

    marked.setOptions({
        renderer,
        langPrefix: 'hljs language-',
    });

    const parsed = DOMPurify.sanitize(marked.parse(markdown));

    return (
    <div className="box-border rounded-r-[20px] bg-gray-700">
        <div 
            className="p-6 overflow-y-auto prose prose-invert prose-a:text-pink-600 box-border rounded-r-[20px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-600 bg-gray-700"
            dangerouslySetInnerHTML={{__html: parsed }}
        />
    </div>
    );
}