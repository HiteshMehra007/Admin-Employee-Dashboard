import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/v1/emp/list');
          if (!response.ok) {
            throw new Error('Failed to fetch employees');
          }
          const data = await response.json();
          setEmployees(data.employees);

        } catch (err) {
            console.error("Error while fetching Employee List\n", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/emp/delete/${id}`, {
                method: "DELETE",
            });

            if(!response.ok){
                throw new Error("Error Deleting Employee");
            }
            
            setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id));
            // fetchEmployees();
        } catch (error) {
            console.error("Error while deleting Employee\n", error);
        }
    };

    const handleEdit = (id) => {
        console.log('Edit employee with id:', id);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmployees = employees.filter((employee) => {
        return employee.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="container mx-auto max-w-[80%] p-4">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <label htmlFor="search">Search: </label>
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="border p-2 rounded-md"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="text-lg font-semibold">
                    Total Employees: {filteredEmployees.length}
                </div>
                <div>
                    <Link to="/createemployee" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                        Create Employee
                    </Link>
                </div>
            </div>

            {/* Employee Table */}
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Mobile</th>
                        <th className="p-3 border">Designation</th>
                        <th className="p-3 border">Gender</th>
                        <th className="p-3 border">Courses</th>
                        <th className="p-3 border">Image</th>
                        <th className="p-3 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
                            <tr key={employee._id}>
                                <td className="p-3 border">{employee.fullName}</td>
                                <td className="p-3 border">{employee.email}</td>
                                <td className="p-3 border">{employee.mobile}</td>
                                <td className="p-3 border">{employee.designation}</td>
                                <td className="p-3 border">{employee.gender}</td>
                                <td className="p-3 border">
                                    {employee.courses.join(', ')}
                                </td>
                                <td className="p-3 border">
                                    <img
                                        src={employee.image}
                                        alt={employee.fullName}
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td className="p-3 border">
                                    <Link
                                        to={`/editemployee/${employee._id}`}
                                        onClick={() => handleEdit(employee._id)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(employee._id)}
                                        className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="p-3 text-center text-gray-500">
                                No employees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
