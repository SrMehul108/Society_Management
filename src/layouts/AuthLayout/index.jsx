import React from 'react'
import { Outlet } from 'react-router'
import loginImage from '../../assets/image/login.png';
import '../../assets/css/login/login.css';

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 relative">
            {/* Left Side */}
            <div className="hidden lg:flex flex-1 flex-col justify-center px-8 sm:px-10 lg:px-20 xl:px-24 bg-gray-200 z-index">
            <h1 className="text-3xl font-bold block text-gray-900 fixed" style={{top:'55px', left: '95px', fontSize:'50px'}}><span className='dash'>Dash</span>Stack</h1>
                <div>
                    <img src={loginImage} alt="Society Management Illustration" className="w-full object-cover" />
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 lg:pt-20 z-index">
                <div className="mx-auto w-full max-w-md lg:max-w-lg login-background p-6 bg-white rounded-lg shadow-md">
                    <Outlet/>
                </div>
            </div>

            {/* Background Gradient Decorations */}
            <div style={{ top: '-81px' }} className="fixed right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden lg:block right-side"></div>
        </div>
  )
}
