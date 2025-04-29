import React from 'react';
import { useParams } from 'react-router-dom';

const EditSalary = () => {
  const { id } = useParams();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Salary</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>Edit form for salary ID: {id} will be displayed here.</p>
      </div>
    </div>
  );
};

export default EditSalary; 