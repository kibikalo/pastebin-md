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
    <div>
        <div className="w-full bg-gray-900 p-3 text-grey-200 uppercase tracking-wider">
            Preview
        </div>
        <div 
            className="p-6 prose prose-invert prose-a:text-pink-500" 
            dangerouslySetInnerHTML={{__html: parsed }}
        />
    </div>
    );
}