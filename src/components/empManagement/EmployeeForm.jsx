import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DepartmentService from "../../services/DepartmentService";
import EmployeeService from "../../services/EmployeeService";

const EmployeeForm = () => {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState(0);
  const [departmentList, setDepartmentList] = useState([]);
 
  const { empId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (empId) {
      EmployeeService.getEmployeeById(empId).then((response) => {
        setId(response.id);
        setFirstName(response.firstName);
        setLastName(response.lastName);
        setEmail(response.email);
        setDOB(response.dob);
        setSalary(response.salary);
        setDepartment(response.departmentName);
        console.log(response);
      });
    }

    DepartmentService.getAllDepartments().then((data) => {
        setDepartmentList(data);
        console.log(data);
      });

  }, []);

  console.log(departmentList);

  const submitEmployee = (e) => {
    e.preventDefault();
    let d = parseInt(department, 10)
    const emp = { id, firstName, lastName, email, dOB:DOB, salary, departmentId:department};

    if (empId) {
      EmployeeService.updateEmployee(emp).then((response) => {
        Swal.fire("Success", "Employee Updated Successfully", "success");
        navigate("/employees");
      });
    } else {
      EmployeeService.addEmployee(emp)
        .then((response) => {
          Swal.fire("Success", "Employee Added Successfully", "success");
          navigate("/employees");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const selectDepartment = (e) => {
    e.preventDefault();
    setDepartment(e.target.value);
    console.log("id",e.target.value);  
  }
  console.log("dep",department);

  return (
    <div>
      <div className="row">
        <div
          className="card  text-bg-white adminNotice-table mb-3 shadow-lg text-center col-sm-6 mx-auto"
          style={{ borderRadius: 10, marginTop: 50 }}
        >
          <div className="card-body">
            <h1 className="card-title mt-1">{(empId) ? "Update" : "Add"} Employee</h1>
            <form onSubmit={submitEmployee}>
              <div>
                <div className="row col-sm-8   mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    First Name
                  </strong>
                  <input
                    name="name"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Enter employee first name..."
                    type="text"
                    value={firstName}
                    minLength="3"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row col-sm-8   mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    Last Name
                  </strong>
                  <input
                    name="name"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Enter employee last name..."
                    type="text"
                    value={lastName}
                    minLength="3"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row col-sm-8 mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -3 }}
                    className="col-sm-3  col-form-label"
                  >
                    Email
                  </strong>
                  <input
                    name="email"
                    style={{ marginLeft: 3 }}
                    className="form-control w-75"
                    placeholder="Enter employee email..."
                    type="email"
                    value={email}
                    minLength="5"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row col-sm-8   mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    DOB
                  </strong>
                  <input
                    name="date"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Enter Add employee birthday..."
                    type="date"
                    value={DOB}
                    minLength="1"
                    onChange={(e) => {
                      setDOB(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row col-sm-8   mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    Salary (LKR)
                  </strong>
                  <input
                    name="salary"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Enter employee salary..."
                    type="number"
                    value={salary}
                    minLength="1"
                    onChange={(e) => {
                      setSalary(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row col-sm-8   mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    Department
                  </strong>
                  <select
                    name="trainName"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Enter department name..."                    
                    value={department}
                    minLength="1"
                    onChange={selectDepartment}
                    required  
                  > 
                  <option name="item"  >Select department</option>

                  {departmentList.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                  </select>

                </div>
                
                <div
                  className="row w-50 mx-auto mt-3 mb-4 "
                  style={{ borderRadius: 30 }}
                >
                  <input
                    className="btn btn-primary mt-4 mx-auto shadow-lg"
                    type="submit"
                    value="Save"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;