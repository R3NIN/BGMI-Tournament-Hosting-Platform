// require("dotenv").config();

const BASE_URL = process.env.REACT_APP_API_URL


// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getRegisteredTournaments",

  // instructor dashboard has not been written : left to write : 

  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/teamDashboard",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  PAYBACK_REQUEST_EMAIL_API: BASE_URL + "/payment/paybackRequestEmail",
  UPDATE_WALLET: BASE_URL + "/payment/updateWalletAfterTournament",
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  CREATE_RATING_API: BASE_URL + "/course/create-rating",
}

// RATINGS AND REVIEWS
// export const ratingsEndpoints = {
//   REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
// }

// CATAGORIES API
// export const categories = {
//   CATEGORIES_API: BASE_URL + "/course/showAllCategories",
// }

// CATALOG PAGE DATA
// export const catalogData = {
//   CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
// }

// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

//  REGISTER-FOR TOURNAMENT API : 

// Tournament registration endpoints removed

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}
