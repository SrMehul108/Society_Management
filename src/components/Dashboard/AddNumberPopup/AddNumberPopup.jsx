import React, { useState, useEffect } from 'react';

function AddNumberPopup({ mode = 'add', initialData = {}, onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        work: '',
    });

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setFormData(initialData);
        }
    }, [mode, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        // Save logic here, you can differentiate by mode if needed
        console.log("Form Data:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4">{mode === 'edit' ? 'Edit Important Number' : 'Add Number'}</h2>
                <form>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">
                            Full Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">
                            Phone Number<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Work</label>
                        <input
                            type="text"
                            name="work"
                            value={formData.work}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </form>
                <div className="flex justify-between mt-6 gap-2">
                    <div className='w-1/2'>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 w-full"
                        >
                            Cancel
                        </button>

                    </div>
                    <div className='w-1/2'>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-orange-600 w-full"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNumberPopup;
