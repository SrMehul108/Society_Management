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
    console.log("DecodeToken:", decodedToken.userData);
    return decodedToken.userData;
  }
};

export const Registration = async (data) => {
  try {
    console.log(data);
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
    console.log(passdata);
    const response = await axios.post(
      `${API_URL}/auth/forgot-password`,
      passdata
    );
    admintoken = response.data.data;
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const otpPage = async (otp) => {
  try {
    console.log(otp);
    const response = await axios.post(`${API_URL}/auth/verify-otp`, otp);
    admintoken = response.data.data;
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const resetPassword = async (rpass) => {
  try {
    console.log(rpass);
    const response = await axios.post(`${API_URL}/auth/reset-password`, rpass);
    admintoken = response.data.data;
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const userRegistration = async (formdata) => {
  const token = AdminToken();
  console.log("Token", token);
  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.post(
      `${API_URL}/auth/user/insertUser`,
      { formdata },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
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

export const submitMaintenance = async (maintenance) => {
  try {
    try {
      const response = await fetch(`${API_URL}/auth/user/maintanace/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ maintenance }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit maintence");
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

export const getUser = async () => {
  const token = AdminToken();
  console.log("Token:", token);

  if (!token) {
    return { success: false, message: "Authorization token is missing" };
  }

  try {
    const response = await axios.get(`${API_URL}/auth/user/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
      },
    });

    console.log("Response:", response);

    // Check for successful response
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


export const editMaintenance = async (maintenance) => {
  try {
    try {
      const response = await fetch(`${API_URL}/auth/user/maintanace/editMaintenance/6734f318cc9869bd95409dd3`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ maintenance }),
      });

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