import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiSolidDonateBlood } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../services/API";
import Spinner from "../../components/shared/Spinner";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import InputType from "../../components/shared/Form/InputType";

const DonorList = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [selectedDonorId, setSelectedDonorId] = useState(null);

  const navigate = useNavigate();
  if (
    user?.role === "hospital" ||
    user?.role === "donor" ||
    user?.role === "organisation"
  )
    navigate("/");

  // Fetch donor records
  const getDonors = async () => {
    try {
      const { data } = await API.get("/admin/donor-list");
      if (data?.success) {
        setData(data?.donorData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Open edit form and populate with donor data
  const handleEdit = (record) => {
    setIsEditing(true);
    setEditData({
      name: record.name,
      email: record.email,
      phone: record.phone,
    });
    setSelectedDonorId(record._id);
  };

  // Handle input change in the form
  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // Update donor
  const handleUpdate = async () => {
    try {
      const response = await API.put(
        `/admin/user/${selectedDonorId}`,
        editData
      );
      if (response.data.success) {
        toast.success("Donor updated successfully!");
        getDonors(); // Refresh list after update
        setIsEditing(false); // Close form
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating donor:", error);
      toast.error("Error occurred while updating donor.");
    }
  };

  // Delete function for deleting donor
  const handleDelete = async (donorId) => {
    if (confirm("Are you want to delete this donor?")) {
      try {
        const response = await API.delete(`/admin/user/${donorId}`);
        if (response.data.success) {
          toast.success("Donor deleted successfully!");
          getDonors();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting donor:", error);
        toast.error("Error occurred while deleting donor.");
      }
    }
  };

  useEffect(() => {
    getDonors();
  }, []);

  return (
    <>
      {loading && <Spinner message="Please wait..." />}
      <div className="container mx-auto">
        <div className="font-bold dark:text-gray-100 flex items-center gap-3 text-2xl">
          <BiSolidDonateBlood />
          Donors
        </div>
        <div className="flex mt-3 flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border border-black/25 rounded-xl max-h-xs overflow-auto dark:border-neutral-700">
                <table className="min-w-full divide-y divide-black/25 dark:divide-neutral-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs text-start font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/25 dark:divide-neutral-700">
                    {data?.map((record) => (
                      <tr key={record._id}>
                        <td className="px-6 py-4 capitalize text-sm font-medium text-gray-800 dark:text-gray-200">
                          {record.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                          {record.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                          +91 {record.phone}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                          {record.address}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                          {moment(record.createdAt).format(
                            "DD/MM/YYYY hh:mm A"
                          )}
                        </td>
                        <td className="px-6 flex gap-3 py-4 text-sm">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl flex items-center"
                            onClick={() => handleEdit(record)}
                          >
                            <FaEdit className="mr-2" />
                            Update
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl flex items-center"
                            onClick={() => handleDelete(record._id)}
                          >
                            <FaTrash className="mr-2" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Edit form - Popup modal */}
        {isEditing && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40"
              onClick={() => setIsEditing(false)}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white border-2 dark:border-slate-500 border-gray-200 dark:bg-slate-700 p-6 rounded-xl shadow-lg w-96 relative">
                <div className="flex justify-between mb-4 items-center">
                  <h3 className="font-bold dark:text-white text-xl">Update Donor</h3>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-500 dark:text-white hover:text-gray-700"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
                <form>
                  {/* Name Input */}
                  <div className="mb-4">
                    <InputType
                      labelText="Name"
                      labelFor="name"
                      inputType="text"
                      name="name"
                      placeholder="Enter donor name"
                      value={editData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="mb-4">
                    <InputType
                      labelText="Email"
                      labelFor="email"
                      inputType="email"
                      name="email"
                      placeholder="user@example.com"
                      value={editData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="mb-4">
                    <InputType
                      labelText="Phone"
                      labelFor="phone"
                      inputType="text"
                      name="phone"
                      placeholder="Enter phone number"
                      value={editData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DonorList;
