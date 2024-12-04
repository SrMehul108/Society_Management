import React, { useEffect, useState } from "react";
import Table from "../../../components/ComplaintTraking/Table";
import EditRequestForm from "../../../components/ComplaintTraking/EditRequestForm";
import ViewRequestPopup from "../../../components/ComplaintTraking/ViewRequestPopup";
import DeleteConfirmationPopup from "../../../components/ComplaintTraking/DeleteRequestPopup";
import { FaPlus, FaUser } from "react-icons/fa";
import AddNumberPopup from "../../../components/Dashboard/AddNumberPopup/AddNumberPopup";
import DeletePopup from "../../../components/Dashboard/DeletePopup/DeletePopup";
import { GetComplaint, getImportantnumber } from "../../../apis/api";
import { Icons } from "../../../constants/icons";
import BalanceChart from "../../../components/Dashboard/Chart/Chart";
import { HighButton, LowButton, MediumButton, OpenButton, PendingButton, SolveButton } from "../../../components/Button/Button";

export const Dashboard = () => {

  const [ComplaintselectedMonth, setComplaintSelectedMonth] =
    useState("Last month");
  
  const [importantnumber, setImportantnumber] = useState([]);
  const [selectedNumberData, setSelectedNumberData] = useState(null);

  const fetchImportantNumber = async () => {
    try {
      const data = await getImportantnumber();
      setImportantnumber(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImportantNumber();
  }, []);

  // Handle facility added in the popup form
  const handleImportantNumberAdded = () => {
    fetchImportantNumber();
    closePopup();
  };

  const balanceData = [
    {
      title: "Total Balance",
      amount: "₹ 2,22,520",
      icon: Icons.Page,
      color: "#fccba9",
    },
    {
      title: "Total Income",
      amount: "₹ 55,000",
      icon: Icons.MarketDown,
      color: "#9ccb9e",
    },
    {
      title: "Total Expense",
      amount: "₹ 20,550",
      icon: Icons.MarketUp,
      color: "#c3cff9",
    },
    {
      title: "Total Unit",
      amount: "₹ 20,550",
      icon: Icons.Units,
      color: "#f59be1",
    },
  ];

  const maintenances = [
    { name: "Roger Lubin", status: "2 Month Pending", amount: "₹ 5,000" },
  ];

  // activities
  const [UpcomingselectedMonth, setUpcomingSelectedMonth] = useState("Last week");
  
  // Example activities data
  const allActivities = [
    { event: "Yoga Session", time: "10:00 AM", date: "2023-12-01", category: "Last week" },
    { event: "Board Meeting", time: "02:00 PM", date: "2023-11-15", category: "Last month" },
    { event: "Annual Gala", time: "06:00 PM", date: "2023-01-01", category: "Last year" },
    { event: "Community Cleanup", time: "09:00 AM", date: "2023-12-05", category: "Last week" },
  ];

  // Filter activities based on selected category
  const filteredActivities = allActivities.filter(
    (activity) => activity.category === UpcomingselectedMonth
  );



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
      render: (value) => {
        switch (value.toLowerCase()) {
          case "high":
            return <HighButton label={value} />;
          case "medium":
            return <MediumButton label={value} />;
          case "low":
            return <LowButton label={value} />;
          default:
            return <span className="px-2 py-1 rounded-full text-xs font-semibold text-gray-500">
              {value}
            </span>;
        }
      },
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) =>{
        switch (value.toLowerCase()) {
          case "pending":
            return <PendingButton label={value} />;
          case "open":
            return <OpenButton label={value} />;
          case "solve":
            return <SolveButton label={value} />;
          default:
            return <span className="px-2 py-1 rounded-full text-xs font-semibold text-gray-500">
              {value}
            </span>;
        }
      },
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

  const [isModalOpen, setIsModalOpen] = useState({
    create: false,
    edit: false,
    view: false,
    delete: false,
  });
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const toggleModal = (type, complaint = null) => {
    setSelectedComplaint(complaint);
    setIsModalOpen((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const [complaintsTable, setcomplaintsTable] = useState([]);
  const fetchComplaint = async () => {
    try {
      const params = "complaint";
      const response = await GetComplaint(params);
      if (response.success) {
        setcomplaintsTable(response.data);
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState("add");
  const [editid, setEditid] = useState();
  const [editData, setEditData] = useState(null);



  const handleAddClick = () => {
    setPopupMode("add");
    setEditData(null);
    setIsPopupOpen(true);
  };
  const handleEditClick = (important, id) => {
    setPopupMode("edit");
    setSelectedNumberData({
      fullName: important.fullName,
      phoneNo: important.phoneNo,
      work: important.work,
    });
    setEditid(id);
    setIsPopupOpen(true);
  };

  const openPopup = () => {
    setIsPopupOpen(true)
  }

  const [isDeleteData, setIsDeleteData] = useState(false);
  const handleDeleteClick = (id) => {
    setEditid(id);
    setIsDeleteData(true);
    openPopup()
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  //chart
  const [selectedMonth, setSelectedMonth] = useState("Last month");

  // Define datasets for different periods
  const chartData = {
    "Last week": [5, 8, 10, 6, 7, 9, 10],
    "Last month": [20, 15, 12, 18, 25, 55, 30, 40, 35, 45, 50, 40],
    "Last year": [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750],
  };

  return (
    <>
      <div className="bg-gray-100  space-y-2">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {balanceData.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white rounded-lg shadow-md"
              style={{
                borderRight: `4px solid ${item.color}`,
                borderTop: `2px solid ${item.color}`,
                borderTopWidth: "0px",
                borderTopRightRadius: "10px",
              }}
            >
              <div
                className="w-2 h-10 rounded-e-lg"
                style={{ backgroundColor: item.color }} // Small vertical bar color
              ></div>
              <div className="flex items-center justify-between w-full p-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>
                  <p className="text-xl font-bold">{item.amount}</p>
                </div>
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-lg"
                  style={{
                    backgroundColor: `${item.color}20`, // Transparent background matching border color
                  }}
                >
                  <span className="text-3xl" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart, Contacts, and Maintenance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Chart Section */}
        
          <div className="bg-white rounded-lg shadow-md p-3 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Total Balance</h2>
              <select
                className="border border-gray-300 rounded-lg p-1"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="Last week">Last week</option>
                <option value="Last month">Last month</option>
                <option value="Last year">Last year</option>
              </select>
            </div>
            <div className="flex items-center justify-center rounded-lg h-64 lg:h-96">
              <BalanceChart data={chartData[selectedMonth]} />
            </div>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden rounded-lg"
            style={{ height: "475px" }}
          >
            {/* Contacts Section */}
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Important Numbers</h2>
                <button
                  className="p-1 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-500 text-white flex rounded-sm items-center"
                  onClick={handleAddClick}
                >
                  <FaPlus className="mr-2 text-white" />
                  Add
                </button>
              </div>

              {/* Popup for Adding or Editing Numbers */}
              {isPopupOpen && (
                <AddNumberPopup
                  mode={popupMode}
                  initialData={selectedNumberData}
                  editid={editid}
                  onClose={closePopup}
                  onImportantNumberAdded={handleImportantNumberAdded}
                />
              )}

              <ul className="space-y-3 mt-3 overflow-y-auto h-[calc(475px-100px)]">
                {importantnumber.length > 0 ? (
                  importantnumber?.map((important, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                    >
                      <div>
                        <p className="font-medium">
                          Name:{" "}
                          <span className="font-normal text-gray-400">
                            {important.fullName}
                          </span>
                        </p>
                        <p className="font-medium">
                          Phone Number:{" "}
                          <span className="font-normal text-gray-400">
                            {important.phoneNo}
                          </span>
                        </p>
                        <p className="font-medium">
                          Work:{" "}
                          <span className="font-normal text-gray-400">
                            {important.work}
                          </span>
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          className="bg-gray-100 p-1 rounded-lg"
                          onClick={() => handleDeleteClick(important._id)}
                        >
                          {Icons.Delete}
                        </button>
                        {isDeleteData && (
                          <DeletePopup
                            onClick={() => setIsDeleteData(false)}
                            editid={editid}
                            onClose={closePopup}
                            onImportantNumberAdded={handleImportantNumberAdded}
                          />
                        )}
                        <button
                          className="bg-gray-100 p-1 rounded-lg"
                          onClick={() =>
                            handleEditClick(important, important._id)
                          }
                        >
                          {Icons.Pen}
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-center mt-4">
                    No contacts available
                  </p>
                )}
              </ul>
            </div>

            {/* Maintenance Section */}
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Pending Maintenances</h2>
                <p>
                  <a href="#" className="text-blue-500 hover:underline">
                    View All
                  </a>
                </p>
              </div>

              <ul className="space-y-3 mt-3 overflow-y-auto h-[calc(475px-100px)]">
                {maintenances.length > 0 ? (
                  maintenances.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.status}</p>
                      </div>
                      <p className="text-red-500 font-semibold">
                        {item.amount}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-center mt-4">
                    No pending maintenances available
                  </p>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-11 pb-4">
          {/* Complaint List */}
          <div className="bg-white rounded-lg shadow-md p-3 overflow-x-auto lg:col-span-3 h-72">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Complaint List</h2>
              <select
                className="border border-gray-300 rounded-lg p-1"
                value={ComplaintselectedMonth}
                onChange={(e) => setComplaintSelectedMonth(e.target.value)}
              >
                <option>Last week</option>
                <option>Last month</option>
                <option>Last year</option>
              </select>
            </div>
            <Table columns={columns} data={complaintsTable} actions={actions} />
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

          {/* Upcoming Activities */}
          {/* <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upcoming Activity</h2>
              <select
                className="border border-gray-300 rounded-lg p-1"
                value={UpcomingselectedMonth}
                onChange={(e) => setUpcomingSelectedMonth(e.target.value)}
              >
                <option>Last week</option>
                <option>Last month</option>
                <option>Last year</option>
              </select>
            </div>
            <ul className="space-y-3">
              {activities.map((activity, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{activity.event}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <p className="text-gray-500">{activity.date}</p>
                </li>
              ))}
            </ul>
          </div> */}
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Upcoming Activity</h2>
        <select
          className="border border-gray-300 rounded-lg p-1"
          value={UpcomingselectedMonth}
          onChange={(e) => setUpcomingSelectedMonth(e.target.value)}
        >
          <option>Last week</option>
          <option>Last month</option>
          <option>Last year</option>
        </select>
      </div>
      <ul className="space-y-3">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{activity.event}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <p className="text-gray-500">{activity.date}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No activities found for {UpcomingselectedMonth}.</p>
        )}
      </ul>
    </div>
        </div>
      </div>
    </>
  );
};
