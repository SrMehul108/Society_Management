import React from 'react';

function SecurityProtocols({ closeModal }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Security Protocol</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Title*</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter Title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Description*</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter Description"
                        />
                    </div>
                    <div className='flex gap-2' >
                        <div className="flex justify-center gap-4 mt-4 w-1/2">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 border rounded-md w-full"
                            >
                                Cancel
                            </button>

                        </div>
                        <div className="flex justify-center gap-4 mt-4 w-1/2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white rounded-md w-full"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SecurityProtocols;
