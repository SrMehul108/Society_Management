import React, { useState } from 'react';
import owner from '../../assets/image/owner.jpg'
import { EyeOffIcon } from 'lucide-react';
import { userRegistration } from '../../apis/api'; 

export const ViewTenant = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [tenantDetails, setTenantDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Fetch tenant details from the API
    useEffect(() => {
        const fetchTenantDetails = async () => {
            if (isSidebarOpen) {
                setLoading(true);
                setError(null);
                try {
                    const response = await userRegistration(); 
                    if (!response.ok) {
                        throw new Error("Failed to fetch tenant details");
                    }
                    const data = await response.json();
                    setTenantDetails(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchTenantDetails();
    }, [isSidebarOpen]);

    return (
        <>
            <div className="flex bg-gray-100">
                {/* Button to open sidebar */}
                <button
                    onClick={toggleSidebar}
                    className="m-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    View Tenant Details
                </button>

                {/* Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    ></div>
                )}

                {/* Sidebar */}
                <div
                    className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transition-transform transform ${
                        isSidebarOpen ? "translate-x-0" : "translate-x-full"
                    } z-50`}
                >
                    <div className="p-6">
                        {/* Close button */}
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-600 hover:text-gray-800 font-bold mb-4"
                        >
                            &larr; View Tenant Details
                        </button>

                        {/* Loading state */}
                        {loading && <p>Loading...</p>}

                        {/* Error state */}
                        {error && <p className="text-red-500">{error}</p>}

                        {/* Tenant Details */}
                        {tenantDetails && (
                            <>
                                {/* Profile Information */}
                                <div className="flex flex-col items-center text-center mb-6">
                                    <img
                                        src={owner} // Replace with default image
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full mb-2"
                                    />
                                    <h2 className="text-lg font-semibold">{tenantDetails.name}</h2>
                                    <p className="text-gray-500">{tenantDetails.email}</p>
                                </div>

                                {/* Tenant Details */}
                                <div className="bg-white shadow-md p-4 rounded-lg mb-6">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2 border-b-2 p-2">
                                        <span className="font-bold">Wing</span>
                                        <span>{tenantDetails.wing}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2 border-b-2 p-2">
                                        <span className="font-bold">Unit</span>
                                        <span>{tenantDetails.unit}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2 border-b-2 p-2">
                                        <span className="font-bold">Age</span>
                                        <span>{tenantDetails.age}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span className="font-bold">Gender</span>
                                        <span>{tenantDetails.gender}</span>
                                    </div>
                                </div>

                                {/* Documents Section */}
                                <div className="mb-6">
                                    <h3 className="text-gray-800 font-semibold mb-2">Documents</h3>
                                    {tenantDetails.documents.map((doc, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-white p-2 border rounded-lg mb-2"
                                        >
                                            <span className="text-blue-500 text-2xl mr-2">📄</span>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{doc.size} MB</p>
                                            </div>
                                            <button className="text-gray-500 hover:text-gray-700">
                                            <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                                {/* Replace with your icon */}
                                                <span>🔒</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};