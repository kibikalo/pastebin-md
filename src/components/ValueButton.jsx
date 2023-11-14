import React, { useState } from 'react';

const ValueButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Expiration type');

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false); // Close the dropdown
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
                    <div className="py-1 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-blue-300" style={{ maxHeight: '260px' }}>
                        {['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'].map((value) => (
                            <a 
                                key={value}
                                href="#"
                                className="text-gray-200 block px-4 py-2 text-sm"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent the default anchor behavior
                                    handleSelect(value);
                                }}
                            >
                                {value}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ValueButton;