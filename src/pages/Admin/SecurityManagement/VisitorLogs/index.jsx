import React, { useState } from "react";


function VisitorLog() {


    const data = [
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Cody Fisher",
            unit: "A",
            unitNumber: "1001",
            date: "10/02/2024",
            phoneNumber: "92524 34522",
            time: "3.45pm"

        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Esther Howard",
            unit: "B",
            unitNumber: "1002",
            date: "11/02/2024",
            phoneNumber: "92524 12365",
            time: "3.45pm"
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            phoneNumber: "92589 34522",
           time: "4.45pm"
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            phoneNumber: "92589 34522",
            time: "7.45pm"
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            phoneNumber: "92589 34522",
            time: "3.45pm"
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
           
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
        {
            profilePicture: "https://via.placeholder.com/32",
            name: "Jenny Wilson",
            unit: "C",
            unitNumber: "1003",
            date: "12/02/2024",
            time: "3.45pm",
            phoneNumber: "92589 34522",
            
        },
    ];



    return (
        <>
            <div className="p-4 bg-gray-100">
                <div
                    role="tablist"
                    className="mt-4 tabs tabs-lifted tabs-lg  rounded-lg"
                >
                    <>
                        <div
                            className="bg-white p-4 overflow-hidden"
                            style={{ height: "680px" }}
                        >
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Visitor Logs
                            </h2>

                            <div
                                className="overflow-x-auto rounded-lg h-full"
                                style={{ maxHeight: "600px" }}
                            >
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-royalgray sticky top-0 w-full">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-black font-semibold">
                                                Visitor Name
                                            </th>

                                            <th className="px-4 py-2 text-left text-black font-semibold">
                                                Phone Number
                                            </th>
                                            <th className="px-4 py-2 text-left text-black font-semibold">
                                                Date
                                            </th>
                                            <th className="px-4 py-2 text-left text-black font-semibold">
                                                Unit Number
                                            </th>
                                            <th className="px-4 py-2 text-left text-black font-semibold">
                                                Time
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 h-64 overflow-y-auto custom-scrollbar">
                                        {data.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 flex items-center space-x-2">
                                                    <img
                                                        src={item.profilePicture}
                                                        alt="Profile"
                                                        className="rounded-full w-8 h-8"
                                                    />
                                                    <span className="text-gray-700 font-medium">
                                                        {item.name}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">{item.phoneNumber}</td>
                                                <td className="px-4 py-3">{item.date}</td>
                                                <td className="px-4 py-3">
                                                    <span className="bg-blue-100 text-blue-600 px-2 p-1 rounded-full">
                                                        {item.unit}
                                                    </span>
                                                    <span className="text-black px-2 py-1">
                                                        {item.unitNumber}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">{item.time}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>

                </div>
            </div>

        </>
    );
}

export default VisitorLog;
