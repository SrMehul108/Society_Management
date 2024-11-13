'use client';

import { useState } from 'react';

import OtherPaymentPopup from './OtherPaymentPopup';
import OtherInvoicePopupView from './OtherInvoicePopup';


// import ViewInvoices from './ViewInvoices';

export default function DueEventPayment() {
   

    // Sample dynamic data
    const [maintenanceCards] = useState([
        {
            billDate: "11/01/2024",
            name : "Navratri",
            pendingDate: "11/01/2024",
            maintenanceAmount: 1000.00,
            
        },
        {
            billDate: "11/01/2024",
            name : "Navratri",
            pendingDate: "11/01/2024",
            maintenanceAmount: 1000.00,
            
        },
        {
            billDate: "11/01/2024",
            name : "Navratri",
            pendingDate: "11/01/2024",
            maintenanceAmount: 1000.00,
           
        },
        {
            billDate: "11/01/2024",
            name : "Navratri",
            pendingDate: "11/01/2024",
            maintenanceAmount: 1000.00,
           
        },
    ]);

   
    //payment Popup
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOpenPopup = () => setPopupOpen(true);
    const handleClosePopup = () => setPopupOpen(false);

     //invoices popup
     const [isOtherPopupOpen, setOtherPopupOpen] = useState(false);
     const [invoiceData, setInvoiceData] = useState({
       invoiceId: '125465',
       ownerName: 'Terry Rhiel Madsen',
       billDate: '10/02/2024',
       paymentDate: '10/02/2024',
       phoneNumber: '6549873521',
       email: 'MaryDHurst@jourrapide.com',
       address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
       maintenanceAmount: 1500.00,
       penalty: 350.00,
       grandTotal: 1850.00,
       note: 'A visual representation of your spending categories visual representation.',
     });
   
     const handleOtherOpenPopup = () => setOtherPopupOpen(true);
     const handleOtherClosePopup = () => setOtherPopupOpen(false);


    return (
        <>

            <div className="p-4 bg-white mb-6">

                <div className='flex items-center justify-between mb-6'>
                    <h2 className="text-xl font-bold">
                         Due Event Payment
                    </h2>
                    <button
                        className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-2 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleOtherOpenPopup}
                    >
                       View Invoice
                    </button>
                    <OtherInvoicePopupView isOpen={isOtherPopupOpen} onClose={handleOtherClosePopup} data={invoiceData} />
                </div>
                
                    <>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                            {maintenanceCards.map((card, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="bg-blue-500 p-4 flex justify-between items-center">
                                        <span className="text-white font-medium">Due Event Payment</span>
                                        <span className="text-white bg-blue-600 px-2 py-1 rounded-full text-sm">Pending</span>
                                    </div>
                                    <div className="p-4">
                                        <div className="grid gap-2 pb-2">
                                            <div className='grid-cols-2 grid'>
                                                <p className="text-sm text-gray-600">Event Name</p>
                                                <p className="text-sm font-medium text-end">{card.name}</p>
                                            </div>
                                            <div className='grid-cols-2 grid'>
                                                <p className="text-sm text-gray-600">Event Due Date</p>
                                                <p className="text-sm font-medium text-end">{card.pendingDate}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600"> Amount</span>
                                                <span className="text-sm text-red-500 font-medium">{card.maintenanceAmount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                       
                                        <button
                                            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                                            onClick={handleOpenPopup}
                                        >
                                            Pay Now
                                        </button>
                                        <OtherPaymentPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
                                    </div>
                                </div>
                            ))}
                        </div>
                       
                    </>
               
            </div>

        </>
    );
}
