
// 'use client'

// import { useState } from 'react'
// import { ChevronDownIcon, PlusIcon } from 'lucide-react'

// export default function VisitorTracking() {
//   const [timeFrame, setTimeFrame] = useState('Week')
//   const [isOpen, setIsOpen] = useState(false)

//   const timeFrameOptions = ['Week', 'Month', 'Year']

//   const handleTimeFrameChange = (option, event) => {
//   event.preventDefault();
//   setTimeFrame(option);
//   setIsOpen(false);
// };
//   const visitors = [
//     { name: "Evelyn Harper", phone: "97852 12369", date: "10/01/2024", unit: "1001", time: "3:45 PM" },
//     { name: "Wade Warren", phone: "97852 25893", date: "10/01/2024", unit: "1002", time: "2:45 AM" },
//     { name: "Guy Hawkins", phone: "97589 55563", date: "10/01/2024", unit: "1003", time: "3:00 PM" },
//     { name: "Robert Fox", phone: "97444 56323", date: "10/01/2024", unit: "1004", time: "5:30AM" },
//     { name: "Jacob Jones", phone: "97123 12583", date: "10/01/2024", unit: "2001", time: "12:45 PM" },
//     { name: "Ronald Richards", phone: "97259 12363", date: "10/01/2024", unit: "2002", time: "3:45 PM" },
//     { name: "Annette Black", phone: "97569 77763", date: "10/01/2024", unit: "2003", time: "6:00 AM" },
//     { name: "Jerome Bell", phone: "97123 25863", date: "10/01/2024", unit: "2004", time: "3:45 PM" },
//   ]

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//     <div className="max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800">Visitor Tracking</h1>
//         <div className="flex space-x-2">
//           <div className="relative">
//             <button 
//               onClick={() => setIsOpen(!isOpen)}
//               className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md flex items-center"
//             >
//               {timeFrame}
//               <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500" />
//             </button>
//             {isOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
//                 {timeFrameOptions.map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => handleTimeFrameChange(option)}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           <button className="px-4 py-2 text-sm bg-orange-500 text-white rounded-md flex items-center">
//             <PlusIcon className="mr-2 h-4 w-4" />
//             Add Visitor details
//           </button>
//         </div>
//       </div>
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Number</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {visitors.map((visitor, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10">
//                         <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
//                           {visitor.name.split(' ').map(n => n[0]).join('')}
//                         </div>
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.phone}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.date}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.unit}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.time}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon, PlusIcon } from 'lucide-react'
import SecurityPopup from '../../../components/Security/SecurityPopup'

export default function VisitorTracking() {
  const [timeFrame, setTimeFrame] = useState('Week')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const timeFrameOptions = ['Week', 'Month', 'Year']

  const handleTimeFrameChange = (option) => {
    setTimeFrame(option)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const visitors = [
    { name: "Evelyn Harper", phone: "97852 12369", date: "10/01/2024", unit: "1001", time: "3:45 PM" },
    { name: "Wade Warren", phone: "97852 25893", date: "10/01/2024", unit: "1002", time: "2:45 AM" },
    { name: "Guy Hawkins", phone: "97589 55563", date: "10/01/2024", unit: "1003", time: "3:00 PM" },
    { name: "Robert Fox", phone: "97444 56323", date: "10/01/2024", unit: "1004", time: "5:30AM" },
    { name: "Jacob Jones", phone: "97123 12583", date: "10/01/2024", unit: "2001", time: "12:45 PM" },
    { name: "Ronald Richards", phone: "97259 12363", date: "10/01/2024", unit: "2002", time: "3:45 PM" },
    { name: "Annette Black", phone: "97569 77763", date: "10/01/2024", unit: "2003", time: "6:00 AM" },
    { name: "Jerome Bell", phone: "97123 25863", date: "10/01/2024", unit: "2004", time: "3:45 PM" },
  ]

   //ComplaintForm popup

   const [isSecurityOpen, setSecurityIsOpen] = useState(false);

   const openModal = () => setSecurityIsOpen(true);
   const closeModal = () => setSecurityIsOpen(false);

  return (
    <div className=" p-4 bg-white min-h-screen">
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Visitor Tracking</h1>
          <div className="flex space-x-2">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md flex items-center"
              >
                {timeFrame}
                <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-500" />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {timeFrameOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleTimeFrameChange(option)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        timeFrame === option ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="px-4 py-2 text-sm bg-orange-500 text-white rounded-md flex items-center" onClick={openModal}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Visitor details
            </button>
            {isSecurityOpen && <SecurityPopup closeModal={closeModal} />}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visitors.map((visitor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                          {visitor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}