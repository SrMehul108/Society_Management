import React, { useState } from 'react';
import owner from '../../assets/image/owner.jpg'
import { EyeOffIcon } from 'lucide-react';
import { userRegistration } from '../../apis/api';

export const ViewOwner = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [ownerDetails, setOwnerDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch owner details from API
    const fetchOwnerDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await userRegistration(); // Call API
            if (result.success) {
                setOwnerDetails(result.data); // Update owner details on success
            } else {
                setError(result.message); // Handle API error
            }
        } catch (err) {
            setError('Failed to fetch owner details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetchOwnerDetails when sidebar is opened
    useEffect(() => {
        if (isSidebarOpen) {
            fetchOwnerDetails();
        }
    }, [isSidebarOpen]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <div className="flex bg-gray-100">
                {/* Button to open sidebar */}
                <button
                    onClick={toggleSidebar}
                    className="m-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    View Owner Details
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
                        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    } z-50`}
                >
                    <div className="p-6">
                        {/* Close button */}
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-600 hover:text-gray-800 font-bold mb-4"
                        >
                            &larr; View Owner Details
                        </button>

                        {/* Conditional rendering for loading, error, and owner details */}
                        {loading && <p className="text-center text-gray-500">Loading...</p>}
                        {error && <p className="text-center text-red-500">{error}</p>}
                        {ownerDetails && (
                            <>
                                {/* Profile Information */}
                                <div className="flex flex-col items-center text-center mb-6">
                                    <img
                                        src={owner}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full mb-2"
                                    />
                                    <h2 className="text-lg font-semibold">{ownerDetails.name}</h2>
                                    <p className="text-gray-500">{ownerDetails.email}</p>
                                </div>

                                {/* Owner Details */}
                                <div className="bg-white shadow-md p-4 rounded-lg mb-6">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2 border-b-2 p-2">
                                        <span>Wing</span>
                                        <span>{ownerDetails.wing}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2 border-b-2 p-2">
                                        <span>Unit</span>
                                        <span>{ownerDetails.unit}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2 border-b-2 p-2">
                                        <span>Age</span>
                                        <span>{ownerDetails.age}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Gender</span>
                                        <span>{ownerDetails.gender}</span>
                                    </div>
                                </div>

                                {/* Document Section */}
                                <div className="mb-6">
                                    <h3 className="text-gray-800 font-semibold mb-2">Documents</h3>
                                    {ownerDetails.documents.map((doc, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-white p-1 border rounded-lg mb-2"
                                        >
                                            <span className="text-blue-500 text-2xl mr-2">📄</span>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{doc.size} MB</p>
                                            </div>
                                            <button className="text-gray-500 hover:text-gray-700">
                                                <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Member Counting Section */}
                                <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
                                    <h3 className="font-semibold">Member Counting</h3>
                                    <span className="text-lg font-semibold">
                                        {ownerDetails.members?.length || 0}
                                    </span>
                                </div>
                                {ownerDetails.members?.map((member, index) => (
                                    <div
                                        key={index}
                                        className="bg-white shadow-lg p-4 rounded-b-lg mb-4"
                                    >
                                        <div className="mb-4 flex border-b-2 pb-1">
                                            <p className="text-gray-600 text-sm font-medium w-1/2">
                                                First Name
                                            </p>
                                            <p className="text-gray-800 w-1/2 text-right">
                                                {member.name}
                                            </p>
                                        </div>
                                        <div className="mb-4 flex border-b-2 pb-1">
                                            <p className="text-gray-600 text-sm font-medium w-1/2">
                                                Phone No
                                            </p>
                                            <p className="text-gray-800 w-1/2 text-right">
                                                {member.phone}
                                            </p>
                                        </div>
                                        <div className="mb-4 flex border-b-2 pb-1">
                                            <p className="text-gray-600 text-sm font-medium w-1/2">
                                                Age
                                            </p>
                                            <p className="text-gray-800 w-1/2 text-right">{member.age}</p>
                                        </div>
                                        <div className="mb-4 flex">
                                            <p className="text-gray-600 text-sm font-medium w-1/2">
                                                Relation
                                            </p>
                                            <p className="text-gray-800 w-1/2 text-right">
                                                {member.relation}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};