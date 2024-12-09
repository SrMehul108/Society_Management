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
                <div className="flex items-center mb-4">
                    <img
                        src={itemDetails?.profile_image || "https://via.placeholder.com/50"}
                        alt={itemDetails?.fullName || "Profile"}
                        className="rounded-full h-12 w-12"
                    />
                    <div className="ml-4">
                        <h3 className="text-lg font-medium text-black">
                            {itemDetails?.fullName || "N/A"}
                        </h3>
                        <p className="text-gray-500">{itemDetails?.createdDate || "N/A"}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                        <div className="text-gray-700">Wing:</div>
                        <div className="text-gray-900 font-medium">{itemDetails.metaData.wing || "N/A"}</div>
                    </div>
                    <div>
                        <div className="text-gray-700">Unit:</div>
                        <div className="text-gray-900 font-medium">{itemDetails.metaData.unit || "N/A"}</div>
                    </div>
                    <div>
                        <div className="text-gray-700">Status:</div>
                        <div className="text-gray-900 font-medium">
                            {itemDetails.metaData?.type || "N/A"}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-700">Amount:</div>
                        <div className="text-green-400 font-medium">
                            ₹ {itemDetails.payments.amount || "0"}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <div className="text-gray-700">Penalty:</div>
                        <div className="text-gray-900 font-medium">
                            {itemDetails.payments.penalty || "--"}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-700">Status:</div>
                        <div
                            className={`font-medium ${
                                itemDetails?.payments?.paymentStatus ? "text-green-500" : "text-yellow-500"
                            }`}
                        >
                            {itemDetails?.payments?.paymentStatus ? "Completed" : "Pending"}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-700">Payment:</div>
                        <div className="text-gray-900 font-medium">
                            {itemDetails?.payments?.paymentType || "N/A"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default ViewPopup;
