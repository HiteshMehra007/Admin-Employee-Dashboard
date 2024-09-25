import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EditEmployeeChild = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: '',
        courses: [],
        image: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/emp/${id}`);
                const data = await response.json();
                const result = data.employee;
                
                setFormData({
                    name: result.fullName,
                    email: result.email,
                    mobile: result.mobile,
                    designation: result.designation,
                    gender: result.gender,
                    courses: result.courses,
                    image: null,
                });
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                courses: checked
                    ? [...prev.courses, value]
                    : prev.courses.filter((course) => course !== value),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('mobile', formData.mobile);
        formDataObj.append('designation', formData.designation);
        formDataObj.append('gender', formData.gender);
        formData.courses.forEach((course) => formDataObj.append('course', course));
        formDataObj.append('courses', JSON.stringify(formData.courses));

        if (formData.image) {
            formDataObj.append('image', formData.image);
        }

        try {
            const response = await fetch(`http://localhost:8000/api/v1/emp/edit/${id}`, {
                method: 'PUT',
                body: formDataObj,
            });

            if (!response.ok) {
                throw new Error('Error editing employee');
            }

            const data = await response.json();
            console.log('Employee edited successfully', data);

            navigate('/employeelist');
        } catch (error) {
            console.error('Error editing employee', error);
        }
    };

    return (
        <div className='mx-auto max-w-[80%] flex flex-col items-center'>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mt-4">
                <h2 className="text-2xl font-bold text-center mb-6">Edit Employee</h2>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="email" className="block mt-4 text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="mobile" className="block mt-4 text-sm font-medium text-gray-700">Mobile Number:</label>
                    <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="designation" className="block mt-4 text-sm font-medium text-gray-700">Designation:</label>
                    <select
                        id="designation"
                        name="designation"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.designation}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Gender:</label>
                        <div className="flex items-center mt-1">
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    className="form-radio text-indigo-600"
                                    checked={formData.gender === 'Male'}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    className="form-radio text-indigo-600"
                                    checked={formData.gender === 'Female'}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Courses:</label>
                        <div className="flex items-center mt-1">
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="checkbox"
                                    name="courses"
                                    value="MCA"
                                    className="form-checkbox text-indigo-600"
                                    checked={formData.courses.includes('MCA')}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2">MCA</span>
                            </label>
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="checkbox"
                                    name="courses"
                                    value="BCA"
                                    className="form-checkbox text-indigo-600"
                                    checked={formData.courses.includes('BCA')}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2">BCA</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="courses"
                                    value="BSc"
                                    className="form-checkbox text-indigo-600"
                                    checked={formData.courses.includes('BSc')}
                                    onChange={handleInputChange}
                                />
                                <span className="ml-2">BSc</span>
                            </label>
                        </div>
                    </div>

                    <label htmlFor="image" className="block mt-4 text-sm font-medium text-gray-700">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <button
                        type="submit"
                        className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
