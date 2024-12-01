import React, { useEffect, useState } from "react";// useEffect : handle side effects like API calls & useState : manage local state
import { useSelector } from "react-redux";// useSelector : Fetches data from the Redux store.
import API from "../services/API";//API: Manages backend calls.
import Spinner from "../components/shared/Spinner";//Spinner: A loading spinner component.
import moment from "moment";//moment: A library for formatting dates.
import { FaHospitalAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";//useNavigate: Used for navigation between pages in the React Router.

const Hospital = () => { //Hospital Component
  const { loading, user } = useSelector((state) => state.auth);//loading:Indicates if data is still loading & user:current logged-in user’s details.
  const [data, setData] = useState([]);//data: Stores the list of donors fetched from the backend.
  const navigate = useNavigate();//navigate: Used to redirect users to another page.
  if (user?.role === "donor") navigate("/");
  if (user?.role === "hospital") navigate("/");
  // find donor records
  const getHospitals = async () => {  //asynchronous arrow function
    try {
      const { data } = await API.get("/inventory/get-hospitals");//sends a GET request to the server, await:function waits for the promise to resolve or reject 
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { //any changes we want to do getHospitals() calls 
    getHospitals();
  }, []);
  return (
    <>
      {loading && <Spinner message="Please wait..." />}
      <div className="container mx-auto">
        <div className="font-bold flex items-center gap-3 text-2xl dark:text-gray-100">
          <FaHospitalAlt />
          Hospitals
        </div>
        <div className="flex mt-3 flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border border-black/25 rounded-lg max-h-xs overflow-auto dark:border-neutral-700">
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
                        className="px-6 w-[40%] py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/25 dark:divide-neutral-700">
                    {data?.map((record) => ( //maps all the arrays data rowise
                      <tr key={record._id}>
                        <td className="px-6 py-4 capitalize whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {record.hospitalName ||
                            record.organisationName + " (ORG)"}
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

export default Hospital;