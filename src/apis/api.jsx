
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
var API_URL = import.meta.env.VITE_API_URL;
var admintoken;


export const AdminToken = () => {
    return admintoken
}

export const LoginData = () => {
    if (admintoken !== "") {
        const decodedToken = jwtDecode(admintoken);
        console.log("DecodeToken:",decodedToken.userData)
        return decodedToken.userData;
    }
}

export const Registration = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(`${API_URL}/auth/register`, data);
        if (response.status === 200 && response.data.status === 1) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export const Society = async () => {
    const response = await axios.get(`${API_URL}/society/getSociety`);
    if (response.status === 200 && response.data.status === 1) {
        return response.data.data;
    }
    return [];
}



export const CreateSociety = async (societyData) => {
    try {
        const response = await axios.post(`${API_URL}/society/insertSociety`, societyData);
        return response
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};


export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        admintoken = response.data.data;
        LoginData()
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const resendOtp = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  };
  


export const forgotPassword = async (passdata) => {
    try {
        console.log(passdata)
        const response = await axios.post(`${API_URL}/auth/forgot-password`, passdata);
        admintoken = response.data.data;
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};


export const otpPage = async (otp) => {
    try {
        console.log(otp)
        const response = await axios.post(`${API_URL}/auth/verify-otp`, otp);
        admintoken = response.data.data;
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const resetPassword = async (rpass) => {
    try {
        console.log(rpass)
        const response = await axios.post(`${API_URL}/auth/reset-password`, rpass);
        admintoken = response.data.data;
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const userRegistration = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/user/insertUser`);
        if (response.status === 200 && response.data?.status === 1) {
            return {
                success: true,
                data: response.data.data,
            };
        } else {
            return {
                success: false,
                message: response.data?.message || 'Unexpected error occurred.',
            };
        }
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || 'An error occurred. Please try again.';
        return {
            success: false,
            message: errorMessage,
        };
    }
};


export const submitMaintenance = async (maintenance) => {
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
  };