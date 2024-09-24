import React from 'react'

export const EditEmployee = () => {
  return (
    <div className='mx-auto max-w-[80%] flex flex-col items-center'>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mt-4">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Employee</h2>
          <form action="#" method="POST">
        
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
              <input type="text" id="name" name="name" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />

              <label htmlFor="email" className="block mt-4 text-sm font-medium text-gray-700">Email:</label>
              <input type="email" id="email" name="email" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />

              <label htmlFor="mobile" className="block mt-4 text-sm font-medium text-gray-700">Mobile Number:</label>
              <input type="tel" id="mobile" name="mobile" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required />

              <label htmlFor="designation" className="block mt-4 text-sm font-medium text-gray-700">Designation:</label>
              <select id="designation" name="designation" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
              </select>

              <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Gender:</label>
                  <div className="flex items-center mt-1">
                      <label className="inline-flex items-center mr-4">
                          <input type="radio" name="gender" value="Male" className="form-radio text-indigo-600" required />
                          <span className="ml-2">Male</span>
                      </label>
                      <label className="inline-flex items-center">
                          <input type="radio" name="gender" value="Female" className="form-radio text-indigo-600" required />
                          <span className="ml-2">Female</span>
                      </label>
                  </div>
              </div>

              <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Courses:</label>
                  <div className="flex items-center mt-1">
                      <label className="inline-flex items-center mr-4">
                          <input type="checkbox" name="course" value="MCA" className="form-checkbox text-indigo-600" />
                          <span className="ml-2">MCA</span>
                      </label>
                      <label className="inline-flex items-center mr-4">
                          <input type="checkbox" name="course" value="BCA" className="form-checkbox text-indigo-600" />
                          <span className="ml-2">BCA</span>
                      </label>
                      <label className="inline-flex items-center">
                          <input type="checkbox" name="course" value="BSc" className="form-checkbox text-indigo-600" />
                          <span className="ml-2">BSc</span>
                      </label>
                  </div>
              </div>

              <label htmlFor="image" className="block mt-4 text-sm font-medium text-gray-700">Upload Image:</label>
              <input type="file" id="image" name="image" className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" accept="image/*" required />

              <button type="submit" className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Submit
              </button>
          </form>
      </div>
    </div>
  )
}
