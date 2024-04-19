import React from 'react';
import logo from '../assets/images/logo.svg';
import { IoIosSearch } from "react-icons/io";


class Sidebar extends React.Component {
    render() {
        return (
            <>
                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>

                <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 oxerflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <a className="flex items-center ps-2.5 mb-5">
                            <img src={logo} className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">NekoX</span>
                        </a>
                        <p className="text-white py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum qui fugiat, debitis quaerat voluptas nesciunt.</p>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    {/* <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg> */}
                                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                        <rect width="35" height="35" fill="url(#pattern0_5_158)" />
                                        <defs>
                                            <pattern id="pattern0_5_158" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                <use xlink:href="#image0_5_158" transform="scale(0.00195312)" />
                                            </pattern>
                                            <image id="image0_5_158" width="512" height="512" xlink:href="data:image/png;base64,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" />
                                        </defs>
                                    </svg>
                                    <span className="ms-3">Search</span>
                                </a>
                            </li>
                       
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        <path d="M18 0H4C1.791 0 0 1.791 0 4v13c0 2.209 1.791 4 4 4h14c2.209 0 4-1.791 4-4V4c0-2.209-1.791-4-4-4Zm1 17c0 .551-.449 1-1 1H4c-.551 0-1-.449-1-1V4c0-.551.449-1 1-1h14c.551 0 1 .449 1 1v13Zm-5.414-7.414l-3 3a.999.999 0 0 1-1.414 0l-1-1a.999.999 0 1 1 1.414-1.414l.293.293 2.293-2.293a.997.997 0 0 1 1.414 0l1.293 1.293a.999.999 0 1 1-1.414 1.414Z" />
                                    </svg>
                                    <span className="ms-3">Updates</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        <path d="M11 5.029c-2.276 0-4.093 1.56-4.68 4.39a1 1 0 0 0 1.962.34 5.5 5.5 0 0 1 10.436 0 1 1 0 0 0 1.962-.341c-.588-2.83-2.405-4.39-4.68-4.39Zm8.75 1.288a.999.999 0 0 0-.922-.678c-1.453-.079-2.733-.746-3.798-1.686a.999.999 0 0 0-1.42 1.403c1.432 1.473 3.367 2.287 5.42 2.376a.999.999 0 0 0 .72-1.415ZM4.171 5.039a1 1 0 0 0-1.422-1.4A8.434 8.434 0 0 0 0 12.246c0 1.824.586 3.5 1.586 4.883a1 1 0 0 0 1.636-1.128A6.44 6.44 0 0 1 2 12.246c0-1.368.436-2.629 1.171-3.672.235-.37.099-.863-.332-1.127ZM11 6.5c1.64 0 3.08.996 3.697 2.522a1 1 0 1 0 1.866-.798A5.497 5.497 0 0 0 11 6.5Z" />
                                    </svg>
                                    <span className="ms-3">How to use</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="p-4 sm:ml-64">
                    {/* Main content */}
                </div>
            </>
        );
    }
}

export default Sidebar;
