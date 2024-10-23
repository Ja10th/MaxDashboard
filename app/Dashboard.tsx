'use client'
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  recentlyAssignedData,
  recentlyViewedData,
  completedTasksData,
  assignedTasksData,
} from "./components/constant";
import Modal from "./components/Modal"; 

const ITEMS_PER_PAGE = 5;

export interface Item {
  name: string;
  workflow?: string;
  stage?: string;
  updatedAt?: string;
  uploadedAt?: string;
  assignedAt?: string;
  [key: string]: string | number | undefined; // Specific types instead of any
}

const Dashboard = () => {
  const [recentlyAssignedPage, setRecentlyAssignedPage] = useState(1);
  const [recentlyViewedPage, setRecentlyViewedPage] = useState(1);
  const [completedTasksPage, setCompletedTasksPage] = useState(1);
  const [assignedTasksPage, setAssignedTasksPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<null | Item>(null); 
  const [modalOpen, setModalOpen] = useState(false); 

  const totalRecentlyAssignedPages = Math.ceil(
    recentlyAssignedData.length / ITEMS_PER_PAGE
  );
  const totalRecentlyViewedPages = Math.ceil(
    recentlyViewedData.length / ITEMS_PER_PAGE
  );
  const totalCompletedTasksPages = Math.ceil(
    completedTasksData.length / ITEMS_PER_PAGE
  );
  const totalAssignedTasksPages = Math.ceil(
    assignedTasksData.length / ITEMS_PER_PAGE
  );

  const renderTable = (
    data: Item[], 
    title: string,
    columns: string[],
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number
  ) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE); 

    const handleViewClick = (item: Item) => {
      setSelectedItem(item);
      setModalOpen(true);
    };

    return (
      <div className="w-full md:w-1/2 h-full border p-5 rounded-xl">
        <h2 className="text-lg font-semibold py-3 pl-2 text-left">{title}</h2>
        <table className="w-full table-auto border-collapse border-b border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th key={column} className="p-2 text-left">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td className="border-b border-gray-300 p-2 text-sm text-left">
                  {item.name}
                </td>
                {Object.keys(item)
                  .slice(1)
                  .map((key, i) => {
                    if (key === "stage") {
                      return (
                        <td
                          key={i}
                          className="border-b border-gray-300  text-xs md:text-sm px-2 text-center"
                        >
                          <Chip status={item[key] as string} />
                        </td>
                      );
                    }

                    return (
                      <td
                        key={i}
                        className="border-b border-gray-300 p-2 text-sm text-left"
                      >
                        {item[key]}
                      </td>
                    );
                  })}
                <td className="border-b border-gray-300 p-2 text-sm text-left">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => handleViewClick(item)} 
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center mt-4">
          <div className="flex items-center">
            <button
              className="bg-gray-200 p-3 rounded-full mx-1"
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
              }
              disabled={currentPage === 1}
            >
              <IoIosArrowBack />
            </button>
            <span className="mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-gray-200 p-3 rounded-full mx-1"
              onClick={() =>
                setCurrentPage(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              disabled={currentPage === totalPages}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row items-center px-10 py-2 gap-4">
        {renderTable(
          recentlyAssignedData,
          "Recently Assigned to Me",
          ["Name", "Workflow", "Stage", "Updated At", "Action"],
          recentlyAssignedPage,
          setRecentlyAssignedPage,
          totalRecentlyAssignedPages
        )}

        {renderTable(
          recentlyViewedData,
          "Recently Viewed",
          ["Name", "Uploaded At", "Action"],
          recentlyViewedPage,
          setRecentlyViewedPage,
          totalRecentlyViewedPages
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center px-10 py-2 gap-4">
        {renderTable(
          completedTasksData,
          "Completed Tasks",
          ["Name", "Completed At", "Action"],
          completedTasksPage,
          setCompletedTasksPage,
          totalCompletedTasksPages
        )}

        {renderTable(
          assignedTasksData,
          "Assigned Tasks",
          ["Name", "Assigned At", "Action"],
          assignedTasksPage,
          setAssignedTasksPage,
          totalAssignedTasksPages
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        page={recentlyAssignedPage}
      />
    </div>
  );
};

export default Dashboard;



const Chip = ({ status }: { status: string }) => {
  let bgColor;

  switch (status) {
    case 'Completed':
      bgColor = 'bg-green-100 text-green-700'; // Green for completed
      break;
    case 'Pending':
      bgColor = 'bg-orange-100 text-orange-700'; // Orange for pending
      break;
    case 'Not Started':
      bgColor = 'bg-gray-100 text-gray-700'; // Gray for not started
      break;
    case 'In Progress':
      bgColor = 'bg-purple-100 text-purple-700'; // Gray for not started
      break;
    default:
      bgColor = 'bg-gray-100 text-black'; // Default color
  }

  return (
    <div className={` md:text-xs font-semibold w-20 md:w-auto py-1 px-0 rounded-full ${bgColor}`}>
      {status}
    </div>
  );
};