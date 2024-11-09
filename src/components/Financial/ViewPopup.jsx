import React from "react";

function ViewPopup({ itemDetails, onClose }) {
    return (
       
        <>
            {/* Popup content */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50  ">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-600 text-2xl"
                    >
                        &times;
                    </button>

                    {/* Popup details content */}
                    <h2 className="text-lg font-bold mb-4 text-black">View Maintenance Details</h2>
                    <div className="flex items-center mb-4">
                        <img
                            src="https://via.placeholder.com/50"
                            alt="Cody Fisher"
                            className="rounded-full h-12 w-12"
                        />
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-black">Cody Fisher</h3>
                            <p className="text-gray-500">Feb 10, 2024</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="">
                            <div className="text-gray-700">Wing:</div>
                            <div className="text-gray-900 font-medium">A</div>
                        </div>
                        <div>
                            <div className="text-gray-700">Unit:</div>
                            <div className="text-gray-900 font-medium">1001</div>
                        </div>
                        <div>
                            <div className="text-gray-700">Status:</div>
                            <div className="text-gray-900 font-medium">Owner</div>
                        </div>
                        <div>
                            <div className="text-gray-700">Amount:</div>
                            <div className="text-green-400 font-medium">₹ 1000</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <div className="text-gray-700">Penalty:</div>
                            <div className="text-gray-900 font-medium">--</div>
                        </div>
                        <div>
                            <div className="text-gray-700"> Status:</div>
                            <div className="text-yellow-500 font-medium">Pending</div>
                        </div>
                        <div>
                            <div className="text-gray-700">Payment :</div>
                            <div className="text-gray-900 font-medium">Cash</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Overlay */}
            
        </>
    );
}

export default ViewPopup;
