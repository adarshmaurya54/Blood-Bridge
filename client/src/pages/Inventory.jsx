import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa"; // Importing the Plus icon from react-icons
import Spinner from "../components/shared/Spinner";
import Modal from "../components/shared/Modal"; // Import your Modal component
import API from "../services/API";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  if (user?.role === "donor") navigate("/");
  if (user?.role === "hospital") navigate("/");
  const inputFields = [
    {
      labelText: "Name",
      labelFor: "name",
      inputType: "text",
      name: "name",
      placeholder: "Enter your name",
    },
    {
      labelText: "Email",
      labelFor: "email",
      inputType: "email",
      name: "email",
      placeholder: "Enter your email",
    },
    {
      labelText: "Password",
      labelFor: "password",
      inputType: "password",
      name: "password",
      placeholder: "Enter your password",
    },
  ];
  // getting all the inventory data initial time
  const getBloodReacords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          toast.error(error.response.data.message); // 500 error toast
        }
      }
      console.log(error.response);
    }
  };
  useEffect(() => {
    getBloodReacords();
  }, []);
  return (
    <>
      {loading && <Spinner message="Please wait..." />}
      <div className="container mx-auto">
        <Modal
          modalTitle={"Add Inventory"}
          buttonName={"Add Inventory"}
          inputFields={inputFields}
          buttonIcon={<FaPlus />}
          getBloodReacords={getBloodReacords}
        />
        <div className="flex mt-3 flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border border-black/25 rounded-lg max-h-xs overflow-auto dark:border-neutral-700">
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
                        Donor/Hospital Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                      >
                        Time & Date
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
                          {record.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm text-gray-800 dark:text-gray-200">
                          {moment(record.createdAt).format(
                            "DD/MM/YYYY hh:mm A"
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
      </div>
    </>
  );
};

export default Inventory;
