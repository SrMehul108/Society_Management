import React, { useState, useEffect } from "react";
import ComplaintSubmission from "../../../components/User/ServiceAndComplaint/Complaint/ComplaintSubmission";
import { GetUserComplaint } from "../../../apis/api";

const UserComplaintSubmission = () => {
  const [complaintData, setComplaintData] = useState([]);

  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const FetchComplaintData = async () => {
    try {
        const type = "complaint";
        const response = await GetUserComplaint(type); // Ensure GetUserComplaint is defined
        console.log("API Response:", response);
  
        // Check if the response is an array and not empty
        if (Array.isArray(response) && response.length > 0) {
          setComplaintData(response);
          console.log("Complaints Table Updated:", response);
        } else {
          console.log("No complaints found or invalid response format.");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error occurred:", error.message);
      } finally {
        setLoading(false);
      }
  };

  const FetchRequestData = async () => {
    try {
      const type = "request";
      const response = await GetUserComplaint(type); // Ensure GetUserComplaint is defined
      console.log("API Response:", response);

      // Check if the response is an array and not empty
      if (Array.isArray(response) && response.length > 0) {
        setRequestData(response);
        console.log("Complaints Table Updated:", response);
      } else {
        console.log("No complaints found or invalid response format.");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error occurred:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const HandleAdded=()=>{
    FetchComplaintData()
    FetchRequestData(); 
  }

  useEffect(() => {
    FetchComplaintData()
    FetchRequestData(); // Fetch complaint data when component mounts
  }, []);

  return (
    <div className="bg-gray-100">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ComplaintSubmission HandleAdd={HandleAdded} complaint={complaintData} request={requestData} />
      )}
    </div>
  );
};

export default UserComplaintSubmission;
