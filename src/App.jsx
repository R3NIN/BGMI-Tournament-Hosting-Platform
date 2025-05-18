import { useEffect } from "react"
import "./App.css"
// Redux
import { useDispatch, useSelector } from "react-redux"
// React Router

import { Route, Routes, useNavigate } from "react-router-dom"

// Components
import Navbar from "./components/Common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import AdminRoute from "./components/core/Auth/AdminRoute"
import AddCourse from "./components/core/Dashboard/AddCourse"
import Wallet from "./components/Common/Wallet"
import EditCourse from "./components/core/Dashboard/EditCourse"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import Instructor from "./components/core/Dashboard/Instructor"
import MyCourses from "./components/core/Dashboard/MyCourses"
import MyProfile from "./components/core/Dashboard/MyProfile"
import Settings from "./components/core/Dashboard/Settings"
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import AdminDashboard from "./pages/AdminDashboard";
import ProcessNewPayment from "./pages/ProcessNewPayment";
import ProcessPayment from "./pages/ProcessPayment";
import PaymentHistory from "./pages/PaymentHistory";
import UserManagement from "./components/core/Dashboard/UserManagement"
import PaymentProcessing from "./components/core/Dashboard/PaymentProcessing"
import About from "./pages/About"
import Catalog from "./pages/Catalog"
import Contact from "./pages/Contact"
import Tournaments from "./pages/Tournaments"
import CourseDetails from "./pages/CourseDetails"
import Dashboard from "./pages/Dashboard"
import Error from "./pages/Error"
import Unauthorized from "./pages/Unauthorized"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import ViewCourse from "./pages/ViewCourse"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import CookiePolicy from "./pages/CookiePolicy"
import Terms from "./pages/Terms"
import RecentActivity from "./pages/RecentActivity"
import { getUserDetails } from "./services/operations/profileAPI"
import { ACCOUNT_TYPE } from "./utils/constants"


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token")
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/process-payment" element={<ProcessPayment />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/admin/payments/new" element={<ProcessNewPayment />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminRoute />
          </PrivateRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="payments" element={<PaymentProcessing />} />
          <Route path="recent-activity" element={<RecentActivity />} />
        </Route>
        
        {/* Unauthorized route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

         <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/catalog" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/terms" element={<Terms />} />
        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/recent-activity" element={<RecentActivity />} />
          <Route path="dashboard/Settings" element={<Settings />} />
          {/* Route only for Instructors */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
          {/* Route only for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/wallet" element={<Wallet />} />
            </>
          )}
          <Route path="dashboard/settings" element={<Settings />} />
        </Route>

        {/* For the watching course lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
