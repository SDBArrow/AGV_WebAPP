import React from 'react';
import logo2 from '../../Image/logo2.png';

function Image() {
    return (
        <div className="ml-0 sm:ml-24">
            <p className="text-center text-3xl mt-10 text-blue-400 sm:mt-24">AGV WebAPP</p>
            <img className="rounded-lg sm:h-72 mt-10 sm:mt-24 w-96 shadow-2xl" src={logo2} aria-hidden alt="Image" />
        </div>
    );

}
export default Image;