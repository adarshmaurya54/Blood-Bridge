import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../services/API";
import Spinner from "../components/shared/Spinner";
import moment from "moment";

const Hospital = () => {
  const { loading } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  // find donor records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHospitals();
  }, []);
  return (
    <>
      {loading && <Spinner message="Please wait..." />}
      <div className="container mx-auto">
        <div className="font-bold text-xl">Hospitals</div>
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
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/25 dark:divide-neutral-700">
                    {data?.map((record) => (
                      <tr key={record._id}>
                        <td className="px-6 py-4 capitalize whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                          {record.hospitalName || record.organisationName + " (ORG)"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {record.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          +91 {record.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {record.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm">
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
