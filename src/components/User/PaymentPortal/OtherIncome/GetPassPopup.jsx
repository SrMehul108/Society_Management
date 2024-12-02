import React, { useState } from "react";
import OtherPaymentPopup from "./OtherPaymentPopup";

const GetPassPopup = ({ isOpen, onClose, selectedMembers, totalAmount, perPersonAmount }) => {
    if (!isOpen) return null;
    //payment Popup
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOpenPopup = () => setPopupOpen(true);
    const handleClosePopup = () => setPopupOpen(false);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm sm:max-w-md">
                <h2 className="text-lg font-bold mb-4 border-b-2 pb-2">Detail of the Per Person</h2>

                {/* Payment Details */}
                <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                        <span>Per Person Amount:</span>
                        <span className="font-medium">₹ {perPersonAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span >Total Members:</span>
                        <span className="font-medium">{selectedMembers}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-semibold">
                        <span className="text-gray-800 font-bold">Total Amount:</span>
                        <span className="font-bold text-black">₹ {totalAmount.toLocaleString()}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                    <div className="w-1/2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition w-full"
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="w-1/2">
                        <button className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition w-full" onClick={handleOpenPopup}>
                            Pay Now
                        </button>
                    </div>
                    <OtherPaymentPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                </div>
            </div>
        </div>
    );
};

export default GetPassPopup;
