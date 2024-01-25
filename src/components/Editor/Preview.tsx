import React, { useRef, useEffect } from "react";
import {marked, parse} from 'marked';
import DOMPurify from 'dompurify';
import hljs from "highlight.js"
import 'highlight.js/styles/tokyo-night-dark.css'
// import 'highlight.js/styles/atom-one-dark.css'

interface PreviewProps {
    markdown: string;

    setScrollPercentage: (percentage: number) => void;
    setScrollSource: () => void;
    scrollPercentage: number | null;
    scrollSource: string;
    onPreviewScroll: (percentage: number) => void;
}

export default function Preview({ markdown, setScrollPercentage, setScrollSource, scrollPercentage, scrollSource, onPreviewScroll }) {

    const previewRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (previewRef.current) {
            const scrollElement = previewRef.current;
            const scrollPercent = scrollElement.scrollTop / (scrollElement.scrollHeight - scrollElement.clientHeight);
            console.log("Preview Scroll:", scrollPercent);
            onPreviewScroll(scrollPercent);
        }
    };

    useEffect(() => {
        console.log(`Effect running in ${scrollSource}, received percentage: ${scrollPercentage}`);
        if (scrollPercentage !== null && previewRef.current && scrollSource === 'editor') {
            const scrollElement = previewRef.current;
            const newScrollTop = scrollPercentage * (scrollElement.scrollHeight - scrollElement.clientHeight);
            scrollElement.scrollTop = newScrollTop;
            console.log(`Preview set scrollTop to: ${newScrollTop}`);
        }
    }, [scrollPercentage]);

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
    <div className="preview text-light-text bg-light-background dark:text-dark-text dark:bg-dark-background">
        <div 
            ref={previewRef}
            onScroll={handleScroll}
            className="w-full py-6 pl-8 pr-4 mx-3 prose preview-max-height text-light-text bg-light-background dark:text-dark-text dark:bg-dark-background dark:prose-invert scrollbar-thin scrollbar-thumb-light-active-component scrollbar-track-light-button-back dark:scrollbar-thumb-dark-active-component dark:scrollbar-track-dark-button-back"
            dangerouslySetInnerHTML={{__html: parsed }}
        />
    </div>
    );
}