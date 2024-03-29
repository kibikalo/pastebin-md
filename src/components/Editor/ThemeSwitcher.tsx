import React, { useState, useEffect } from 'react';

const ThemeSwitcher: React.FC = () => {
    // State to manage whether dark mode is enabled
    const [isDark, setIsDark] = useState(false);

    // Effect to load the theme initially
    useEffect(() => {
        const savedTheme = getCookie('theme');
        const isDarkMode = savedTheme === 'dark' ? true : window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(isDarkMode);
    }, []);

    // Effect to apply the theme and store it in a cookie
    useEffect(() => {
        document.body.className = isDark ? 'dark' : 'light';
        setCookie('theme', isDark ? 'dark' : 'light', 180);
    }, [isDark]);

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    
    function getCookie(name) {
        let cookieArr = document.cookie.split(";");
        for(let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
            if(name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    return (
        <button onClick={() => setIsDark(!isDark)} className="rounded-full">
            <div className={`relative w-14 h-8 bg-gray-200 dark:bg-gray-600 rounded-full p-1 transition-all duration-300`}>
                <div
                    className={`absolute left-1 top-1 bg-light-active-component dark:bg-dark-active-component border border-light-border dark:border-dark-border w-6 h-6 rounded-full transition-all duration-300 ${
                        isDark ? 'translate-x-6' : ''
                    }`}
                >
                    {isDark ? (
                        // Moon Icon for Dark Mode
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"></path>
                        </svg>
                    ) : (
                        // Sun Icon for Light Mode
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path>
                        </svg>
                    )}
                </div>
            </div>
        </button>
    );
};

export default ThemeSwitcher;