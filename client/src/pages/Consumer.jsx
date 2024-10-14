import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../services/API';
import Spinner from '../components/shared/Spinner';
import { BiSolidDonateBlood } from 'react-icons/bi';
import moment from 'moment';
import { MdWidgets } from 'react-icons/md';

const Consumer = () => {
    const { loading, user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    if(user?.role === "organisation" || user?.role === "donor") navigate("/")
    // find inventory hospital records
    const getHopsitalConsumerInventory = async () => {
      try {
        const { data } = await API.post("/inventory/get-inventory-hospital", {
            filters: {
                hospital: user?._id,
                inventoryType: "out",
            }
        });
        console.log(data);
        
        if (data?.success) {
          setData(data?.inventory);
        }
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
        getHopsitalConsumerInventory();
    }, [user]);
    
    return (
      <>
        {loading && <Spinner message="Please wait..." />}
        <div className="container mx-auto">
        <div className="font-bold flex items-center gap-3 text-2xl"><MdWidgets />Consumers</div>
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
                          Blood Group
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Inventory Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Quantity
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
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/25 dark:divide-neutral-700">
                    {data?.map((record) => (
                        <tr key={record._id}>
                          <td className="px-6 py-4 capitalize whitespace-nowrap text-sm font-medium text-gray-800 ">
                            {record.bloodGroup}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            {record.inventoryType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            {record.quantity} ml
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            {record.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-start text-sm">
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
}

export default Consumer
