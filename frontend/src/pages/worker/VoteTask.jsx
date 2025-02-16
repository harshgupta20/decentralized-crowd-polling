import { useEffect, useState } from "react";
import toastAlert from "../../utils/alert";
import axiosInstance from "../../utils/axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const VoteTask = () => {
  const [taskInfo, setTaskInfo] = useState(null);
  const [selectedOption, setSelectedTask] = useState(null);
  const [isOptionSubmitting, setIsOptionSubmitting] = useState(false);

  const [showSuccessSubmission, setShowSuccessSubmission] = useState(false);

  const getLatestTask = async () => {
    try {
      const response = await axiosInstance.get("/v1/worker/nextTask");
      if (response.status === 200) {
        setTaskInfo(response?.data?.data);
      }
      console.log(response);
    } catch (error) {
      toastAlert("error", error?.message || "Something Went Wrong.");
    }
  };

  const submitSelectedOption = async (taskId, optionId) => {
    try {
      setIsOptionSubmitting(true);
      const response = await axiosInstance.post("/v1/worker/submission", {
        taskId,
        optionId
      });
      if (response?.status === 200) {
        console.log(response?.data);
        setTaskInfo(response?.data?.data?.nextTask);
      }
    }
    catch (error) {
      toastAlert("error", error?.message || "Something Went Wrong.");
    }
    finally {
      setIsOptionSubmitting(false);

    }
  }

  useEffect(() => {
    getLatestTask();
  }, []);

  return (
    <>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {taskInfo?.title}
          </h1>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(!isOptionSubmitting && taskInfo?.options?.length > 0) ?
              taskInfo?.options?.map((option, index) => {
                return (
                  <div
                    key={option?.id || index}
                    onClick={() => {
                      submitSelectedOption(option?.task_id, option.id);
                      setSelectedTask({ ...option, index: index + 1 });
                    }}
                    className={`bg-white flex flex-col items-center shadow-sm rounded-lg p-4 w-full transition-all duration-200 hover:shadow-md cursor-pointer hover:bg-indigo-100`}
                  >

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Option {index + 1}
                    </h2>
                    <img
                      src={option?.image_url}
                      alt={`option-id-${option?.id}`}
                      className="w-32 h-32 object-cover rounded-md mb-4"
                    />
                  </div>
                );
              })
              : !isOptionSubmitting && "No Tasks left, Please check after some for new task."
            }

            {
              isOptionSubmitting && (
                <p className="animate-bounce m-auto">Submitting your response...<span className="font-bold italic text-indigo-400">Option: {selectedOption.index}</span></p>
              )
            }
          </div>
        </div>
      </div>

      <button onClick={() => setShowSuccessSubmission(true)}>omom</button>
      <Dialog
        open={showSuccessSubmission}
        onClose={() => setShowSuccessSubmission(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Your Task Submitted Successfully.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The amount has been added for the task you have completed. Please proceed to the next task.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSuccessSubmission(false)} autoFocus>
            Ok, Cool
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VoteTask;
