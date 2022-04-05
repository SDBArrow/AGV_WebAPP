import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import 'flowbite';

function Header(props) {

    const navigate = useNavigate();
    const [navbaropen, setnavbaropen] = useState(false)

    function SignOut() {
        localStorage.removeItem('jwt')
        navigate('/Sign')
    }

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <span className="flex items-center self-center text-xl font-semibold whitespace-nowrap dark:text-white"><Link to="/">React ROS AGV</Link></span>
                <div className="flex gap-3 md:order-2 mr-1">
                    <span className="block py-2 pr-4 pl-3 self-center text-gray-700 border-b border-gray-100  md:border-0 md:p-0 dark:text-gray-400 dark:border-gray-700">{props.firstname}</span>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={SignOut}>登出</button>
                    <button type="button" className="inline-flex items-center p-2 text-3xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setnavbaropen(!navbaropen)} aria-controls="mobile-menu-4" aria-expanded="false">
                        <ion-icon name ={navbaropen ? "close":"menu"}></ion-icon>
                    </button>
                </div>
                <div className={`justify-between items-center w-full md:flex md:w-auto md:order-1 ${navbaropen ? 'h-50':'hidden'}`}>
                    <ul className={`flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium `}>
                        <li>
                            <span className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><Link to="/">首頁</Link></span>
                        </li>
                        <li>
                            <span className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><Link to="/HighCtrl">管理介面</Link></span>
                        </li>
                        <li>
                            <span className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><Link to="/GeneralCtrl">控制介面</Link></span>
                        </li>
                        <li>
                            <span className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><Link to="/UserSet">個人資料</Link></span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}
export default Header;