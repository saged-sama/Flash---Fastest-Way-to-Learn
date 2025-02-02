import React from 'react';
// import logo from '../../assets/logo.png'; // Adjust the path as necessary

const HomeFooter = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 rounded-3xl">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
                        <h2 className="text-5xl font-bold text-orange-300 mt-10 ">Flash</h2>
                        <p className="mt-2">The fastest way to learn</p>
                    </div>
                    <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
                        <ul className="list-none">
                            <li className="inline-block mx-2">
                                <a href="#" className="hover:text-gray-400">Home</a>
                            </li>
                            <li className="inline-block mx-2">
                                <a href="#" className="hover:text-gray-400">About</a>
                            </li>
                            <li className="inline-block mx-2">
                                <a href="#" className="hover:text-gray-400">Services</a>
                            </li>
                            <li className="inline-block mx-2">
                                <a href="#" className="hover:text-gray-400">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 text-center md:text-right">
                        <div className="flex justify-center md:justify-end">
                            <a href="#" className="mx-2 hover:text-gray-400">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="mx-2 hover:text-gray-400">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="mx-2 hover:text-gray-400">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="mx-2 hover:text-gray-400">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>


                <div className="social flex space-x-4 justify-center">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 ease-in-out hover:scale-125">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.675 0h-21.35C.596 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.326 24h11.495v-9.294H9.847v-3.622h2.974V8.413c0-2.937 1.795-4.544 4.414-4.544 1.254 0 2.332.093 2.646.135v3.066h-1.814c-1.423 0-1.697.676-1.697 1.667v2.185h3.393l-.442 3.622h-2.951V24h5.788C23.405 24 24 23.405 24 22.675V1.326C24 .595 23.405 0 22.675 0z" />
                        </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 ease-in-out hover:scale-125">
                        <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.33 3.608 1.304.975.975 1.242 2.242 1.304 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.33 2.633-1.304 3.608-.975.975-2.242 1.242-3.608 1.304-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.33-3.608-1.304-.975-.975-1.242-2.242-1.304-3.608C2.175 15.792 2.163 15.412 2.163 12s.012-3.584.07-4.849c.062-1.366.33-2.633 1.304-3.608.975-.975 2.242-1.242 3.608-1.304C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.745 0 8.332.015 7.053.072 5.7.131 4.392.397 3.286 1.503 1.978 2.812 1.712 4.12 1.653 5.473 1.595 6.752 1.58 7.165 1.58 12c0 4.835.015 5.248.072 6.527.059 1.353.325 2.661 1.632 3.968 1.106 1.106 2.414 1.371 3.768 1.43C8.332 23.985 8.745 24 12 24c3.255 0 3.668-.015 4.947-.072 1.353-.059 2.661-.325 3.968-1.632 1.106-1.106 1.371-2.414 1.43-3.768.057-1.279.072-1.692.072-6.527 0-4.835-.015-5.248-.072-6.527-.059-1.353-.325-2.661-1.632-3.968-1.106-1.106-2.414-1.371-3.768-1.43C15.668.015 15.255 0 12 0z" />
                            <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                        </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 ease-in-out hover:scale-125">
                        <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.957-2.178-1.554-3.594-1.554-2.72 0-4.924 2.204-4.924 4.924 0 .386.044.762.127 1.124C7.69 8.094 4.066 6.13 1.64 3.161c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.317 0-.626-.031-.928-.089.626 1.956 2.444 3.379 4.6 3.419-1.68 1.318-3.809 2.104-6.102 2.104-.396 0-.787-.023-1.175-.068 2.179 1.397 4.768 2.211 7.557 2.211 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.635.961-.694 1.797-1.562 2.457-2.549z" />
                        </svg>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 ease-in-out hover:scale-125">
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184C17.968 2.514 12 2.514 12 2.514s-5.968 0-7.615.67C3.229 3.524 2.568 4.229 2.364 5.25 2 7.193 2 12 2 12s0 4.807.364 6.75c.204 1.021.865 1.726 2.021 2.066 1.647.67 7.615.67 7.615.67s5.968 0 7.615-.67c1.157-.34 1.818-1.045 2.021-2.066.364-1.943.364-6.75.364-6.75s0-4.807-.364-6.75c-.204-1.021-.865-1.726-2.021-2.066zM9.545 15.568v-7.136L15.454 12l-5.909 3.568z" />
                        </svg>
                    </a>
                </div>



                <div className="text-center mt-8">
                    <p className="text-gray-500">&copy; 2023 Flash. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default HomeFooter;
