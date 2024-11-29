import React, { useEffect, useState } from "react";

import ComplaintForm from "../../../../components/ComplaintTraking/ComplaintFormPopup";
import EditRequestForm from "../../../../components/ComplaintTraking/EditRequestForm";
import ViewRequestPopup from "../../../../components/ComplaintTraking/ViewRequestPopup";
import DeleteConfirmationPopup from "../../../../components/ComplaintTraking/DeleteRequestPopup";
import Table from "../../../../components/ComplaintTraking/Table";
import { GetComplaint } from "../../../../apis/api";

export const CreactComplaint = () => {
  const [complaints, setComplaints] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState({
    create: false,
    edit: false,
    view: false,
    delete: false,
  });

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const fetchComplaint = async () => {
    try {
      const params = "complaint";
      const response = await GetComplaint(params);
      if (response.success) {
        setComplaints(response.data);
      } else {
        console.error("Error fetching complaints:", response.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  const handleComplaintAdded = () => {
    fetchComplaint();
  };

  const toggleModal = (type, complaint = null) => {
    setSelectedComplaint(complaint);
    setIsModalOpen((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const columns = [
    { header: "Complainer Name", accessor: "complainerName" },
    { header: "Complaint Name", accessor: "complaintName" },
    { header: "Description", accessor: "description" },
    {
      header: "Unit Number",
      accessor: "unit",
      render: (value, row) => (
        <span className="flex gap-3">
          <span className="rounded-full bg-slate-300 flex justify-center h-6 w-6 text-blue-500">
            {row.wing}
          </span>
          <span className="text-black font-medium">
            {value} {row.unitNumber}{" "}
          </span>
        </span>
      ),
    },
    {
      header: "Priority",
      accessor: "priority",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            value === "high"
              ? "bg-[#E74C3C] text-white px-5"
              : value === "medium"
              ? "bg-[#5678E9] text-white" // Custom blue color for Medium
              : "bg-green-500 text-white px-6"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            value === "pending"
              ? "bg-[#FFC3131A] text-[#FFC313]"
              : value === "solved"
              ? "bg-[#39973D1A] text-[#39973D]"
              : value === "open"
              ? "bg-[#5678E91A] text-[#5678E9]"
              : "bg-green-100 text-green-800" // Default fallback if needed
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const actions = [
    {
      className: "text-green-500 hover:text-green-700",
      icon: <i className="fa-regular fa-pen-to-square"></i>,
      onClick: (row) => toggleModal("edit", row),
    },
    {
      className: "text-blue-500 hover:text-blue-700",
      icon: <i className="fas fa-eye"></i>,
      onClick: (row) => toggleModal("view", row),
    },
    {
      className: "text-red-500 hover:text-red-700",
      icon: <i className="fas fa-trash"></i>,
      onClick: (row) => toggleModal("delete", row),
    },
  ];

  return (
    <div className=" p-4 bg-white">
      <div className="flex justify-between items-center mb-4 rounded-md">
        <h1 className="text-xl font-bold">Complaints</h1>
        <button
          className="bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 text-white py-2 px-4 rounded-xl"
          onClick={() => toggleModal("create")}
        >
          Create Complaint
        </button>
        {isModalOpen.create && (
          <ComplaintForm
            closeModal={() => toggleModal("create")}
            onComplaintAdd={handleComplaintAdded}
          />
        )}
      </div>

      <Table columns={columns} data={complaints} actions={actions} />

      {isModalOpen.edit && (
        <EditRequestForm
          data={selectedComplaint}
          closeModal={() => toggleModal("edit")}
          onComplaintAdd={handleComplaintAdded}
        />
      )}
      {isModalOpen.view && (
        <ViewRequestPopup
          data={selectedComplaint}
          closeModal={() => toggleModal("view")}
        />
      )}
      {isModalOpen.delete && (
        <DeleteConfirmationPopup
          data={selectedComplaint}
          closeModal={() => toggleModal("delete")}
          onComplaintAdd={handleComplaintAdded}
        />
      )}
    </div>
  );
};
