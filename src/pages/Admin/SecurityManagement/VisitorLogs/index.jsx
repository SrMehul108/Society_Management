import React, { useEffect, useState } from "react";
import { GetVisitor } from "../../../../apis/api";


function VisitorLog() {


    const [data,setData]=useState()
const fetchVisitor=async()=>{
    try {
        const response=await GetVisitor()
        setData(response)
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{
    fetchVisitor()
},[])



    return (
        <>
            <div className="bg-gray-100">
                <div
                    role="tablist"
                    className=" tabs tabs-lifted tabs-lg  rounded-lg">
                    <>
                        <div
                            className="bg-white p-4 overflow-hidden rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Visitor Logs
                            </h2>
                            <div
                                className="overflow-x-auto rounded-lg h-full">
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
                                    <tbody className="divide-y divide-gray-200  overflow-y-auto custom-scrollbar">
                                        {data?.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 flex items-center space-x-2">
                                                    <img
                                                        src={item.profilePicture}
                                                        alt="Profile"
                                                        className="rounded-full w-8 h-8"
                                                    />
                                                    <span className="text-gray-700 font-medium">
                                                        {item.visitorName}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">{item.phoneNumber}</td>
                                                <td className="px-4 py-3">{item.date}</td>
                                                <td className="px-4 py-3">
                                                    <span className="bg-blue-100 text-blue-600 px-2 p-1 rounded-full">
                                                        {item.wing}
                                                    </span>
                                                    <span className="text-black px-2 py-1">
                                                        {item.unit}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3"><span  className="px-4 py-1 rounded-full"
                    style={{ backgroundColor: "#f6f8fb" }}>
                                                {item.time}</span></td>

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
