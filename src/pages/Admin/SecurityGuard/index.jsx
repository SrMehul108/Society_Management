import React, { useEffect, useState } from "react";
import AddSecurity from "../../../components/SecurityGuard/AddSecurity";
import ViewSecurity from "../../../components/SecurityGuard/ViewSecurity";
import DeleteSecurity from "../../../components/SecurityGuard/DeleteSecurity";
import {
  DayButton,
  FeMaleButton,
  MaleButton,
  NightButton,
} from "../../../components/Button/Button";
import { GetGuard } from "../../../apis/api";

function SecurityGuard() {
  // Modal and form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [securityData, setSecurityData] = useState();

  const openModal = (item = null) => {
    setEditingItem(item); // If item is passed, open in edit mode
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingItem(null);
    setIsModalOpen(false);
  };

  // delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  // view
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const openViewModal = (item) =>{
    setViewItem(item);
    setIsViewOpen(true);
  }
  const closeViewModal = () => {
    setViewItem(null);
    setIsViewOpen(false);
  }

  const FetchSecurityGuard = async () => {
    try {
      const data = await GetGuard();
      setSecurityData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGuardAdd=()=>{
    FetchSecurityGuard()
    closeModal()
  }

  useEffect(() => {
    FetchSecurityGuard();
  }, []);

  return (
    <>
      <div className="p-4 bg-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-end space-y-4 md:space-y-0">
          <button
            onClick={() => openModal()} // Opens modal for adding new expense
            className="w-full md:w-auto mt-4 md:mt-0 px-6 py-2  0  text-white font-semibold rounded-lg shadow-md  transition bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500"
          >
            Add Security
          </button>
        </div>

        {/* Modal for adding or editing expense */}
        {isModalOpen && (
          <AddSecurity
            isOpen={isModalOpen}
            onClose={closeModal}
            itemToEdit={editingItem}
            onAddGuard={handleGuardAdd}
          />
        )}

        <div
          role="tablist"
          className="mt-4 tabs tabs-lifted tabs-lg rounded-lg"
        >
          <div className="bg-white p-4 overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Securtiy Guard Details{" "}
            </h2>

            <div className="overflow-x-auto rounded-lg h-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-royalgray sticky top-0 w-full">
                  <tr>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      Securtiy Guard Name
                    </th>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      Phone Number
                    </th>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      Selete Shift{" "}
                    </th>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      {" "}
                      Shift Date
                    </th>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      {" "}
                      Shift Time
                    </th>

                    <th className="px-4 py-2 text-left text-black font-semibold">
                      Gender
                    </th>
                    <th className="px-4 py-2 text-left text-black font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200  overflow-y-auto custom-scrollbar">
                  {securityData?.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 ">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img
                          src={item.profile_image}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="text-gray-700 ">{item.fullName}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-black ">{item.phoneNo}</span>
                      </td>
                      <td className="px-4 py-3">
                        {/* <span
                          className={`px-2 py-1 rounded-full ${
                            item.shift === "day"
                              ? " text-yellow-600"
                              : "bg-green-100 text-yellow-600"
                          }`}
                        >
                          {item.shift}
                        </span> */}
                        {item.securityData.shift === "day" ? (
                          <DayButton />
                        ) : (
                          <NightButton />
                        )}
                      </td>

                      <td className="px-4 py-3 ">
                        {item.securityData.shiftDate}
                      </td>
                      <td className="px-4 py-3 ">
                        {item.securityData.shiftTime}
                      </td>
                      <td className="px-4 py-3">
                        {item.gender.toLowerCase() === "male" ? (
                          <MaleButton />
                        ) : (
                          <FeMaleButton />
                        )}
                      </td>
                      <td className=" text-sm text-blue-500 cursor-pointer hover:text-blue-700 ">
                        <button
                          onClick={() => openModal(item)} // Edit button
                          className="text-green-500 hover:text-green-700 p-1"
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                          className="text-blue-500 hover:text-blue-700 p-1"
                          onClick={() => openViewModal(item)}
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        {isViewOpen && (
                          <ViewSecurity closeModal={closeViewModal} item={viewItem} />
                        )}
                        <button
                          className="text-red-500 hover:text-red-700 p-1"
                          onClick={openDeleteModal}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                        {isDeleteOpen && (
                          <DeleteSecurity closeModal={closeDeleteModal} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SecurityGuard;
