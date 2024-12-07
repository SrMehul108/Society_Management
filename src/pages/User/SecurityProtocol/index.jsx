import React, { useState } from 'react';

 function SecurityProtocolsTable() {
    const [protocols, setProtocols] = useState([
        { title: 'Cameron Williamson', description: 'A visual representation of your spending categories.', date: '11/02/2024', time: '2:45 PM' },
        { title: 'Darrell Steward', description: 'Securing critical government systems.', date: '12/02/2024', time: '3:00 PM' },
        { title: 'Courtney Henry', description: 'Implementing surveillance in public spaces.', date: '13/02/2024', time: '4:30 AM' },
        { title: 'Kathryn Murphy', description: 'Tailor the dashboard to your unique financial needs.', date: '14/02/2024', time: '6:45 AM' },
        { title: 'Kathryn Murphy', description: 'Expenses will become more understandable.', date: '15/02/2024', time: '2:45 PM' },
        { title: 'Arlene McCoy', description: 'Helping you identify where your money is going.', date: '16/02/2024', time: '5:45 PM' },
        { title: 'Eleanor Pena', description: 'Navigate through the different sections seamlessly.', date: '17/02/2024', time: '6:45 AM' },
    ]);

    return (
        <div className="p-4 bg-white">
            <h2 className="text-xl font-semibold mb-4">Security Protocols</h2>
            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full bg-white border border-gray-200 shadow-md ">
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">Title</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">Time</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700  divide-gray-200">
                        {protocols.map((protocol, index) => (
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