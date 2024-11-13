'use client'

import { useState } from 'react'

export default function PaymentPending() {
    // Sample dynamic data
    const [maintenanceCards] = useState([
        {
            billDate: "11/01/2024",
            pendingDate: "11/01/2024",
            maintenanceAmount: 1000.00,
            penaltyAmount: 250.00,
        },
        {
            billDate: "11/01/2024",
            pendingDate: "11/01/2024",
            maintenanceAmount: 1000.00,
            penaltyAmount: 250.00,
        },
        {
            billDate: "11/01/2024",
            pendingDate: "11/01/2024",
            maintenanceAmount: 1000.00,
            penaltyAmount: 250.00,
        },
        {
            billDate: "11/01/2024",
            pendingDate: "11/01/2024",
            maintenanceAmount: 1000.00,
            penaltyAmount: 250.00,
        },

    ])

    return (
        <div className="p-4 bg-white mb-6">
            <div className='flex items-center justify-between mb-6 '>
                <div className=''>
                    <h2 className="text-xl font-bold ">Pending Maintenance</h2>
                </div>
                <div>
                    <button
                        className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-2 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => console.log(`Processing payment for card ${index + 1}`)}
                    >
                        View Invoice
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {maintenanceCards.map((card, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-blue-500 p-4 flex justify-between items-center">
                            <span className="text-white font-medium">Maintenance</span>
                            <span className="text-white bg-blue-600 px-2 py-1 rounded-full text-sm">Pending</span>
                        </div>
                        <div className="p-4">
                            <div className="grid  gap-2 pb-2 ">
                                <div className='grid-cols-2 grid '>
                                    <p className="text-sm text-gray-600">Bill Date</p>
                                    <p className="text-sm font-medium text-end">{card.billDate}</p>
                                </div>
                                <div className='grid-cols-2 grid '>
                                    <p className="text-sm text-gray-600">Pending Date</p>
                                    <p className="text-sm font-medium text-end">{card.pendingDate}</p>
                                </div>
                            </div>
                            <div className="space-y-2 pt-2 border-t">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Maintenance Amount</span>
                                    <span className="text-sm text-red-500 font-medium">{card.maintenanceAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Maintenance Penalty Amount</span>
                                    <span className="text-sm text-red-500 font-medium">{card.penaltyAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between pt-2 pb-2 border-t">
                                    <span className="text-sm font-medium">Grand Total</span>
                                    <span className="text-sm text-green-600 font-medium">₹ {(card.maintenanceAmount + card.penaltyAmount).toFixed(2)}</span>
                                </div>
                            </div>
                            <button
                                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => console.log(`Processing payment for card ${index + 1}`)}
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}