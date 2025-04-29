import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/layout/PrivateRoute';
import AdminRoute from './components/layout/AdminRoute';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Auth pages
import Login from './pages/Login';

// Dashboard pages
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Admin pages
import Employees from './pages/admin/Employees';
import AddEmployee from './pages/admin/AddEmployee';
import EditEmployee from './pages/admin/EditEmployee';
import Departments from './pages/admin/Departments';
import AddDepartment from './pages/admin/AddDepartment';
import EditDepartment from './pages/admin/EditDepartment';
import AdminLeaves from './pages/admin/Leaves';
import Salaries from './pages/admin/Salaries';
import AddSalary from './pages/admin/AddSalary';
import EditSalary from './pages/admin/EditSalary';
import Settings from './pages/admin/Settings';

// Employee pages
import Profile from './pages/employee/Profile';
import MyLeaves from './pages/employee/MyLeaves';
import ApplyLeave from './pages/employee/ApplyLeave';
import MySalary from './pages/employee/MySalary';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="container mx-auto px-4 flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                {/* Employee Routes */}
                <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                <Route path="/employee/profile" element={<Profile />} />
                <Route path="/employee/leaves" element={<MyLeaves />} />
                <Route path="/employee/leaves/apply" element={<ApplyLeave />} />
                <Route path="/employee/salary" element={<MySalary />} />
                
                {/* Admin Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/employees" element={<Employees />} />
                  <Route path="/admin/employees/add" element={<AddEmployee />} />
                  <Route path="/admin/employees/edit/:id" element={<EditEmployee />} />
                  <Route path="/admin/departments" element={<Departments />} />
                  <Route path="/admin/departments/add" element={<AddDepartment />} />
                  <Route path="/admin/departments/edit/:id" element={<EditDepartment />} />
                  <Route path="/admin/leaves" element={<AdminLeaves />} />
                  <Route path="/admin/salaries" element={<Salaries />} />
                  <Route path="/admin/salaries/add" element={<AddSalary />} />
                  <Route path="/admin/salaries/edit/:id" element={<EditSalary />} />
                  <Route path="/admin/settings" element={<Settings />} />
                </Route>
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 