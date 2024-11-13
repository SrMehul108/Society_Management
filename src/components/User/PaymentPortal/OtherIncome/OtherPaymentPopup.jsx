import React, { useState } from 'react';

import OtherPaymentFormPopup from './OtherPayment';

const OtherPaymentPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;


    // payment formpopup
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOpenPopup = () => setPopupOpen(true);
    const handleClosePopup = () => setPopupOpen(false);


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Payment Method</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md cursor-pointer">
                        <div className="flex items-center space-x-2">
                            <img src="/path-to-mastercard-icon.png" alt="Master Card" className="w-6 h-6" />
                            <p className="font-semibold text-gray-700">Master Card</p>
                        </div>
                        <input type="radio" name="paymentMethod" className="form-radio text-orange-500" />
                    </div>

                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md cursor-pointer">
                        <div className="flex items-center space-x-2">
                            <img src="/path-to-visa-icon.png" alt="Visa Card" className="w-6 h-6" />
                            <p className="font-semibold text-gray-700">Visa Card</p>
                        </div>
                        <input type="radio" name="paymentMethod" className="form-radio text-orange-500" />
                    </div>

                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md cursor-pointer">
                        <div className="flex items-center space-x-2">
                            <img src="/path-to-cash-icon.png" alt="Cash Payment" className="w-6 h-6" />
                            <p className="font-semibold text-gray-700">Cash Payment</p>
                        </div>
                        <input type="radio" name="paymentMethod" className="form-radio text-orange-500" />
                    </div>
                </div>

                <div className="flex justify-between mt-6 gap-2">
                    <div className='w-1/2 '>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border text-gray-700 rounded-md hover:bg-gray-300 transition w-full"
                        >
                            Cancel
                        </button>

                    </div>
                    <div className='w-1/2'>
                        <button
                            onClick={handleOpenPopup}
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition w-full"
                        >
                            Pay Now
                        </button>
                        <OtherPaymentFormPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherPaymentPopup;
