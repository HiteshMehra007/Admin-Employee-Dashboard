import { uploadToCloudinary } from "../utils/cloudinary.js";
import { Employee } from "../models/employee.model.js";

const createEmployeeController = async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;
        console.log(name);
        
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!pattern.test(email)){
          return res.status(400).json({
            error: "Invalid Email Address"
          })
        }

        let imageLocalPath = req.file?.path; // Path to the uploaded file
        
        const imagePath = await uploadToCloudinary(imageLocalPath);

        const newEmployee = new Employee({
          fullName: name,
          email,
          mobile,
          designation,
          gender,
          courses: Array.isArray(course) ? course : [course],
          image: imagePath.url,
        });
    
        await newEmployee.save();
    
        return res.status(201).json({
          message: 'Employee created successfully',
          employee: newEmployee,
        });
      } catch (error) {
        console.error('Error creating employee:', error);
        return res.status(500).json({
          error: 'Internal server error',
        });
      }
}

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        return res.status(201).json({
            success: true,
            employees,
            count: employees.length
        })
    } catch (error) {
        console.error("Error while get all employees controller\n", error);
        return res.status(500).json({
            error: "Internal Server Error !"
        })
    }
}

const editEmployee = async (req, res) => {
    try {
      const { name, email, mobile, designation, gender, courses } = req.body;
      const { id } = req.params;
      
      const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, email, mobile, designation, gender, courses }, { new: true});
      if(!updatedEmployee){
        return res.status(400).json({error: "Employee Not found !!"});
      }

      return res.status(200).json({
        message: "Employee Updated Successfully !!",
        employee: updatedEmployee,
      })
    } catch (error) {
      console.error("Error in Edit Employee\n", error);
      return res.status(500).json({
        error: "Internal Server Error"
      })
    }
}

const getEmployeeById = async (req, res) => {
    try {
      const { id } = req.params;

      const emp = await Employee.findById(id);
      if(!emp){
        return res.status(400).json({
          error: "Employee Not found !"
        })
      }

      return res.status(200).json({
        success: true,
        employee: emp,
      })
    } catch (error) {
      console.log("Error while getting employee by id\n", error);
      return res.status(500).json({
        error: "Internal Server Error"
      })
    }
}

const deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findByIdAndDelete(id);

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.log("Error while deleting employee\n", error);
      return res.status(500).json({
        error: "Internal Server Error"
      })
    }
}

export { createEmployeeController, getAllEmployees, editEmployee, deleteEmployee, getEmployeeById };