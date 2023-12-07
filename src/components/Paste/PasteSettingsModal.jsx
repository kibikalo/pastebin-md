import React from "react";
import { useState } from "react";
import TypeButton from './TypeButton.jsx';
import ValueButton from './ValueButton.jsx';
import Checkbox from './BurnOnReading.jsx';
import SaveButton from './SaveButton.jsx';
import { expirationTypeMapping } from '../../constants/ExpirationTypeMapping.js';
import { expirationValueMapping } from '../../constants/ExpirationValueMapping.js';

const PasteSettingsModal = ({ isVisible, onClose, markdown }) => {

    // State for the Expiration Type selection
    const [expirationType, setExpirationType] = useState('NULL');
    // State for the Expiration Value selection
    const [expirationValue, setExpirationValue] = useState('0');
    // State for the Burn On Reading selection
    const [burnOnReading, setBurnOnReading] = useState(false);

    // Handler function to update the Expiration Type state
    const handleSelectExpirationType = (value) => {
        if (!burnOnReading) { // Only update if burnOnReading is not checked
        setExpirationType(value);
        }
    };

    // Handler function to update the Expiration Value state
    const handleSelectExpirationValue = (value) => {
        if (!burnOnReading) { // Only update if burnOnReading is not checked
        setExpirationValue(value);
        }
    };

    // Handler function to update the burnOnReading state
    const handleBurnOnReadingChange = (isChecked) => {
        setBurnOnReading(isChecked);
        if (isChecked) {
        setExpirationType('NULL');
        setExpirationValue('0');
        }
    };

    // Save onSuccess handler
    const onSuccess = (response) => {
        alert(`Paste created! URL: http://localhost:8080/${response.hash}`);
    };

    // Save onError handler 
    const onError = (error) => {
        alert('Failed to create paste: ' + error);
    };
    
    if ( !isVisible ) {
        return null;
    }

    // Handles closing window on clicking at any place
    const handleClose = (e) => {
        if ( e.target.id === 'save-paste-wrapper') {
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-color-gray-500 backdrop-blur-sm"
             id="save-paste-wrapper"
             onClick={handleClose}>
            <div className="w-[500px] flex flex-col gap-y-2">

                {/* Close button */}
                <button className="w-8 p-1 rounded place-self-end bg-slate-600 hover:bg-slate-500"
                        onClick={() => onClose()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>
                </button>

                <div className="p-4 text-white rounded-md bg-slate-700">
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                        <span>Expiration Type</span>
                        <TypeButton className="paste-type-button"
                                    onSelect={handleSelectExpirationType} 
                                    selectedValue={Object.keys(expirationTypeMapping).find(key => expirationTypeMapping[key] === expirationType) || 'Select Expiration Type'}/>

                        <span>Expiration Value</span>
                        <ValueButton    className="paste-value-button"
                                        onSelectValue={handleSelectExpirationValue}
                                        selectedValue={Object.keys(expirationValueMapping).find(key => expirationValueMapping[key] === expirationValue) || 'Select Expiration Value'}/>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <Checkbox   className="paste-burn-checkbox place-self-center"
                                    checked={burnOnReading} 
                                    onChange={(e) => handleBurnOnReadingChange(e.target.checked)} />

                        <SaveButton 
                          markdown={markdown} 
                          expirationValue={expirationValue}
                          expirationType={expirationType}
                          burnOnReading={burnOnReading} 
                          onSuccess={onSuccess} 
                          onError={onError} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PasteSettingsModal;