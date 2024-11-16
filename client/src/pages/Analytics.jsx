import React, { useEffect, useState } from "react";
import moment from "moment";
import API from "../services/API";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const {user} = useSelector(state => state.auth)
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  // colors for blood card record
  const colors = [
    "bg-blue-200",
    "bg-pink-200",
    "bg-yellow-200",
    "bg-red-200",
    "bg-green-200",
    "bg-orange-200",
    "bg-indigo-200",
    "bg-white",
  ];

  if(user?.role === "donor" || user?.role === "admin" || user?.role === "hospital"){
    navigate("/");
  }

  // GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const response = await API.get("/analytics/bloodGroups-data");
      if (response?.data?.success) {
        setData(response?.data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET RECENT BLOOD RECORDS
  const getBloodRecords = async () => {
    try {
      const response = await API.get("/inventory/get-recent-inventory");
      if (response?.data?.success) {
        setInventoryData(response?.data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
    getBloodRecords();
  }, []);

  // Prepare data for Bar and Pie charts
  const barData = {
    labels: data.map((record) => record.bloodGroup),
    datasets: [
      {
        label: "Total In (ML)",
        data: data.map((record) => record.totalIn),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Out (ML)",
        data: data.map((record) => record.totalOut),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: data.map((record) => record.bloodGroup),
    datasets: [
      {
        data: data.map((record) => record.availableBlood),
        backgroundColor: [
          "#FF6384", // Soft Red
          "#36A2EB", // Light Blue
          "#FFCE56", // Soft Yellow
          "#4BC0C0", // Turquoise
          "#9966FF", // Light Purple
          "#FF9F40", // Orange
          "#2ecc71", // Emerald Green
          "#e74c3c", // Bright Red
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl text-center font-bold text-gray-800 dark:text-gray-100">
        Analytics Page
      </h1>
      <div className="flex md:flex-row gap-10 flex-col">
        {/* Bar Chart for In/Out Analysis */}
        <div className="w-full mx-auto md:my-10 mt-10 mb-[-50px] p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-2xl text-center font-bold mb-4">
            Blood Group In/Out Analysis
          </h2>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </div>

        {/* Pie Chart for Available Blood */}
        <div className="w-full mx-auto my-10 p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-2xl text-center font-bold mb-4">
            Available Blood by Blood Group
          </h2>
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Blood Group Cards */}
      <div className="flex flex-wrap justify-center gap-6 my-8">
        {data.length > 0 ? (
          data.map((record, i) => (
            <div
              key={i}
              className={`w-80 p-6 rounded-xl shadow-lg ${
                colors[i % colors.length]
              } cursor-pointer hover:shadow-xl`}
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold bg-gray-100 text-gray-800 py-2 mb-4 rounded-xl">
                  {record.bloodGroup}
                </h2>
                <p className="text-lg">
                  <span className="font-bold">Total In:</span> {record.totalIn}{" "}
                  ML
                </p>
                <p className="text-lg">
                  <span className="font-bold">Total Out:</span>{" "}
                  {record.totalOut} ML
                </p>
                <div className="mt-4 bg-gray-800 text-white py-2 rounded-xl">
                  <span className="font-bold">Total Available:</span>{" "}
                  {record.availableBlood} ML
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No data available for blood groups.</p>
        )}
      </div>

      {/* Recent Blood Transactions Table */}
      <div className="my-10">
        <h1 className="text-3xl font-semibold text-center text-black dark:text-gray-100 mb-6">
          Recent Blood Transactions
        </h1>
        <div className="border border-black/25 rounded-lg max-h-xs overflow-auto dark:border-neutral-700">
        <table className="min-w-full divide-y divide-black/25 dark:divide-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white">
            <thead className="bg-black dark:bg-gray-700">
              <tr className="text-left text-white font-bold uppercase text-sm">
                <th className="px-6 py-3">Blood Group</th>
                <th className="px-6 py-3">Inventory Type</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Donor Email</th>
                <th className="px-6 py-3">Time & Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/25 dark:divide-neutral-700">
              {inventoryData.length > 0 ? (
                inventoryData.map((record) => (
                  <tr key={record._id} className="border-t">
                    <td className="px-6 py-4">{record.bloodGroup}</td>
                    <td className="px-6 py-4 uppercase">{record.inventoryType}</td>
                    <td className="px-6 py-4">{record.quantity} (ML)</td>
                    <td className="px-6 py-4">{record.email}</td>
                    <td className="px-6 py-4">
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center" colSpan="5">
                    No recent blood transactions available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
