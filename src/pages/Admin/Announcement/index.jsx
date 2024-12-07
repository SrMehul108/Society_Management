import React, { useEffect, useRef, useState } from "react";
import AnnouncementAdd from "../../../components/Announcement/AnnouncementAdd";
import AnnouncementEdit from "../../../components/Announcement/AnnouncementEdit";
import AnnouncementDelete from "../../../components/Announcement/AnnouncementDelete";
import { GetAnnouncement } from "../../../apis/api";
import AnnouncementView from "../../../components/Announcement/AnnouncementView";

const Announcement = () => {
  const [menuVisible, setMenuVisible] = useState(null);
  const [detail, setDetail] = useState();
  const [viewItem, setViewItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const toggleMenu = (id) => {
    setMenuVisible((prev) => (prev === id ? null : id));
  };
  // create Note popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Edit  popup
  const [isPopupEdit, setIsPopupEdit] = useState(false);
  const [editId, setEditId] = useState();

  const editPopup = (note) => {
    console.log("edit");
    setEditingItem(note);
    setEditId(note._id);
    setIsPopupEdit(true);
  };

  const EditclosePopup = () => {
    setEditingItem(null);
    setIsPopupEdit(false);
  };

  // delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteModal = (id) => {
    setDeleteItemId(id);
    setIsDeleteOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteOpen(false);

  //View protocols popup
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Sample data for the request

  const openViewModal = (note) => {
    setViewItem(note);
    setIsViewOpen(true);
  };
  const closeViewModal = () => {
    setViewItem(null);
    setIsViewOpen(false);
  };

  const FetchAnnouncement = async () => {
    try {
      const params = "activity";
      const response = await GetAnnouncement(params);
      if (response.success) {
        setDetail(response.data);
      } else {
        console.error("Error fetching complaints:", response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AddedAnnouncement = () => {
    FetchAnnouncement();
    closePopup();
  };

  useEffect(() => {
    FetchAnnouncement();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-white w-full rounded-xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">
          Announcement
        </h1>
        <button
          className=" text-white py-2 px-4 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500  hover:from-orange-500 hover:to-yellow-500 transition-all"
          onClick={openPopup}
        >
          Create Announcement
        </button>
        {isPopupOpen && (
          <AnnouncementAdd
            onClose={closePopup}
            onAddAnnouncement={AddedAnnouncement}
          />
        )}
      </div>

      {/* Facility Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {detail?.map((note) => (
          <div key={note._id} className="rounded-lg border relative">
            <div className="bg-blue-500 rounded-t-lg flex justify-between items-center p-3">
              <h2 className="font-semibold text-xl text-white">{note.title}</h2>
              <div className="relative">
                <i
                  className="fas fa-ellipsis-h text-gray-600 bg-white p-1 rounded-sm cursor-pointer"
                  onClick={() => toggleMenu(note._id)}
                ></i>
                {menuVisible === note._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => editPopup(note, note._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => openViewModal(note, note._id)}
                    >
                      View
                    </button>
                    {isViewOpen && (
                      <AnnouncementView
                        data={viewItem}
                        closeModal={closeViewModal}
                      />
                    )}
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        openDeleteModal(note._id);
                      }}
                    >
                      Delete
                    </button>
                    {isDeleteOpen && (
                      <AnnouncementDelete closeModal={closeDeleteModal} AnnoucementId={deleteItemId} onDeleteAnnouncement={AddedAnnouncement} />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="p-1 flex justify-between">
              <h2 className="font-normal text-gray-500">Announcement Date</h2>
              <p>{note.date}</p>
            </div>
            <div className="p-1 flex justify-between">
              <h2 className="font-normal text-gray-500">Announcement Time</h2>
              <p>{note.time}</p>
            </div>

            <div className="p-1">
              <h2 className="font-normal text-gray-500">Description</h2>
              <p>{note.description}</p>
            </div>
          </div>
        ))}
        {isPopupEdit && (
          <AnnouncementEdit
            onClose={EditclosePopup}
            itemToEdit={editingItem}
            AnnouncementId={editingItem._id}
            onAddAnnouncement={AddedAnnouncement}
          />
        )}
      </div>
    </div>
  );
};

export default Announcement;
