import React from "react";

const SavePasteModal = ( {isVisible, onClose} ) => {

    if ( !isVisible ) {
        return null;
    }

    const handleClose = (e) => {
        if ( e.target.id === 'save-paste-wrapper') {
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-color-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
             id="save-paste-wrapper"
             onClick={handleClose}>
            <div className="w-[600px] flex flex-col">
                <button className="place-self-end bg-gray-700 rounded p-4 hover:bg-gray-600"
                        onClick={() => onClose()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>
                </button>
                <div className="bg-white text-slate-900 p-4 rounded-md">
                    <div className="grid grid-cols-2 grid-rows-4 gap-4">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavePasteModal;