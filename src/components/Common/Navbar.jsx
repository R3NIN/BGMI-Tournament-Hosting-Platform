import { useEffect } from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"
import { FaUserShield } from "react-icons/fa"
import logo from "../../assets/Logo/1.png"
import { NavbarLinks } from "../../data/navbar-links"
import { logout } from "../../services/operations/authAPI"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

// const subLinks = [
//   {
//     title: "Python",
//     link: "/catalog/python",
//   },
//   {
//     title: "javascript",
//     link: "/catalog/javascript",
//   },
//   {
//     title: "web-development",
//     link: "/catalog/web-development",
//   },
//   {
//     title: "Android Development",
//     link: "/catalog/Android Development",
//   },
// ];

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      dispatch(logout(navigate));
    };
    window.addEventListener('logout', handleLogout);
    return () => {
      window.removeEventListener('logout', handleLogout);
    };
  }, [dispatch, navigate]);
  const { token, isAdmin } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()


  //   ;(async () => {
  //     setLoading(true)
  //     try {
  //       const res = await apiConnector("GET", categories.CATEGORIES_API)
  //       setSubLinks(res.data.data)
  //     } catch (error) {
  //       console.log("Could not fetch Categories.", error)
  //     }
  //     setLoading(false)
  //   })()
  // }, [])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (

    <div>

    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      {/* <div className="">     dono divs ka combined  flex flex-col lg:flex lg:flex-row */}
      <div className="flex w-11/12 lg:w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
      {/*    logo+links except login and signup     */}
      {/* <div className=""> */}
        <Link to="/" className="hidden lg:block">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />  {/*  */}
        </Link>
        {/* Navigation links */}
        <nav className="mr-4">    {/* hidden md:block */}
          <ul className="flex lg:gap-x-6 gap-x-2 text-sm lg:text-lg text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path} className={matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
          <div className="items-center lg:gap-x-4 gap-x-2 lg:flex">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100 hidden lg:block" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <Link to="/login" className="px-[4px] py-[4px]">
                <button 
                  className={`rounded-[8px] border border-richblack-700 bg-richblack-800 p-[2px] lg:px-[12px] lg:py-[8px] ${
                    location.pathname === '/login' 
                      ? 'text-yellow-50 ring-2 ring-yellow-50 ring-offset-2 ring-offset-richblack-800' 
                      : 'text-richblack-100'
                  } text-sm lg:text-lg`}
                >
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup" className="px-[4px] py-[4px]">
                <button 
                  className={`rounded-[8px] border border-richblack-700 bg-richblack-800 p-[2px] lg:px-[12px] lg:py-[8px] ${
                    location.pathname === '/signup' 
                      ? 'text-yellow-50 ring-2 ring-yellow-50 ring-offset-2 ring-offset-richblack-800' 
                      : 'text-richblack-100'
                  } text-sm lg:text-lg`}
                >
                  Sign up
                </button>
              </Link>
            )}
            {token !== null && (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-1 text-yellow-50 hover:text-yellow-200 text-sm lg:text-base"
                  >
                    <FaUserShield className="text-lg" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    const event = new Event('logout');
                    window.dispatchEvent(event);
                  }}
                  className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-3 py-2 text-sm lg:text-base text-richblack-100 hover:bg-richblack-700 transition-all duration-200"
                >
                  Logout
                </button>
                <ProfileDropdown />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
