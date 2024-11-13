import React, { useState } from 'react';
import InvoicePopup from './InvoicePopup';

const ViewInvoices = () => {
    // Sample data for demonstration
    const invoices = [
        { id: '152563', owner: 'Terry Rhiel Madsen', billDate: '2024-02-10', paymentDate: '2024-02-10', phone: '9764816457', email: 'FrancesLHarris@hyta.com', maintenanceAmount: 1500, pendingAmount: 2500 },
        { id: '152583', owner: 'Marcus Vaccaro', billDate: '2024-02-10', paymentDate: '2024-02-10', phone: '9801769687', email: 'DavidRSibley@dayrep.com', maintenanceAmount: 1500, pendingAmount: 6500 },
        { id: '152563', owner: 'Marcus Schleifer', billDate: '2024-02-10', paymentDate: '2024-02-10', phone: '3216555488', email: 'Thomas@jourrapide.com', maintenanceAmount: 1500, pendingAmount: 7500 },
    ];

    // State for selected month filter
    const [selectedMonth, setSelectedMonth] = useState('02');

    // Filter invoices by selected month
    const filteredInvoices = invoices.filter(invoice => {
        const month = invoice.billDate.split('-')[1];
        return month === selectedMonth;
    });

    //invoices popup
    const [isPopupOpen, setPopupOpen] = useState(false);
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

  const handleOpenPopup = () => setPopupOpen(true);
  const handleClosePopup = () => setPopupOpen(false);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Maintenance Invoices</h2>
                <select
                    className="border rounded-md p-2"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>

            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider">Invoice ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider">Owner Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider">Bill Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider">Payment Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider">Phone Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider">Maintenance Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium  text-black uppercase tracking-wider">Pending Amount</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInvoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{invoice.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{invoice.owner}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{invoice.billDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{invoice.paymentDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{invoice.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{invoice.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-green-500">₹{invoice.maintenanceAmount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-red-500">{invoice.pendingAmount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <button className="text-blue-500 hover:underline" onClick={handleOpenPopup}><i className="fas fa-eye"></i></button>
                            </td>
                            <InvoicePopup isOpen={isPopupOpen} onClose={handleClosePopup} data={invoiceData} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewInvoices;
