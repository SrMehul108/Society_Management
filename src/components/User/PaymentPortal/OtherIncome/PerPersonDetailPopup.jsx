import React from "react";

function PerPersonDetailPopup({
    isOpen,
    onClose,
    onGetPass,
    selectedMembers,
    setSelectedMembers,
    totalAmount,
    perPersonAmount,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg w-full max-w-md sm:w-96 md:w-[450px] lg:w-[500px]">
                <h2 className="text-lg font-bold mb-3 border-b-2 pb-4">Detail of the Per Person</h2>

                {/* Per Person Amount */}
                <div className="mb-3 flex justify-between">
                    <div>
                        <label className="block font-medium mb-1">Per Person Amount:</label>
                    </div>
                    <div className="text-gray-700">₹ {perPersonAmount.toLocaleString()}</div>
                </div>

                {/* Select Member */}
                <div className="mb-3">
                    <label className="block font-medium mb-1">Select Member:</label>
                    <select
                        className="w-full border border-gray-300 rounded-md px-4 py-1"
                        value={selectedMembers}
                        onChange={(e) => setSelectedMembers(Number(e.target.value))} // Update members
                    >
                        {[...Array(10).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                                {num + 1}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Total Amount */}
                <div className="mb-4 flex justify-between">
                    <div>
                        <label className="block font-medium mb-1">Total Amount:</label>
                    </div>
                    <div className="text-gray-950 font-bold">₹ {totalAmount.toLocaleString()}</div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <div className="w-1/2">
                        <button
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 w-full"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="w-1/2">
                        <button
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full"
                            onClick={onGetPass} // Trigger the Get Pass Popup
                        >
                            Get Pass
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PerPersonDetailPopup;
