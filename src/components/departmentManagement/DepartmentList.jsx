import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import DepartmentService from "../../services/DepartmentService";

const DepartmentList = () => {
  const [search, setSearch] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    DepartmentService.getAllDepartments().then((data) => {
        setDepartmentList(data);
        console.log(data);
      });
  };

  const deleteDepartment = (id) => {
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
        text: "Deleting the Department!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          DepartmentService.deleteDepartment(id)
            .then((res) => {
              refresh();
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Department has been Deleted.",
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

  return (
    <div>
      <div className="container-fluid">
        <div className="w-75 mx-auto text-center p-3 mt-1">
          <div>
            <div className="container p-1 mt-4 mb-4">
              <div className="row ">
                <div className="shadow-lg card  mx-auto w-100">
                  <div className="centered-text">
                    <h1>Department List</h1>
                  </div>
                  <div className=" container d-flex flex-row" >                  
                    <input
                      type="text"
                      placeholder="Search by department name"
                      className="form-control mt-3 w-50 mx-2"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />

                    <Link
                      className="btn btn-primary mt-3 p-2"
                      style={{ width: 190, marginLeft: 460 }}
                      to={"/departments/add"}
                    >
                      Add Department
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </Link>
                  </div>

                  <table class="table table-striped mt-3">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentList
                        ?.filter((value) => {
                          if (search === "") {
                            return value;
                          } else if (
                            value.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return value;
                          }
                          return 0;
                        })
                        .map((d) => (
                          <tr key={d.id}>
                            <td>{d.code}</td>
                            <td>{d.name}</td>
                            <td>{d.location}</td>
                            <td>{d.description}</td>                        
                            <td className="justify-content-sm-around">                            
                              <Link className="btn btn-warning" to={`/departments/add/${d.id}`}>
                                Update
                              </Link>     

                              <button
                                type="button"
                                style={{ marginLeft: 10 }}
                                onClick={() => deleteDepartment(d.id)}
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

export default DepartmentList;