import React, { useState } from 'react'
import { Bell, ChevronDown, Container, LogOut, Upload } from 'lucide-react'
import owner from '../../assets/image/owner.jpg'
import { UploadIcon } from './UploadIcon';
import { X, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom';



export const Owner = () => {
    const [fileNames, setFileNames] = useState(Array(4).fill(""));
    const [files, setFiles] = useState([
        { id: 1, name: 'Syncfusion Essential Adhocard.JPG', size: '3.5 MB', progress: 40 },
        { id: 2, name: 'Syncfusion Essential Adhocard.JPG', size: '3.5 MB', progress: 0 },
        { id: 3, name: 'Syncfusion Essential Verabil.JPG', size: '3.5 MB', progress: 0 },
        { id: 4, name: 'Syncfusion Essential Agreement.JPG', size: '2.5 MB', progress: 40 },
    ])

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const updatedFileNames = [...fileNames];
            updatedFileNames[index] = file.name;
            setFileNames(updatedFileNames);
        }
    };

    const handleClickUpload = (index) => {
        document.getElementById(`fileInput-${index}`).click();
    };

    const removeFile = (id) => {
        setFiles(files.filter(file => file.id !== id))
    }

    const [memberCount, setMemberCount] = useState(1); // Default to 5 members
    const [members, setMembers] = useState(
        Array.from({ length: 1 }, () => ({
            fullName: '',
            phone: '',
            email: '',
            age: '',
            gender: '',
            relation: ''
        }))
    );

    const handleMemberCountChange = (event) => {
        const count = Number(event.target.value);
        setMemberCount(count);

        // Adjust the number of members in the array
        setMembers((prevMembers) => {
            if (count > prevMembers.length) {
                return [
                    ...prevMembers,
                    ...Array.from({ length: count - prevMembers.length }, () => ({
                        fullName: '',
                        phone: '',
                        email: '',
                        age: '',
                        gender: '',
                        relation: ''
                    }))
                ];
            } else {
                return prevMembers.slice(0, count);
            }
        });
    };

    const handleInputChange = (index, field, value) => {
        setMembers((prevMembers) => {
            const updatedMembers = [...prevMembers];
            updatedMembers[index][field] = value;
            return updatedMembers;
        });
    };

    const [vehicleCount, setVehicleCount] = useState(1);
    const [vehicles, setVehicles] = useState([{ type: '', name: '', number: '' }]);

    const handleVehicleCountChange = (e) => {
        const count = parseInt(e.target.value);
        setVehicleCount(count);

        // Adjust the vehicles array based on the selected count
        if (count > vehicles.length) {
            setVehicles([...vehicles, ...Array(count - vehicles.length).fill({ type: '', name: '', number: '' })]);
        } else {
            setVehicles(vehicles.slice(0, count));
        }
    };

    const handleChange = (index, field, value) => {
        const updatedVehicles = vehicles.map((vehicle, i) =>
            i === index ? { ...vehicle, [field]: value } : vehicle
        );
        setVehicles(updatedVehicles);
    };

  

    return (

        <>
            <div className="container mx-auto">
                <div className="flex  bg-gray-100">
                    {/* Main content */}
                    <main className="flex-1 p-8">
                        <div className="flex mb-4">
                            <button className="bg-orange-500 text-white px-4 py-2 rounded-tl-md rounded-bl-md">Owner</button>
                            <Link to={"/admin/residents/TenateForm"} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-tr-md rounded-br-md">Tenant</Link>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className='flex w-full m-0'>
                                <div>
                                    <img src={owner} alt="" />
                                </div>
                                <div className="w-full">
                                    <form className="w-full">
                                        <div className="flex  gap-6">
                                            <div className='w-1/3'>
                                                <label className="block text-sm font-medium text-gray-700">Full Name*</label>
                                                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                            </div>
                                            <div className='w-1/3'>
                                                <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
                                                <input type="tel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                            </div>
                                            <div className='w-1/3'>
                                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-5 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Age*</label>
                                                <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Gender*</label>
                                                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Wing*</label>
                                                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Unit*</label>
                                                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Relation*</label>
                                                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                            </div>
                                        </div>



                                    </form>
                                </div>

                            </div>
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        "Upload Aadhar Card (Front Side)",
                                        "Upload Aadhar Card (Back Side)",
                                        "Address Proof (Vero Bill OR Light Bill)",
                                        "Rent Agreement",
                                    ].map((title, index) => (
                                        <div
                                            key={title}
                                            className="border border-dashed border-gray-300 rounded-md p-4 cursor-pointer"
                                            onClick={() => handleClickUpload(index)}
                                        >
                                            <div className="text-center">
                                                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <p className="mt-1 text-sm text-gray-600">{title}</p>
                                                <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                {fileNames[index] && (
                                                    <p className="mt-2 text-xs text-gray-700 truncate">
                                                        {fileNames[index]}
                                                    </p>
                                                )}
                                            </div>
                                            <input
                                                id={`fileInput-${index}`}
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(e, index)}
                                                accept=".png, .jpg, .jpeg, .gif"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className=" mt-4 mx-auto">
                                    <div className="flex flex-wrap gap-4">
                                        {files.map(file => (
                                            <div key={file.id} className=" border rounded-lg border-gray-400  border-opacity-75 shadow-md p-4 relative flex-1 min-w-[200px]">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium truncate">{file.name}</span>
                                                    <button
                                                        onClick={() => removeFile(file.id)}
                                                        className="text-gray-500 hover:text-gray-700"
                                                    >
                                                        {file.progress > 0 ? <X size={18} /> : <Trash2 size={18} />}
                                                    </button>
                                                </div>
                                                <div className="text-xs text-gray-500 mb-2">{file.size}</div>
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500 transition-all duration-500 ease-out"
                                                        style={{ width: `${file.progress}%` }}
                                                    ></div>
                                                </div>
                                                {file.progress > 0 && (
                                                    <span className="absolute bottom-6 right-4 text-xs font-medium">
                                                        {file.progress}%
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white shadow-md rounded-lg  mt-3">
                            <div className="">
                                <div className="p-2  ">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800">Member Counting: <span className='text-gray-400'>(Other Members)</span> </h2>
                                        <div className="flex items-center">
                                            <label className="mr-2 text-gray-600">Select Member</label>
                                            <select
                                                value={memberCount}
                                                onChange={handleMemberCountChange}
                                                className="border border-gray-300 p-2 rounded-md"
                                            >
                                                {[...Array(10).keys()].map((num) => (
                                                    <option key={num + 1} value={num + 1}>
                                                        {num + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    {members.map((member, index) => (
                                        <div key={index} className="flex flex-wrap mb-4 p-4 bg-white rounded-lg  space-y-4 sm:space-y-0">
                                            <div className="flex flex-col w-full  sm:w-1/2 lg:w-1/6 px-2">
                                                <label className="text-gray-600 font-semibold">Full Name*</label>
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    className="border border-gray-300 p-2 rounded-md"
                                                    value={member.fullName}
                                                    onChange={(e) => handleInputChange(index, 'fullName', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col w-full  sm:w-1/2 lg:w-1/6 px-2">
                                                <label className="text-gray-600 font-semibold">Phone No*</label>
                                                <input
                                                    type="tel"
                                                    placeholder="+91 XXXXX XXXXX"
                                                    className="border border-gray-300 p-2 rounded-md"
                                                    value={member.phone}
                                                    onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col w-full sm:w-1/2 lg:w-1/6 px-2">
                                                <label className="text-gray-600 font-semibold">Email*</label>
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    className="border border-gray-300 p-2 rounded-md"
                                                    value={member.email}
                                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col w-full  sm:w-1/2 lg:w-1/6 px-2">
                                                <label className="text-gray-600 font-semibold">Age*</label>
                                                <input
                                                    type="number"
                                                    placeholder="Age"
                                                    className="border border-gray-300 p-2 rounded-md"
                                                    value={member.age}
                                                    onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col w-full sm:w-1/2 lg:w-1/6 px-2">
                                                <label className="text-gray-600 font-semibold">Gender*</label>
                                                <select
                                                    className="border border-gray-300 p-2 rounded-md"
                                                    value={member.gender}
                                                    onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col w-full sm:w-1/2 lg:w-1/6 px-2">
                                                <label className="text-gray-600 font-semibold">Relation*</label>
                                                <input
                                                    type="text"
                                                    placeholder="Relation"
                                                    className="border border-gray-300 p-2 rounded-md"
                                                    value={member.relation}
                                                    onChange={(e) => handleInputChange(index, 'relation', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6 mt-3">
                            <div className="">
                                <div className="p-2  ">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800">Vehicle Counting :</h2>
                                        <div className="flex items-center">
                                            <label className="mr-2 text-gray-600">Select Vehicle</label>
                                            <select
                                                value={vehicleCount}
                                                onChange={handleVehicleCountChange}
                                                className="border border-gray-300 p-2 rounded-md"
                                            >
                                                {[...Array(10).keys()].map((num) => (
                                                    <option key={num + 1} value={num + 1}>
                                                        {num + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 justify-center">
                                        {vehicles.map((vehicle, index) => (
                                            <div key={index} className="flex flex-col p-4 bg-white rounded-lg  w-full md:w-1/2 lg:w-5/12">
                                                <div className='flex'>
                                                    <div className="flex flex-col mb-4 w-1/3 ms-1">
                                                        <label className="text-gray-600 font-semibold">Vehicle Type*</label>
                                                        <select
                                                            className="border border-gray-300 p-2 rounded-md"
                                                            value={vehicle.type}
                                                            onChange={(e) => handleChange(index, 'type', e.target.value)}
                                                        >
                                                            <option value="">Select Type</option>
                                                            <option value="Two Wheelers">Two Wheelers</option>
                                                            <option value="Four Wheelers">Four Wheelers</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex flex-col mb-4  w-1/3 ms-1">
                                                        <label className="text-gray-600 font-semibold">Vehicle Name*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Vehicle Name"
                                                            className="border border-gray-300 p-2 rounded-md"
                                                            value={vehicle.name}
                                                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col  w-1/3 ms-1">
                                                        <label className="text-gray-600 font-semibold">Vehicle Number*</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Vehicle Number"
                                                            className="border border-gray-300 p-2 rounded-md"
                                                            value={vehicle.number}
                                                            onChange={(e) => handleChange(index, 'number', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                  
                                 




                                </div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className="flex justify-end space-x-4">
                                <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600">
                                    Create
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}