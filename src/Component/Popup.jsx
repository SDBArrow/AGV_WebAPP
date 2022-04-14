import React from 'react';

function Popup(props) {
    const { children, inputValue } = props;
    return (props.trigger) ? (
        <div className="grid justify-items-center fixed inset-0 h-screen bg-gray-900/50 z-50">
            <div className="relative p-4 h-auto self-center">
                <div className="bg-white w-80 md:w-[40rem] h-20">
                    <button type="button" className="grid justify-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto items-center dark:hover:bg-gray-800 dark:hover:text-white"  onClick={() => props.setButtonPop(false)}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    <p className='ml-5'>{children}{inputValue}</p>
                </div>
            </div>
        </div>
    ) : "";
}


export default Popup

