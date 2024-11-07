import React, { useState, useEffect, useRef } from 'react';
import OtherIncomePopup from './OtherIncomePopup';
import EditPopup from './EditPopup';
import DeletePopup from './DeletePopup';

function OtherIncomeCard({ data, onEdit, onDelete, onView }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setMenuVisible((prev) => !prev);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        if (menuVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuVisible]);
    // Edit
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "Ganesh Chaturthi",
        amount: "₹ 1,500",
        date: "2024-07-01",
        dueDate: "2024-07-10",
        description:
            "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in Resident."
    });

    const openEditPopup = () => {
        setIsEditOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditOpen(false);
    };

    // delete

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemTitle, setItemTitle] = useState("Ganesh Chaturthi");

  const openDeletePopup = () => {
    setIsDeleteOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeleteOpen(false);
  };

  const handleDelete = () => {
    // Logic to delete the item
    console.log(`${itemTitle} has been deleted.`);
    closeDeletePopup();
  };


    return (
        <>

            <div className="bg-white border rounded-lg shadow-md  flex flex-col space-y-2  lg:w-1/4 m-2">
                <div className="flex justify-between border rounded-t-lg rounded-r-lg items-center p-1 bg-blue-500">
                    <h3 className="text-lg font-semibold text-gray-700">{data.title}</h3>
                    <div className="relative mr-2" ref={menuRef}>
                        <i
                            className="fas fa-ellipsis-h text-gray-600 bg-white p-2 rounded-xl cursor-pointer"
                            onClick={toggleMenu}
                        ></i>
                        {menuVisible && (
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg">
                                <button onClick={onView} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    View
                                </button>
                                <button onClick={openEditPopup} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Edit
                                </button>
                                {isEditOpen && (
                                    <EditPopup
                                        formData={formData}
                                        onClose={closeEditPopup}
                                        onSave={(updatedData) => {
                                            setFormData(updatedData);
                                            closeEditPopup();
                                        }}
                                    />
                                )}
                                <button onClick={openDeletePopup} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Delete
                                </button>
                                {isDeleteOpen && (
                                    <DeletePopup
                                        itemTitle={itemTitle}
                                        onClose={closeDeletePopup}
                                        onDelete={handleDelete}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-white   p-4 flex flex-col  m-2">
                    <div className='flex'>
                        <div className='w-3/4'>
                            <p className="text-gray-500">Amount Per Member: </p>
                        </div>
                        <div className='flex  border rounded-full bg-gray-300 w-1/4 '>
                            <p className="text-blue-500 font-bold mx-auto ">₹ {data.amountPerMember}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-3/4'>
                            <p className="text-gray-500">Total Members: </p>
                        </div>
                        <div className='w-1/4 flex'>
                            <p className='mx-auto'>
                                {data.totalMembers}
                            </p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-3/4'>
                            <p className="text-gray-500">Date: </p>
                        </div>
                        <div className='w-1/4 flex'>
                            <p className='mx-auto'>
                                {data.date}
                            </p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-3/4'>
                            <p className="text-gray-500">Due Date: </p>
                        </div>
                        <div className='w-1/4 flex'>
                            <p className='mx-auto'>
                                {data.dueDate}
                            </p>
                        </div>
                    </div>
                    <p className="text-gray-500">Description: {data.description}</p>
                </div>
            </div>
        </>
    );
}

function OtherIncomeForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Income</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Amount Per Member</label>
                <input
                    type="number"
                    name="amountPerMember"
                    value={formData.amountPerMember}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Total Members</label>
                <input
                    type="number"
                    name="totalMembers"
                    value={formData.totalMembers}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div className="flex space-x-4">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

function OtherIncome({ incomeData, onCreate, onEditIncome, onDeleteIncome }) {
    //    otherIncomepopup
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">Other Income</h2>
                <button
                    onClick={togglePopup}
                    className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition"
                >
                    Create Other Income
                </button>
                {isOpen && <OtherIncomePopup onClose={togglePopup} />}
            </div>

            <div className="flex flex-wrap justify-center">
                {incomeData.map((item, index) => (
                    <OtherIncomeCard
                        key={index}
                        data={item}
                        onView={() => console.log(`Viewing ${item.title}`)}
                        onEdit={() => onEditIncome(index)}
                        onDelete={() => onDeleteIncome(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default function OtherIncomeContainer() {
    const [incomeData, setIncomeData] = useState([
        {
            title: 'Ganesh Chaturthi',
            amountPerMember: 1500,
            totalMembers: 12,
            date: '2024-07-01',
            dueDate: '2024-07-10',
            description: 'The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in...',
        },
        {
            title: 'Navratri',
            amountPerMember: 1500,
            totalMembers: 12,
            date: '2024-07-01',
            dueDate: '2024-07-10',
            description: 'The celebration of Navratri involves the installation of clay idols of Durga in...',
        },
        {
            title: 'Diwali',
            amountPerMember: 1500,
            totalMembers: 12,
            date: '2024-07-01',
            dueDate: '2024-07-10',
            description: 'The celebration of Diwali involves various festivities...',
        },
    ]);

    const [editingIndex, setEditingIndex] = useState(null);

    const handleCreate = () => {
        console.log('Create new income');
    };

    const handleEditIncome = (index) => {
        setEditingIndex(index);
    };

    const handleSaveIncome = (updatedIncome) => {
        const updatedData = [...incomeData];
        updatedData[editingIndex] = updatedIncome;
        setIncomeData(updatedData);
        setEditingIndex(null);
    };

    const handleDeleteIncome = (index) => {
        const updatedData = incomeData.filter((_, i) => i !== index);
        setIncomeData(updatedData);
    };

    return (
        <div>
            {editingIndex !== null ? (
                <OtherIncomeForm
                    initialData={incomeData[editingIndex]}
                    onSubmit={handleSaveIncome}
                    onCancel={() => setEditingIndex(null)}
                />
            ) : (
                <OtherIncome
                    incomeData={incomeData}
                    onCreate={handleCreate}
                    onEditIncome={handleEditIncome}
                    onDeleteIncome={handleDeleteIncome}
                />
            )}
        </div>
    );
}
