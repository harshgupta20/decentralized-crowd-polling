import React, { useEffect, useState } from 'react'
import TaskCard from '../../components/TaskCard';
import toastAlert from '../../utils/alert';
import axiosInstance from '../../utils/axios';

const ViewTasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get("/v1/user/task");
      if (response?.status === 200) {
        setTaskList(response?.data?.data);
        toastAlert("success", "Tasks Fetched Successfully.");
      } else {
        throw new Error("Problem in fetching data.");
      }
    } catch (error) {
      toastAlert("error", error?.message || "Something Went Wrong.");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title Section */}
      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
        Tasks
      </h1>

      {/* Loading State */}
      {loading ? (
        <div className="text-center">
          <p className="text-lg text-gray-500">Loading tasks...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Task Cards */}
          {taskList?.length > 0 ? (
            taskList.map((data, key) => (
              <div key={key} className="w-full">
                <TaskCard
                  title={data?.title}
                  taskId={data?.id}
                  options={data?.options}
                  optionWithMaxCount={data?.optionWithMaxCount}
                />
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-500 text-center w-full">No tasks available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewTasks;
