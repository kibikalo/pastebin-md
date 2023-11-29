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
    <div className="border-solid border-y-2 border-x-2 border-gray-600 box-border"
        // style={{ height: '650px' }}
        >
        {/* <div className="w-full bg-gray-900 p-3 text-grey-200 uppercase tracking-wider rounded-t-lg">
            Preview
        </div> */}
        <div 
            className="overflow-y-contain p-6 prose prose-invert prose-a:text-pink-600 box-border rounded-lg scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700"
            dangerouslySetInnerHTML={{__html: parsed }}
        />
    </div>
    );
}