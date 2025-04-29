import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaCalendarAlt, FaMoneyBillWave, FaFileAlt } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const EmployeeDashboard = () => {
  const { user } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        
        // In a real application, you would fetch actual employee data from the API
        // For demo purposes, we'll set dummy data
        // const res = await axios.get('/api/employee/me');
        // setEmployeeData(res.data);
        
        // Dummy data
        setEmployeeData({
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          position: 'Software Developer',
          department: {
            name: 'IT Department'
          },
          joinDate: '2023-01-15',
          status: 'active',
          leaves: {
            approved: 5,
            pending: 2,
            rejected: 1,
            available: 15
          },
          salary: {
            current: {
              month: 'April',
              year: '2025',
              amount: 5000,
              status: 'pending'
            },
            last: {
              month: 'March',
              year: '2025',
              amount: 5000,
              status: 'paid'
            }
          }
        });
        
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Employee Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Employee Profile */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-1">
          <div className="text-center mb-6">
            <div className="inline-block rounded-full bg-primary text-white p-6 mb-4">
              <FaUser className="text-3xl" />
            </div>
            <h2 className="text-xl font-semibold">{employeeData?.firstName} {employeeData?.lastName}</h2>
            <p className="text-gray-600">{employeeData?.position}</p>
            <p className="text-sm text-gray-500">{employeeData?.department?.name}</p>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Employee ID:</span>
              <span className="font-medium">EMP{employeeData?.id.padStart(4, '0')}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Join Date:</span>
              <span className="font-medium">{new Date(employeeData?.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium capitalize">{employeeData?.status}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Link to="/employee/profile" className="bg-primary text-white py-2 px-4 rounded block text-center hover:bg-blue-800">
              View Full Profile
            </Link>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            {/* Leave Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Leave Status</h2>
                <Link to="/employee/leaves" className="text-primary hover:underline">View All</Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{employeeData?.leaves.approved}</p>
                  <p className="text-gray-600 text-sm">Approved</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-yellow-600">{employeeData?.leaves.pending}</p>
                  <p className="text-gray-600 text-sm">Pending</p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-600">{employeeData?.leaves.rejected}</p>
                  <p className="text-gray-600 text-sm">Rejected</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{employeeData?.leaves.available}</p>
                  <p className="text-gray-600 text-sm">Available</p>
                </div>
              </div>
              
              <Link
                to="/employee/leaves/apply"
                className="bg-primary text-white py-2 px-4 rounded flex items-center justify-center hover:bg-blue-800"
              >
                <FaCalendarAlt className="mr-2" /> Apply for Leave
              </Link>
            </div>
            
            {/* Salary Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Salary Information</h2>
                <Link to="/employee/salary" className="text-primary hover:underline">View All</Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Current Month</h3>
                  <p className="text-gray-600 mb-1">Month: {employeeData?.salary.current.month} {employeeData?.salary.current.year}</p>
                  <p className="text-xl font-bold text-gray-800 mb-1">${employeeData?.salary.current.amount.toLocaleString()}</p>
                  <p className="text-sm">
                    Status:
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                      employeeData?.salary.current.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employeeData?.salary.current.status.toUpperCase()}
                    </span>
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Last Month</h3>
                  <p className="text-gray-600 mb-1">Month: {employeeData?.salary.last.month} {employeeData?.salary.last.year}</p>
                  <p className="text-xl font-bold text-gray-800 mb-1">${employeeData?.salary.last.amount.toLocaleString()}</p>
                  <p className="text-sm">
                    Status:
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                      employeeData?.salary.last.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employeeData?.salary.last.status.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/employee/profile"
                  className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center"
                >
                  <FaUser className="text-primary mx-auto text-xl mb-2" />
                  <p className="text-gray-800">My Profile</p>
                </Link>
                
                <Link
                  to="/employee/leaves"
                  className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center"
                >
                  <FaCalendarAlt className="text-yellow-600 mx-auto text-xl mb-2" />
                  <p className="text-gray-800">My Leaves</p>
                </Link>
                
                <Link
                  to="/employee/salary"
                  className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center"
                >
                  <FaMoneyBillWave className="text-green-600 mx-auto text-xl mb-2" />
                  <p className="text-gray-800">Salary</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard; 