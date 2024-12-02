import React from "react";

function ComplaintCreact({ closeModal }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 sm:p-8 rounded-lg max-w-md w-full mx-4 sm:mx-0">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Create Complaint</h2>
                
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Complaint Name*</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 text-sm"
                            placeholder="Evelyn Harper"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Complaint Type*</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 text-sm"
                            placeholder="Unethical Behavior"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Description*</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 text-sm"
                            placeholder="Enter Description"
                        />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className='w-full sm:w-1/2'>
                            <label className="block text-sm font-medium">Wing*</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2 text-sm"
                                placeholder="Enter Wing"
                            />
                        </div>
                        <div className='w-full sm:w-1/2'>
                            <label className="block text-sm font-medium">Unit*</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2 text-sm"
                                placeholder="Enter Unit"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium">Priority*</label>
                        <div className="flex gap-2 sm:gap-6 pt-2 flex-wrap">
                            <label className='border px-4 py-2 rounded-lg text-sm'>
                                <input type="radio" name="priority" className="mr-1" />
                                High
                            </label>
                            <label className='border px-4 py-2 rounded-lg text-sm'>
                                <input type="radio" name="priority" className="mr-1" />
                                Medium
                            </label>
                            <label className='border px-4 py-2 rounded-lg text-sm'>
                                <input type="radio" name="priority" className="mr-1" />
                                Low
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium">Status*</label>
                        <div className="flex gap-2 sm:gap-6 pt-2 flex-wrap">
                            <label className='border px-4 py-2 rounded-lg text-sm'>
                                <input type="radio" name="status" className="mr-1" />
                                Open
                            </label>
                            <label className='border px-4 py-2 rounded-lg text-sm'>
                                <input type="radio" name="status" className="mr-1" />
                                Pending
                            </label>
                            <label className='border px-4 py-2 rounded-lg text-sm'>
                                <input type="radio" name="status" className="mr-1" />
                                Solve
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="w-full sm:w-1/2 px-4 py-2 border rounded-md text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-1/2 px-4 py-2 bg-orange-500 text-white rounded-md text-sm"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ComplaintCreact;
