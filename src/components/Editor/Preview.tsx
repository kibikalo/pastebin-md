import React from "react";
import {marked, parse} from 'marked';
import DOMPurify from 'dompurify';
import hljs from "highlight.js"
import 'highlight.js/styles/tokyo-night-dark.css'
// import 'highlight.js/styles/atom-one-dark.css'

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
    <div className="max-h-screen preview-component text-light-text bg-light-background dark:text-dark-text dark:bg-dark-background">
        <div 
            className="w-full py-6 pl-8 pr-4 prose text-light-text bg-light-background dark:text-dark-text dark:bg-dark-background overflow-y prose-invert scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-600"
            dangerouslySetInnerHTML={{__html: parsed }}
        />
    </div>
    );
}