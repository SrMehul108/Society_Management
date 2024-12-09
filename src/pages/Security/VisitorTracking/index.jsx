import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon, PlusIcon } from 'lucide-react'
import SecurityPopup from '../../../components/Security/SecurityPopup'
import { GetSecurityVisitor } from '../../../apis/api'

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

  const[visitors,setVisitors]=useState()

  const FetchVisitor=async()=>{
    try {
      const data=await GetSecurityVisitor()
      setVisitors(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const AddVis=()=>{
    FetchVisitor()
  }

  useEffect(()=>{
    FetchVisitor()
  },[])

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
            {isSecurityOpen && <SecurityPopup add={AddVis} closeModal={closeModal} />}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead style={{backgroundColor:"#eef1fd"}}>
              <tr>
                <th className="px-6 py-3 text-left font-medium text-black uppercase tracking-wider">Visitor Name</th>
                <th className="px-6 py-3 text-left font-medium text-black uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left font-medium text-black uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left font-medium text-black uppercase tracking-wider">Unit Number</th>
                <th className="px-6 py-3 text-left font-medium text-black uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visitors?.map((visitor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                          {visitor.visitorName.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-black">{visitor.visitorName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{visitor.phoneNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{visitor.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className='flex gap-2 items-center'>
                      <span className='rounded-full h-1 w-1 p-4 flex justify-center items-center font-bold' style={{backgroundColor:"#eef1fd",color:"#92a8f0"}}>{visitor.wing}</span>{visitor.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{visitor.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}