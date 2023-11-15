import React, { useState } from 'react';

const TypeButton = ({ onSelect, selectedValue}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value) => {
        onSelect(value);
        setIsOpen(false); // Close the dropdown
        console.log("On TypeButton click value: " + value);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedValue}
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-blue-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"> 
                    <div className="py-1 ">
                        {['Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years'].map((value) => (
                            <div 
                                key={value}
                                className="text-gray-200 block px-4 py-2 text-sm"
                                onClick={() => handleSelect(value)}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypeButton;