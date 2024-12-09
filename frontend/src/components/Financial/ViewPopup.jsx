import React from "react";

function ViewPopup({ itemDetails, onClose }) {
    return (
        <>
            {/* Popup content */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="text-gray-700">Amount:</div>
                            <div className="text-gray-900 font-medium">
                                ₹ {itemDetails?.amount || "N/A"}
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-700">Penalty Amount:</div>
                            <div className="text-gray-900 font-medium">
                                ₹ {itemDetails?.penaltyAmount || "N/A"}
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-700">Penalty Days:</div>
                            <div className="text-gray-900 font-medium">
                                {itemDetails?.penaltyDay || "N/A"}
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-700">Due Date:</div>
                            <div className="text-gray-900 font-medium">
                                {new Date(itemDetails?.dueDate).toLocaleDateString() || "N/A"}
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-700">Created Date:</div>
                            <div className="text-gray-900 font-medium">
                                {itemDetails?.createdDate || "N/A"}
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-700">Society ID:</div>
                            <div className="text-gray-900 font-medium">
                                {itemDetails?.societyId || "N/A"}
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-700">Active Status:</div>
                            <div className={`font-medium ${itemDetails?.isActive ? "text-green-500" : "text-red-500"}`}>
                                {itemDetails?.isActive ? "Active" : "Inactive"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewPopup;
