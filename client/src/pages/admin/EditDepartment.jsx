import React from 'react';
import { useParams } from 'react-router-dom';

const EditDepartment = () => {
  const { id } = useParams();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Department</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>Edit form for department ID: {id} will be displayed here.</p>
      </div>
    </div>
  );
};

export default EditDepartment; 