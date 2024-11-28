import axios from "axios";
import { jwtDecode } from "jwt-decode";

var API_URL = import.meta.env.VITE_API_URL;

export const AdminToken = () => {
  const admintoken = localStorage.getItem("admintoken");
  if (!admintoken) {
    return "Token is Missing";
  }
  return admintoken;
};

export const LoginData = () => {
  const admintoken = localStorage.getItem("admintoken");
  if (admintoken) {
    const decodedToken = jwtDecode(admintoken);
    return decodedToken.userData;
  }
};

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
    localStorage.setItem("admintoken", response.data.data);
    LoginData(); // This can be removed or used for logging, it is not needed for the flow
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

export const userRegistration = async (formdata) => {
  const token = AdminToken();
  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.post(
      `${API_URL}/auth/admin/insertUser`,
      { formdata },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

//      message: error.response?.data?.messmaintenanceled to
//   try {
//     const response = await fetch(`${API_URL}/auth/user/maintenance/insert`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ maintenance }),
//     });

//     if (!token.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Failed to submit maintenance");
//     }

//     // Return the parsed JSON response
//     return await response.json();
//   } catch (error) {
//     // Ensure consistent error response
//     return {
//       success: false,
//       message: error.message || "An unexpected error occurred. Please try again.",
//     };
//   }ns// e/     return {
//       success: false,
//       message: error.message || "An unexpected error occurred. Please try again.",
//     };
//   }
// };

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

    console.log("Response:", response);

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

export const deleteIncome = async ({ _id }) => {
  try {
    var token = AdminToken(); // Ensure you have the correct token logic for admin authorization
    const response = await axios.delete(
      `${API_URL}/auth/admin/otheincome/deleteIncome/${_id}`,
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
    console.log(error)
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

export const addExpense = async (data) => {
  try {
    var token = AdminToken();
    const response = await axios.post(
      `${API_URL}/auth/user/expenses/insertExpense`,
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


