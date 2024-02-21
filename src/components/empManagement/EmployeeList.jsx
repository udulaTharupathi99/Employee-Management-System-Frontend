import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import DepartmentService from "../../services/DepartmentService";
import EmployeeService from "../../services/EmployeeService";

const EmployeeList = () => {
  const [search, setSearch] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    EmployeeService.getAllEmployees().then((data) => {
        setEmployeeList(data);
        console.log(data);
      });
  };

  const deleteEmployee = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Deleting the Employee!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          EmployeeService.deleteEmployee(id)
            .then((res) => {
              refresh();
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Employee has been Deleted.",
                "success"
              );
            })
            .catch((error) => {
              console.log("bbb", error.response.data);
              let m = error.response.data;
              Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: m,
              });
            });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Delete canceled",
            "error"
          );
        }
      });
  };

  const convertDateOnly = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);
    return dateObject.toISOString().split('T')[0];
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="w-75 mx-auto text-center p-3 mt-1">
          <div>
            <div className="container p-1 mt-4 mb-4">
              
              <div className="row ">
                <div className="shadow-lg card  mx-auto w-100">
                <div className="centered-text">
                  <h1>Employee List</h1>
                </div>
                  <div className=" container d-flex flex-row">
                    <input
                      type="text"
                      placeholder="Search by employee first name"
                      className="form-control mt-3 w-50 mx-2"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />

                    <Link
                      className="btn btn-primary mt-3 p-2"
                      style={{ width: 190, marginLeft: 460 }}
                      to={"/employees/add"}
                    >
                      Add Employee
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </Link>
                  </div>
                  <table class="table table-striped mt-3">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Age</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Department</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeList
                        ?.filter((value) => {
                          if (search === "") {
                            return value;
                          } else if (
                            value.firstName
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return value;
                          }
                          return 0;
                        })
                        .map((e) => (
                          <tr key={e.id}>
                            <td>{e.firstName}</td>
                            <td>{e.lastName}</td>
                            <td>{e.email}</td>
                            <td>{convertDateOnly(e.dob)}</td>
                            <td>{e.age}</td>
                            <td>{e.salary}</td>
                            <td>{e.departmentName}</td>
                            
                        
                            <td className="justify-content-sm-around">                              
                              <Link 
                                className="btn btn-warning"
                                to={`/employees/add/${e.id}`} 
                              >
                                Update
                              </Link>  

                              <button
                                type="button"
                                style={{ marginLeft: 10 }}
                                onClick={() => deleteEmployee(e.id)}
                                className="btn btn-danger" 
                              >
                                Delete
                              </button>                                                            
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;