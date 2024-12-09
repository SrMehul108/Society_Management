import React from "react";

export const ViewOwner = ({ isOpen, onClose, residentDetails }) => {
    if (!isOpen || !residentDetails) return null; 

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 font-bold mb-4"
                    >
                        &larr; View Owner Details
                    </button>

                    {/* Render resident details */}
                    {residentDetails && (
                        <>
                            {/* Profile Information */}
                            <div className="flex flex-col items-center text-center mb-6">
                                <img
                                    src={residentDetails.profile_image || "https://via.placeholder.com/40"}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full mb-2"
                                />
                                <h2 className="text-lg font-semibold">{residentDetails.fullName}</h2>
                                <p className="text-gray-500">{residentDetails.email || "No email provided"}</p>
                            </div>

                            {/* Resident Details */}
                            <div className="bg-white shadow-md p-4 rounded-lg mb-6">
                                <div className="flex justify-between text-sm text-gray-600 mb-2 border-b-2 p-2">
                                    <span>Wing</span>
                                    <span>{residentDetails.metaData?.wing}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mb-2 border-b-2 p-2">
                                    <span>Unit</span>
                                    <span>{residentDetails.metaData?.unit}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mb-2 border-b-2 p-2">
                                    <span>Age</span>
                                    <span>{residentDetails.age || "N/A"}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Gender</span>
                                    <span>{residentDetails.gender || "N/A"}</span>
                                </div>
                            </div>

                            {/* Document Section */}
                            <div className="mb-6">
                                <h3 className="text-gray-800 font-semibold mb-2">Documents</h3>
                                {(residentDetails.documents || []).map((doc, index) => (
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
                                    {residentDetails.members?.length || 0}
                                </span>
                            </div>
                            {Array.isArray(residentDetails.members) &&

                                residentDetails.members.map((member, index) => (
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
        </>
    );
};
