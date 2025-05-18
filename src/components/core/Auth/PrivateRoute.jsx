import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const PrivateRoute = () => {
  const { token } = useSelector((state) => state.auth)
  const location = useLocation()

  // Allow access to admin routes without authentication
  if (location.pathname.startsWith('/admin')) {
    return <Outlet />
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
