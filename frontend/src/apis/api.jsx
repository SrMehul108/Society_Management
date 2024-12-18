import axios from "axios";
import { jwtDecode } from "jwt-decode";

var API_URL = import.meta.env.VITE_API_URL;

//Token

export const AdminToken = () => {
  const admintoken = sessionStorage.getItem("admintoken");
  if (!admintoken) {
    return "Token is Missing";
  }
  return admintoken;
};

export const UserToken = () => {
  const usertoken = sessionStorage.getItem("usertoken");
  if (!usertoken) {
    return "Token is Missing";
  }
  return usertoken;
};

export const SecurityToken = () => {
  const securitytoken = sessionStorage.getItem("securitytoken");
  if (!securitytoken) {
    return "Token is Missing";
  }
  return securitytoken;
};

export const LoginData = () => {
  // Check all possible role-based tokens
  const admintoken = sessionStorage.getItem("admintoken");
  const usertoken = sessionStorage.getItem("usertoken");
  const securitytoken = sessionStorage.getItem("securitytoken");

  let activeToken = admintoken || usertoken || securitytoken;

  if (activeToken) {
    const decodedToken = jwtDecode(activeToken);
    return decodedToken.userData;
  }

  return null; // No token found
};

//Auth API

export const Registration = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    if (response.status === 200 && response.data.status === 1) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return error.response?.data || error;
  }
};

export const Society = async () => {
  const response = await axios.get(`${API_URL}/society/getSociety`);
  if (response.status === 200 && response.data.status === 1) {
    return response.data.data;
  }
  return [];
};

export const CreateSociety = async (societyData) => {
  try {
    const response = await axios.post(
      `${API_URL}/society/insertSociety`,
      societyData
    );
    return response;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    const token = response.data.data;

    // Decode the token to extract user data
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.userData.role;

    // Save the token and role in sessionStorage based on role
    if (userRole === "admin") {
      sessionStorage.setItem("admintoken", token);
      sessionStorage.setItem("role", "admin");
    } else if (userRole === "user") {
      sessionStorage.setItem("usertoken", token);
      sessionStorage.setItem("role", "user");
    } else if (userRole === "security") {
      sessionStorage.setItem("securitytoken", token);
      sessionStorage.setItem("role", "security");
    }

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const resendOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const forgotPassword = async (passdata) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/forgot-password`,
      passdata
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const otpPage = async (otp) => {
  try {
    const data = { otp };
    const response = await axios.post(`${API_URL}/auth/verify-otp`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const resetPassword = async (rpass) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, rpass);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

//Dashboard API
export const GetDashBoardBalance = async () => {
  const token = AdminToken();
  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.get(`${API_URL}/auth/admin/SocietyBalance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data.status === 1) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const GetDashboardMaintainence = async () => {
  const token = AdminToken();

  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.get(
      `${API_URL}/auth/admin/pendingMaintenanceList`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

//User API

export const userRegistration = async (formdata) => {
  const token = AdminToken();
  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }
  if (!formdata) return { success: false, message: "formdata is missing" };
  console.log(formdata);

  try {
    const response = await axios.post(
      `${API_URL}/auth/admin/insertUser`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);

    if (response.status === 200 && response.data?.status === 1) {
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data?.message || "Unexpected error occurred.",
      };
    }
  } finally {
    console.log("Completed");
  }
};

export const userUpdate = async (updatedUserData) => {
  const token = AdminToken();
  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.post(
      `${API_URL}/auth/edit-profile`,
      updatedUserData, // Send the updated user data here
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in headers
        },
      }
    );

    // Return success if the update is successful
    if (response.data.success) {
      return { success: true, message: "Profile updated successfully" };
    } else {
      return { success: false, message: "Failed to update profile" };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while updating the profile",
    };
  }
};

//Resident API

export const getUser = async () => {
  const token = AdminToken();

  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.get(`${API_URL}/auth/admin/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.data);

    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const deleteUser = (async) => {};

//OtherIncome Page

export const getotherIncome = async () => {
  const token = AdminToken();

  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.get(
      `${API_URL}/auth/admin/otheincome/getIncome`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    // Log the error response and status
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const addincome = async (income) => {
  try {
    var token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/otheincome/insertIncome`,
      income, // Pass income directly
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const updateIncome = async (data) => {
  try {
    const token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/otheincome/editIncome/${data._id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update income.",
      };
    }
  } catch (error) {
    console.error(
      "Error updating income:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const deleteIncome = async (id) => {
  try {
    var token = AdminToken(); // Ensure you have the correct token logic for admin authorization
    const response = await axios.delete(
      `${API_URL}/auth/admin/otheincome/deleteIncome/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log("Income deleted successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to delete income:", response.data.message);
      return { success: false, message: "Failed to delete income" };
    }
  } catch (error) {
    console.log(error);
    console.error("Error deleting income:", error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
    };
  }
};

//Maintenance Page

export const editMaintenance = async (maintenance) => {
  try {
    try {
      const response = await fetch(
        `${API_URL}/auth/admin/maintanace/editMaintenance/6734f318cc9869bd95409dd3`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ maintenance }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to edit maintence");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Network error");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const getMaintenance = async () => {
  try {
    var token = AdminToken();
    const response = await axios.get(
      `${API_URL}/auth/admin/maintanace/maintenanceDetail`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    console.log(error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const viewmaintenance = async () => {
  try {
    var token = AdminToken();
    const response = await axios.get(
      `${API_URL}/auth/admin/maintanace/getMaintance`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    console.log(error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

//Expense API

export const addExpense = async (formData) => {
  try {
    var token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/expenses/insertExpense`,
      formData, // Pass income directly
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getExpense = async () => {
  try {
    var token = AdminToken();
    const response = await axios.get(
      `${API_URL}/auth/admin/expenses/getExpenses`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    // Log the error response and status
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    console.log(error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const updateExpense = async (data, id) => {
  try {
    const token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/expenses/editExpenses/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update income.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const deleteExpense = async (expenseId) => {
  if (!expenseId) {
    console.error("Expense ID is undefined");
    return; // Prevent API call if ID is missing
  }
  try {
    var token = AdminToken();
    const response = await axios.delete(
      `${API_URL}/auth/admin/expenses/deleteExpense/${expenseId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log("Income deleted successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to delete income:", response.data.message);
      return { success: false, message: "Failed to delete income" };
    }
  } catch (error) {
    console.log(error);
    console.error("Error deleting income:", error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
    };
  }
};

//Note API
export const AddNote = async (formData) => {
  try {
    var token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/note/insertNote`,
      formData, // Pass income directly
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const GetNotes = async () => {
  try {
    var token = AdminToken();
    const response = await axios.get(`${API_URL}/auth/admin/note/viewNote`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    // Log the error response and status
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    console.log(error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const UpdateNote = async (data) => {
  try {
    const token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/note/editNote/${data._id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update income.",
      };
    }
  } catch (error) {
    console.error(
      "Error updating income:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

//Important Number

export const addimportantNumber = async (formData) => {
  try {
    var token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/important/insertImportant`,
      formData, // Pass income directly
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getImportantnumber = async () => {
  try {
    var token = AdminToken();
    const response = await axios.get(
      `${API_URL}/auth/admin/important/getImportant`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    console.log(error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const UpdateImportantnumber = async (data, id) => {
  try {
    const token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/important/editImportant/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update income.",
      };
    }
  } catch (error) {
    console.log(error);
    console.error(
      "Error updating income:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const DeleteImportantnumber = async (id) => {
  try {
    var token = AdminToken();
    const response = await axios.delete(
      `${API_URL}/auth/admin/important/deleteImportant/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//Facility API

export const addFacility = async (formData) => {
  try {
    var token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/facility/insertFacility/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getFacility = async () => {
  try {
    var token = AdminToken();
    const response = await axios.get(
      `${API_URL}/auth/admin/facility/viewFacility/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    // Log the error response and status
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    console.log(error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const UpdateFacilty = async (data, id) => {
  try {
    const token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/facility/editFacility/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update income.",
      };
    }
  } catch (error) {
    console.log(error);
    console.error(
      "Error updating income:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

//Complaint
export const AddComplaint = async (data) => {
  try {
    var token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/complaint/insertComplaint`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to add complaint.",
      };
    }
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const GetComplaint = async (type) => {
  try {
    const token = AdminToken();
    const response = await axios.get(
      `${API_URL}/auth/admin/complaint/viewComplaint/?type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      if (response.data.data.length === 0) {
        return { success: true, data: [], message: "No complaints found." };
      }
      return { success: true, data: response.data.data };
    }

    return {
      success: false,
      message: response.data.message || "Unknown error",
    };
  } catch (error) {
    console.error("Error:", error.message);
    const message =
      error.response?.data?.message || `An error occurred: ${error.message}`;
    return { success: false, message };
  }
};

export const UpdateComplaint = async (data) => {
  try {
    const token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/complaint/editComplaint/${data._id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update complaint.",
      };
    }
  } catch (error) {
    console.log(error);
    console.error(
      "Error updating complaint:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const DeleteComplaint = async (DeleteId) => {
  if (!DeleteId) {
    console.error("Important ID (_id) is undefined");
    return;
  }
  try {
    var token = AdminToken();
    const response = await axios.delete(
      `${API_URL}/auth/admin/complaint/deleteComplaint/${DeleteId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log("Complaint deleted successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to delete Complaint:", response.data.message);
      return { success: false, message: "Failed to delete complaint" };
    }
  } catch (error) {
    console.log(error);
    console.error("Error deleting complaint:", error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
    };
  }
};

//Request
export const AddRequest = async (data) => {
  try {
    var token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/complaint/insertComplaint`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to add Request.",
      };
    }
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const GetRequest = async (type) => {
  try {
    const token = AdminToken();
    const response = await axios.get(
      `${API_URL}/auth/admin/complaint/viewComplaint/?type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      if (response.data.data.length === 0) {
        return { success: true, data: [], message: "No Request found." };
      }
      return { success: true, data: response.data.data };
    }

    return {
      success: false,
      message: response.data.message || "Unknown error",
    };
  } catch (error) {
    console.error("Error:", error.message);
    const message =
      error.response?.data?.message || `An error occurred: ${error.message}`;
    return { success: false, message };
  }
};

export const UpdateRequest = async (data) => {
  try {
    const token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/complaint/editComplaint/${data._id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update Request.",
      };
    }
  } catch (error) {
    console.log(error);
    console.error(
      "Error updating Request:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const DeleteRequest = async (DeleteId) => {
  if (!DeleteId) {
    console.error("Important ID (_id) is undefined");
    return;
  }
  try {
    var token = AdminToken();
    const response = await axios.delete(
      `${API_URL}/auth/admin/complaint/deleteComplaint/${DeleteId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log("Complaint deleted successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to delete Request:", response.data.message);
      return { success: false, message: "Failed to delete Request" };
    }
  } catch (error) {
    console.log(error);
    console.error("Error deleting Request:", error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
    };
  }
};

//Protocols API
export const AddProtocol = async (data) => {
  try {
    var token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/security/createProtocol`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to add Request.",
      };
    }
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const GetProtocol = async () => {
  try {
    var token = AdminToken();
    const response = await axios.get(
      `${API_URL}/auth/admin/security/getProtocol`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    // Log the error response and status
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    console.log(error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const GetProtocolUser = async () => {
  try {
    var token = UserToken();
    const response = await axios.get(
      `${API_URL}/auth/user/getProtocol`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    console.log(error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const EditProtocol = async (data, id) => {
  try {
    const token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/security/editProtocol/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update income.",
      };
    }
  } catch (error) {
    console.log(error);
    console.error(
      "Error updating income:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const DeleteProtocol = async (id) => {
  try {
    var token = AdminToken();
    const response = await axios.delete(
      `${API_URL}/auth/admin/security/deleteProtocol/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//Visitor API
export const GetVisitor = async () => {
  try {
    var token = AdminToken();
    const response = await axios.get(
      `${API_URL}/auth/admin/security/getEntry`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    // Log the error response and status
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    console.log(error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

//Guard API
export const GetGuard = async () => {
  try {
    var token = AdminToken();
    const response = await axios.get(`${API_URL}/auth/admin/getSecurity`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200 && response.data.status === 1) {
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    // Log the error response and status
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    console.log(error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const addsecurity = async (security) => {
  try {
    var token = AdminToken();

    const response = await axios.post(
      `${API_URL}/auth/admin/addNewSecurity`,
      security,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to add Request.",
      };
    }
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const DeleteSecurityGuard = async (DeleteId) => {
  if (!DeleteId) {
    console.error("Important ID (_id) is undefined");
    return;
  }
  try {
    var token = AdminToken();
    const response = await axios.delete(
      `${API_URL}/auth/admin/deleteSecurity/${DeleteId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log("Complaint deleted successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to delete Request:", response.data.message);
      return { success: false, message: "Failed to delete Request" };
    }
  } catch (error) {
    console.log(error);
    console.error("Error deleting Request:", error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
    };
  }
};

export const EditSecurityGuard = async (data, id) => {
  try {
    const token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/security/editProtocol/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update income.",
      };
    }
  } catch (error) {
    console.log(error);
    console.error(
      "Error updating income:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

//Announcement Admin Side API
export const GetAnnouncement = async (type) => {
  try {
    const token = AdminToken();
    const response = await axios.get(
      `${API_URL}/auth/admin/announce/viewAnnouncement/?type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      if (response.data.data.length === 0) {
        return { success: true, data: [], message: "No complaints found." };
      }
      return { success: true, data: response.data.data };
    }

    return {
      success: false,
      message: response.data.message || "Unknown error",
    };
  } catch (error) {
    console.error("Error:", error.message);
    const message =
      error.response?.data?.message || `An error occurred: ${error.message}`;
    return { success: false, message };
  }
};

export const AddAnnouncement = async (data) => {
  try {
    var token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/announce/createAnnouncement`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to add complaint.",
      };
    }
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const EditAnnouncement = async (data, id) => {
  try {
    const token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/admin/announce/editAnnouncement/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update complaint.",
      };
    }
  } catch (error) {
    console.log(error);
    console.error(
      "Error updating complaint:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const DeleteAnnouncement = async (DeleteId) => {
  if (!DeleteId) {
    console.error("Important ID (_id) is undefined");
    return;
  }
  try {
    var token = AdminToken();
    const response = await axios.delete(
      `${API_URL}/auth/admin/announce/deleteAnnouncement/${DeleteId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log("Complaint deleted successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to delete Request:", response.data.message);
      return { success: false, message: "Failed to delete Request" };
    }
  } catch (error) {
    console.log(error);
    console.error("Error deleting Request:", error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
    };
  }
};

//UserSide API

//Dashboard API
export const GetUserDashBoardBalance = async () => {
  const token = UserToken();
  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.get(`${API_URL}/auth/user/SocietyBalance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data.status === 1) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const GetUserDashboardMaintainence = async () => {
  const token = UserToken();

  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.get(
      `${API_URL}/auth/user/pendingMaintenanceList`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
};

export const GetUserImportantNumber=async()=>{
  const token = UserToken();

  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.get(
      `${API_URL}/auth/user/getImportantNumber`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log(response.data.data);
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
}

export const GetUserComplaint=async(type)=>{
  const token = UserToken();

  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.get(
      `${API_URL}/auth/user/getcomplaint?type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log("USER",response.data.data);
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
}

export const AddUserComplaint=async(formData)=>{
  try {
    var token = UserToken();
    const response = await axios.post(
      `${API_URL}/auth/user/addComplaint`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to add Request.",
      };
    }
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
}

export const DeleteUserComplaint=async(DeleteId)=>{
  if (!DeleteId) {
    console.error("Important ID (_id) is undefined");
    return;
  }
  try {
    var token = UserToken();
    const response = await axios.delete(
      `${API_URL}/auth/user/deleteComplaint/${DeleteId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log("Complaint deleted successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to delete Complaint:", response.data.message);
      return { success: false, message: "Failed to delete complaint" };
    }
  } catch (error) {
    console.log(error);
    console.error("Error deleting complaint:", error);
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
    };
  }
}

export const GetAnnouncementUser=async(type)=>{
  const token = UserToken();

  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.get(
      `${API_URL}/auth/user/getAnnouncement?type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log("Activity",response.data.data);
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
}

//Socket IO Get User
export const GetSocketUser = async () => {
  try {
    const token = UserToken(); // Fetching the token
    if (!token) {
      throw new Error("Token is missing");
    }

    const decodedToken = jwtDecode(token);
    const currentUserId = decodedToken.userData._id; // Ensure this field is available
    if (!currentUserId) {
      throw new Error("Current user (_id) is missing in the decoded token");
    }

    console.log("Decoded Token:", decodedToken); // Debugging the token decoding
    const response = await axios.get(`${API_URL}/auth/user/userdetail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data.status === 1) {
      return {
        success: true,
        data: response.data.data || [],
        message: response.data.message || "Data fetched successfully.",
      };
    }

    return {
      success: false,
      message: response.data.message || "Unknown error occurred.",
    };
  } catch (error) {
    console.error("Error:", error.message);
    const message =
      error.response?.data?.message || `An error occurred: ${error.message}`;
    return { success: false, message };
  }
};

export const GetSocketMessages = async (from, to) => {
  try {
    const token = UserToken();
    const decode = jwtDecode(token);
    console.log("Fetching messages with params:", { from, to });

    const response = await axios.get(`${API_URL}/society/chat/messages`, {
      params: { from, to },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const SendMessage = async (formData) => {
  try {
    const token = UserToken();
    const decode = jwtDecode(token);
    const from = decode.userData._id; // Get the user ID from the decoded JWT

    console.log(formData.from, formData.to, formData.message, formData.type); // Corrected log

    const response = await axios.post(
      `${API_URL}/society/chat/message/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Handle the error in the component or call
  }
};

export const UserCall = async (data) => {
  try {
    const token = UserToken();
    const decode = jwtDecode(token);
    console.log(data);

    const response = await axios.post(`${API_URL}/society/call/start`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error starting call:", error);
    throw error;
  }
};
export const EndCall = async (roomId) => {
  try {
    const token = UserToken();
    const decode = jwtDecode(token);

    const response = await axios.post(
      `${API_URL}/society/call/end`,
      roomId, // Only pass roomId to end the call
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error ending call:", error);
    throw error;
  }
};


//Security API

export const GetSecurityVisitor=async()=>{
  const token = SecurityToken();

  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.get(
      `${API_URL}/auth/securitygaurd/getVisitor`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.status === 1) {
      console.log("Security",response.data.data);
      return response.data.data;
    } else {
      return { success: false, message: "Failed to fetch user data", data: [] };
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
      data: [],
    };
  }
}

export const AddSecurityVisitor=async(formData)=>{
 
  try {
    const token=SecurityToken()
    const response = await axios.post(
      `${API_URL}/auth/securitygaurd/visitorentry`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to add Request.",
      };
    }
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
}

export const AddSecurityEmergency=async(formData)=>{
  try {
    const token=SecurityToken()
    const response = await axios.post(
      `${API_URL}/auth/securitygaurd/insertemergency`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data.status === 1) {
      return { success: true, data: response.data.data };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to add Request.",
      };
    }
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
}