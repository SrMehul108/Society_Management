import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import reset from '../../assets/image/forget.png';
import '../../assets/css/login/login.css';
import { Link } from 'react-router-dom';

export default function Resetpassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [formData, setFormData] = useState({ password: '', cpassword: '' });
    const isFormValid = formData.password && formData.cpassword && formData.password === formData.cpassword;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left side */}
            <div className="hidden lg:flex flex-1 flex-col justify-center px-8 lg:px-20 xl:px-24 bg-gray-200">
                <div className="w-full max-w-sm lg:w-96 mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            <span className='dash'>Dash</span>Stack
                        </h2>
                    </div>
                    <div className="relative mb-8">
                        <img src={reset} alt="Society Management Illustration" className="w-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 pt-10 lg:pt-20">
                <div className="mx-auto w-full max-w-md lg:max-w-lg bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Reset Password</h2>
                    <form
                        className="space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setShowError(true);
                        }}
                    >
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password*
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                                        showError ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password*
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="cpassword"
                                    name="cpassword"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 ${
                                        showError ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="••••••••"
                                    value={formData.cpassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {showError && !isFormValid && (
                            <div className="text-red-500 text-sm mt-1">Passwords do not match.</div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
                                style={{ backgroundColor: isFormValid ? '#FE512E' : 'gray' }}
                                disabled={!isFormValid}
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="hidden lg:block absolute top-0 right-1/2 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
            <div className="hidden lg:block absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-orange-100/20 to-transparent" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
        </div>
    );
}
