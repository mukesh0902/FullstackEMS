import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('/api/employees');
        setEmployees(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching employees');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`/api/employees/${id}`);
        setEmployees(employees.filter(employee => employee._id !== id));
      } catch (err) {
        setError('Error deleting employee');
      }
    }
  };

  // Format date to local date format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
        <Link
          to="/admin/employees/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Employee
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-4 text-center">Loading employees...</div>
        ) : employees.length === 0 ? (
          <div className="p-4 text-center">No employees found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.map(employee => (
                  <tr key={employee._id}>
                    <td className="py-3 px-4 text-sm">{employee.employeeId}</td>
                    <td className="py-3 px-4 text-sm">
                      {employee.firstName} {employee.lastName}
                    </td>
                    <td className="py-3 px-4 text-sm">{employee.position}</td>
                    <td className="py-3 px-4 text-sm">
                      {employee.department ? employee.department.name : 'Not Assigned'}
                    </td>
                    <td className="py-3 px-4 text-sm">{formatDate(employee.joinDate)}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${employee.status === 'active' ? 'bg-green-100 text-green-800' : 
                          employee.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {employee.status ? employee.status.charAt(0).toUpperCase() + employee.status.slice(1) : 'Active'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/employees/edit/${employee._id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteEmployee(employee._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees; 