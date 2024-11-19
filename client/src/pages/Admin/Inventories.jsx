import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../services/API";
import Spinner from "../../components/shared/Spinner";
import { FaEdit, FaHospitalAlt, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import InputType from "../../components/shared/Form/InputType";

const HospitalList = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  if (
    user?.role === "hospital" ||
    user?.role === "donor" ||
    user?.role === "organisation"
  )
    navigate("/");

  // Fetch hospitals
  const getInventories = async () => {
    try {
      const { data } = await API.get("/admin/get-all-inventories");
      if (data?.success) {
        setData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInventories();
  }, []);

  const handleDelete = async (inventoryId) => {
    try {
      const response = await API.delete(`/admin//inventory/${inventoryId}`);
      if (response.data.success) {
        toast.success("Inventory deleted successfully!");
        getInventories();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting inventory:", error);
      toast.error("Error occurred while deleting inventory.");
    }
  };

  return (
    <>
      {loading && <Spinner message="Please wait..." />}
      <div className="container mx-auto">
        <div className="font-bold dark:text-gray-100 flex items-center gap-3 text-2xl">
          <FaHospitalAlt />
          Hospitals
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
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                      >
                        Blood Group
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                      >
                        Inventory Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                      >
                        Organisation Email(From)
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                      >
                        Donor/Hospital Email(To)
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                      >
                        Time & Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/25 dark:divide-neutral-700">
                    {data?.map((record) => (
                      <tr key={record._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {record.bloodGroup}
                        </td>
                        <td className="px-6 py-4 uppercase whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          {record.inventoryType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          {record.quantity} ml
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm text-gray-800 dark:text-gray-200">
                          {record.organisation.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm text-gray-800 dark:text-gray-200">
                          {record.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm text-gray-800 dark:text-gray-200">
                          {moment(record.createdAt).format(
                            "DD/MM/YYYY hh:mm A"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm text-gray-800 dark:text-gray-200">
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-xl flex items-center"
                            onClick={() => handleDelete(record._id)}
                          >
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
      </div>
    </>
  );
};

export default HospitalList;
