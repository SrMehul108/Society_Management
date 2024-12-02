import React from 'react';

const PaymentFormPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Payment Method</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">
                            Card Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Marcus George"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">
                            Card Number<span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="1234 5678 8745 5212"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <img src="/path-to-card-icon.png" alt="Card Icon" className="w-6 h-6" />
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium">
                                Expiry Date<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="11/12"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <img src="/path-to-calendar-icon.png" alt="Calendar Icon" className="w-5 h-5" />
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">
                                CVV<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="225"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-6 gap-3 ">
                        <div className='w-1/2 '>
                            <button
                                onClick={onClose}
                                type="button"
                                className="px-4 py-2 border text-gray-700 rounded-md hover:bg-gray-300 transition w-full"
                            >
                                Cancel
                            </button>

                        </div>
                        <div className='w-1/2 '>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition w-full"
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentFormPopup;
