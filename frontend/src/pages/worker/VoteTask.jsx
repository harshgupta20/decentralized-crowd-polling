import { useEffect } from "react"
import toastAlert from "../../utils/alert"
import axiosInstance from "../../utils/axios";

const VoteTask = () => {

  const getLatestTask = async () => {
    try{
        const response = await axiosInstance.get("/v1/worker/nextTask");
        console.log(response);
    }
    catch(error){
      toastAlert("error", error?.message || "Something Went Wrong.")
    }
  }

  useEffect(() => {
    getLatestTask();
  }, [])
  

  return (
    <>
      <div>
        <h1></h1>

        <div>
          <img
            src={""}
            alt={`option-id-${"option?.id"}`}
            className="w-32 h-32 object-cover rounded-md mb-2"
          />
        </div>
      </div>
    </>
  )
}

export default VoteTask