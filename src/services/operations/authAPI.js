import { toast } from "react-hot-toast"

import { setLoading, setToken, setEmail } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {

  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

// sendOtp fully removed: OTP system deprecated.

export function signUp(signupData, navigate, toast) {
  return async (dispatch) => {
    const { accountType, userName, bgmi_id, email, password, confirmPassword, contactNumber } = signupData;
    const toastId = toast.loading("Creating your account...");
    dispatch(setLoading(true));
    
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        userName,
        bgmi_id,
        email,
        password,
        confirmPassword,
        contactNumber: contactNumber || ""
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message || "Signup failed. Please try again.");
      }

      // If we have a token in the response, store it
      if (response.data.data?.token) {
        localStorage.setItem("token", response.data.data.token);
        dispatch(setToken(response.data.data.token));
      }
      
      // If we have user data in the response, store it
      if (response.data.data?.user) {
        dispatch(setUser(response.data.data.user));
        dispatch(setEmail(response.data.data.user.email));
      }

      toast.success("Account created successfully!");
      
      // Redirect based on user type or to login page
      const redirectPath = response.data.data?.user?.accountType === "Admin" 
        ? "/admin" 
        : "/";
      
      navigate(redirectPath);
    } catch (error) {
      console.error("SIGNUP API ERROR............", error);
      
      // Handle specific error messages
      let errorMessage = error.message || "Signup failed. Please try again.";
      
      // Check for network errors first
      if (error.code === 'ERR_NETWORK') {
        errorMessage = "Network error. Please check your internet connection and try again.";
      }
      // Handle validation errors
      else if (error.response?.data?.errors) {
        errorMessage = Object.values(error.response.data.errors).join("\n");
      } 
      // Handle duplicate key errors
      else if (error.response?.data?.code === 11000) {
        errorMessage = "This email or BGMI ID is already registered. Please use different credentials.";
      }
      
      toast.error(errorMessage);
      
      // Only navigate back to signup if it's not a validation error
      if (!error.response?.data?.errors) {
        navigate("/signup");
      }
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));
    
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed. Please check your credentials.");
      }

      // Handle the response structure from the backend
      const responseData = response.data;
      // Handle both response formats
      const token = responseData.token || responseData.data?.token || responseData.data?.data?.token;
      const user = responseData.user || responseData.data?.user || responseData.data?.data?.user;
      
      if (!token || !user) {
        throw new Error('Invalid response from server');
      }
      
      // Ensure user object has required fields
      if (!user.email || !user.accountType) {
        throw new Error('User data is incomplete');
      }
      
      // Save token to Redux store
      dispatch(setToken(token));
      dispatch(setUser(user));
      dispatch(setEmail(user.email));
      
      // Save token to localStorage
      localStorage.setItem("token", token); // Store token directly, not stringified
      
      // Save user data to localStorage (without sensitive info)
      const userData = { 
        _id: user._id,
        email: user.email,
        accountType: user.accountType,
        approved: user.approved,
        userName: user.userName,
        bgmi_id: user.bgmi_id,
        // Add other non-sensitive fields as needed
      };
      localStorage.setItem("user", JSON.stringify(userData));
      
      toast.success("Login successful!");
      
      // Redirect based on user role and approval status
      let redirectPath = "/";
      
      if (user.accountType === "Admin") {
        redirectPath = "/admin";
      } else if (user.accountType === "Team" && !user.approved) {
        // If team account is not approved, redirect to pending approval page
        redirectPath = "/pending-approval";
      }
      
      // Small delay before navigation to allow toast to be seen
      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);
      
      return;
    } catch (error) {
      console.error("LOGIN API ERROR............", error);
      
      let errorMessage = "An unexpected error occurred. Please try again later.";
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = "Cannot connect to the server. Please check your internet connection or try again later.";
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (error.response.status === 403) {
          errorMessage = "Your account is pending approval. Please contact support.";
        } else {
          errorMessage = `Error: ${error.response.status} - ${error.response.statusText}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response received from the server. Please try again.";
      } else if (error.message) {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("RESETPASSTOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}
