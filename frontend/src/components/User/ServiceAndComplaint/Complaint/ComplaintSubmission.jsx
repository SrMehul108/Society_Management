import React, { useState, useEffect } from "react";
import ComplaintCreact from "./ComplaintCreact";
import DeleteConfirmationPopup from "./ComplaintDelete";

const ComplaintSubmission = ({ HandleAdd, complaint = [], request = [] }) => {
  // Log the complaint and request data when they change
  useEffect(() => {
    console.log("Complaint Data:", complaint); // Check if complaint data is logged
    console.log("Request Data:", request); // Check if request data is logged
  }, [complaint, request]);

  const [activeTab, setActiveTab] = useState("Complaint");
  const activeData = activeTab === "Complaint" ? complaint : request;

  const [menuVisible, setMenuVisible] = useState(null);
  const toggleMenu = (id) => {
    setMenuVisible((prev) => (prev === id ? null : id));
  };

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const[deleteItemId,setDeleteItemId]=useState()
  const openDeleteModal = (id) => {
    setDeleteItemId(id);
    setIsDeleteOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteOpen(false);

  return (
    <div className="rounded-lg shadow-md">
      {/* Tab Selector */}
      <div className="flex">
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-300 ${
            activeTab === "Complaint"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("Complaint")}
        >
          Complaint Submission
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-300 ${
            activeTab === "Request"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("Request")}
        >
          Request Submission
        </button>
      </div>
      <div className="p-4 sm:p-6 bg-white w-full rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">
            {activeTab}{" "}
          </h1>
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all"
            onClick={openModal}
          >
            Create {activeTab}
          </button>
          {isOpen && (
            <ComplaintCreact
              closeModal={closeModal}
              type={activeTab.toLowerCase()}
              HandleAdd={HandleAdd} // Pass HandleAdd to the ComplaintCreact component
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {activeData.length > 0 ? (
            activeData.map((note) => (
              <div key={note.id} className="rounded-lg border relative">
                <div className="bg-blue-500 rounded-t-lg flex justify-between items-center p-3">
                  <h2 className="font-semibold text-white">
                    {note.complaintName}
                  </h2>
                  <div className="relative">
                    <i
                      className="fas fa-ellipsis-h text-gray-600 bg-white p-1 rounded-sm cursor-pointer"
                      onClick={() => toggleMenu(note._id)}
                    ></i>
                    {menuVisible === note._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => openDeleteModal(note._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-2 flex justify-between">
                  <div>
                    <h2 className="font-normal text-gray-500">
                      {activeTab === "Complaint" ? "Date" : "Date"}
                    </h2>
                  </div>
                  <div>
                    <p>
                      {activeTab === "Complaint" && note.updatedDate
                        ? note.updatedDate
                        : note.date}
                    </p>
                  </div>
                </div>

                <div className="p-2 flex justify-between">
                  <div>
                    <h2 className="font-normal text-gray-500">Status</h2>
                  </div>
                  <div>
                    <p>{note.status}</p>
                  </div>
                </div>

                <div className="p-2">
                  <h2 className="font-normal text-gray-500">Description</h2>
                  <p>{note.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
          {isDeleteOpen && (
            <DeleteConfirmationPopup
              closeModal={closeDeleteModal}
              HandleAdd={HandleAdd} 
              IssueId={deleteItemId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintSubmission;
