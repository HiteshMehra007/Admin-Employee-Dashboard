import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            mobile: '1234567890',
            designation: 'Manager',
            gender: 'Male',
            courses: ['MCA'],
            image: 'path-to-image',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            mobile: '9876543210',
            designation: 'HR',
            gender: 'Female',
            courses: ['BCA', 'BSc'],
            image: 'path-to-image',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        const updatedEmployees = employees.filter(emp => emp.id !== id);
        setEmployees(updatedEmployees);
    };

    const handleEdit = (id) => {
        console.log('Edit employee with id:', id);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <tr key={employee.id}>
                                <td className="p-3 border">{employee.name}</td>
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
                                        alt={employee.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td className="p-3 border">
                                    <Link
                                        to="/editemployee"
                                        onClick={() => handleEdit(employee.id)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(employee.id)}
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
