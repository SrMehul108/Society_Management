import React, { useEffect, useState } from "react";
import {  GetProtocolUser } from "../../../apis/api";

function SecurityProtocolsTable() {
  const [protocols, setProtocols] = useState();

  const FetchProtocols=async()=>{
    try {
        const data=await GetProtocolUser()
        setProtocols(data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    FetchProtocols()
  },[])
  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">Security Protocols</h2>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full bg-white border border-gray-200 shadow-md ">
          <thead className="bg-gray-300">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">
                Title
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">
                Description
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">
                Date
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700  divide-gray-200">
            {protocols?.map((protocol, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2">{protocol.title}</td>
                <td className="p-2">{protocol.description}</td>
                <td className="p-2">{protocol.date}</td>
                <td className="p-2">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {protocol.time}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default SecurityProtocolsTable;
