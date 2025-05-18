import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { 
  FaUsers, 
  FaMoneyBillWave, 
  FaTrophy, 
  FaChartLine,
  FaUserCog,
  FaCog,
  FaClipboardCheck,
  FaGamepad,
  FaUserShield,
  FaArrowRight,
  FaSignOutAlt
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

// Component Imports
import Footer from "../components/Common/Footer";
import { logout } from "../slices/authSlice";

// background random images
import backgroundImg1 from '../assets/Images/random bg img/coding bg1.jpeg';
import backgroundImg2 from '../assets/Images/random bg img/coding bg2.jpeg';
import backgroundImg3 from '../assets/Images/random bg img/coding bg3.jpeg';

const randomImages = [backgroundImg1, backgroundImg2, backgroundImg3];

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [backgroundImg, setBackgroundImg] = useState(null);
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTournaments: 0,
    totalRevenue: 0,
    activePlayers: 0,
    pendingPayments: 0,
    recentActivity: []
  });
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    // Set random background image
    const bg = randomImages[Math.floor(Math.random() * randomImages.length)];
    setBackgroundImg(bg);
    
    // Fetch dashboard stats
    const fetchDashboardStats = async () => {
      setLoading(true);
      try {
        // Mock data - replace with actual API call
        const mockStats = {
          totalUsers: 1245,
          totalTournaments: 89,
          totalRevenue: 124500,
          activePlayers: 856,
          pendingPayments: 23,
          recentActivity: [
            { id: 1, action: 'New tournament created', timestamp: '2 minutes ago' },
            { id: 2, action: 'Payment processed for Team XYZ', timestamp: '15 minutes ago' },
            { id: 3, action: 'User John Doe registered', timestamp: '1 hour ago' },
          ]
        };
        
        setStats(mockStats);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardStats();
  }, []);

  // Handle unauthorized access
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    toast.error("Unauthorized access");
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-richblack-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-white">
      {/* Background Image */}
      {backgroundImg && (
        <div className="fixed inset-0 -z-10">
          <img 
            src={backgroundImg} 
            alt="Background" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
      )}
      
      {/* Admin Header */}
      <header className="bg-richblack-800 py-4 px-6 border-b border-richblack-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-50">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-richblack-200">Welcome, {user?.userName || 'Admin'}</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-richblack-700 hover:bg-richblack-600 rounded-md text-richblack-100 transition-colors flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Users Card */}
          <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-600 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-900/20 rounded-lg mr-4">
                <FaUsers className="text-blue-400 text-2xl" />
              </div>
              <div>
                <p className="text-richblack-200 text-sm">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</h3>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-richblack-700">
              <Link 
                to="/admin/users" 
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                Manage Users <FaArrowRight className="ml-1 text-xs" />
              </Link>
            </div>
          </div>
          
          {/* Tournaments Card */}
          <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-600 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-900/20 rounded-lg mr-4">
                <FaTrophy className="text-yellow-400 text-2xl" />
              </div>
              <div>
                <p className="text-richblack-200 text-sm">Total Tournaments</p>
                <h3 className="text-2xl font-bold">{stats.totalTournaments.toLocaleString()}</h3>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-richblack-700">
              <Link 
                to="/admin/tournaments" 
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                Manage Tournaments <FaArrowRight className="ml-1 text-xs" />
              </Link>
            </div>
          </div>
          
          {/* Revenue Card */}
          <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-600 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-900/20 rounded-lg mr-4">
                <FaMoneyBillWave className="text-green-400 text-2xl" />
              </div>
              <div>
                <p className="text-richblack-200 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-richblack-700">
              <Link 
                to="/admin/payments" 
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                View Payments <FaArrowRight className="ml-1 text-xs" />
              </Link>
            </div>
          </div>
          
          {/* Pending Payments Card */}
          <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-600 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-900/20 rounded-lg mr-4">
                <FaClipboardCheck className="text-purple-400 text-2xl" />
              </div>
              <div>
                <p className="text-richblack-200 text-sm">Pending Payments</p>
                <h3 className="text-2xl font-bold">{stats.pendingPayments}</h3>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-richblack-700">
              <Link 
                to="/admin/payments/new" 
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                Process Payments <FaArrowRight className="ml-1 text-xs" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-600">
            <h2 className="text-xl font-bold mb-6 text-yellow-50">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/admin/users" 
                className="p-4 bg-richblack-700 hover:bg-richblack-600 rounded-lg transition-colors flex flex-col items-center justify-center text-center"
              >
                <FaUserCog className="text-blue-400 text-2xl mb-2" />
                <span>Users</span>
              </Link>
              <Link 
                to="/admin/tournaments" 
                className="p-4 bg-richblack-700 hover:bg-richblack-600 rounded-lg transition-colors flex flex-col items-center justify-center text-center"
              >
                <FaGamepad className="text-yellow-400 text-2xl mb-2" />
                <span>Tournaments</span>
              </Link>
              <Link 
                to="/admin/payments" 
                className="p-4 bg-richblack-700 hover:bg-richblack-600 rounded-lg transition-colors flex flex-col items-center justify-center text-center"
              >
                <FaMoneyBillWave className="text-green-400 text-2xl mb-2" />
                <span>Payments</span>
              </Link>
              <Link 
                to="/admin/settings" 
                className="p-4 bg-richblack-700 hover:bg-richblack-600 rounded-lg transition-colors flex flex-col items-center justify-center text-center"
              >
                <FaCog className="text-purple-400 text-2xl mb-2" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-yellow-50">Recent Activity</h2>
              <Link to="/admin/activity" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                View All <FaArrowRight className="ml-1 text-xs" />
              </Link>
            </div>
            
            {stats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="border-b border-richblack-700 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-900/20 rounded-full mr-3">
                        <FaClipboardCheck className="text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-richblack-100">{activity.action}</p>
                        <p className="text-sm text-richblack-400">{activity.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-richblack-400 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
        
        {/* Admin Tools */}
        <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-600">
          <h2 className="text-xl font-bold mb-6 text-yellow-50">Admin Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/admin/analytics" 
              className="p-4 bg-richblack-700 hover:bg-richblack-600 rounded-lg transition-colors flex items-center"
            >
              <div className="p-3 bg-blue-900/20 rounded-lg mr-4">
                <FaChartLine className="text-blue-400 text-xl" />
              </div>
              <div>
                <h3 className="font-medium">Analytics</h3>
                <p className="text-sm text-richblack-400">View platform analytics</p>
              </div>
            </Link>
            <Link 
              to="/admin/reports" 
              className="p-4 bg-richblack-700 hover:bg-richblack-600 rounded-lg transition-colors flex items-center"
            >
              <div className="p-3 bg-green-900/20 rounded-lg mr-4">
                <FaClipboardCheck className="text-green-400 text-xl" />
              </div>
              <div>
                <h3 className="font-medium">Reports</h3>
                <p className="text-sm text-richblack-400">Generate reports</p>
              </div>
            </Link>
            <Link 
              to="/admin/security" 
              className="p-4 bg-richblack-700 hover:bg-richblack-600 rounded-lg transition-colors flex items-center"
            >
              <div className="p-3 bg-purple-900/20 rounded-lg mr-4">
                <FaUserShield className="text-purple-400 text-xl" />
              </div>
              <div>
                <h3 className="font-medium">Security</h3>
                <p className="text-sm text-richblack-400">Security settings</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default AdminDashboard;
