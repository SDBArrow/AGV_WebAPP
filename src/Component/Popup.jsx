import React from 'react';
import './Popup.css';

export default function Popup(props) {
    const { inputValue } = props;
    return (props.trigger)?(
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={()=>props.setButtonPop(false)}>close</button>
                    <p>{inputValue}</p>
            </div>
        </div>
    ):"";
}

