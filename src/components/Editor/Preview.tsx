import React, { useRef, useEffect } from "react";
import {marked, parse} from 'marked';
import DOMPurify from 'dompurify';
import hljs from "highlight.js"
import 'highlight.js/styles/tokyo-night-dark.css'
// import 'highlight.js/styles/atom-one-dark.css'

interface PreviewProps {
    markdown: string;
    
    scrollPercentage: number | null;
    scrollSource: string;
    onPreviewScroll: (percentage: number) => void;
}

export default function Preview({ markdown, scrollPercentage, scrollSource, onPreviewScroll }) {

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

    // Sync Scroll
    const previewRef = useRef<HTMLDivElement>(null);
    const SCROLL_TOLERANCE = 0.01; // Represents 1% change

    const handleScroll = () => {
        if (previewRef.current) {
            const scrollElement = previewRef.current;
            const scrollPercent = scrollElement.scrollTop / (scrollElement.scrollHeight - scrollElement.clientHeight);
            
            console.log(`Handle scroll: scrollTop: ${scrollElement.scrollTop}`);
            console.log(`Scroll Height: ${scrollElement.scrollHeight} --- ClientHeight: ${scrollElement.clientHeight}`);
            console.log(`Scroll Percent: ${scrollPercent}`);
            console.log(scrollSource);

            onPreviewScroll(scrollPercent);
        }
    };
 
    useEffect(() => {
        // console.log(`Effect running in ${scrollSource}, received percentage: ${scrollPercentage}`);
        if (previewRef.current && scrollSource === 'editor') {
            const scrollElement = previewRef.current;
            const currentScrollPercent = scrollElement.scrollTop / (scrollElement.scrollHeight - scrollElement.clientHeight);
            const newScrollTop = scrollPercentage * (scrollElement.scrollHeight - scrollElement.clientHeight);

            if (Math.abs(currentScrollPercent - scrollPercentage) > SCROLL_TOLERANCE) {
                scrollElement.scrollTop = newScrollTop;
            }

            // console.log(`Attempting to set scrollTop: ${newScrollTop}`);
            // console.log(`scrollHeight: ${scrollElement.scrollHeight}, clientHeight: ${scrollElement.clientHeight}`);
            
            // scrollElement.scrollTop = newScrollTop;
        }
    }, [scrollPercentage]);

    return (
    <div className="preview text-light-text bg-light-background dark:text-dark-text dark:bg-dark-background">
        <div 
            ref={previewRef}
            onScroll={handleScroll}
            className="py-6 pl-10 pr-10 prose max-w-none prose-blockquote:border-l-light-border prose-a:text-pink-500 prose-img:max-w-[40%] prose-strong:font-bold dark:prose-blockquote:border-l-dark-border preview-max-height text-light-text bg-light-background dark:text-dark-text dark:bg-dark-background dark:prose-invert scrollbar-thin scrollbar-thumb-light-border scrollbar-track-light-button-back dark:scrollbar-thumb-dark-border dark:scrollbar-track-dark-button-back"
            dangerouslySetInnerHTML={{__html: parsed }}
        />
    </div>
    );
}