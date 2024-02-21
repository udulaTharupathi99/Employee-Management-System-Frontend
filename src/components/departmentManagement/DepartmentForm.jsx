import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import DepartmentService from "../../services/DepartmentService";

const DepartmentForm = () => {
  const [id, setId] = useState("");
  const [code, setDepartmentCode] = useState("");
  const [name, setDepartmentName] = useState("");
  const [location, setDepartmentLocation] = useState("");
  const [description, setDepartmentDescription] = useState("");

  const { departmentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (departmentId) {
      DepartmentService.getDepartmentById(departmentId).then((response) => {
        setId(response.id);
        setDepartmentCode(response.code);
        setDepartmentName(response.name);
        setDepartmentLocation(response.location);
        setDepartmentDescription(response.description);
        console.log(response);
      });
    }
  }, []);

  const submitDepartment = (e) => {
    e.preventDefault();
    const department = { id, code, name, location, description};

    if (departmentId) {
      DepartmentService.updateDepartment(department).then((response) => {
        Swal.fire("Success", "Department Updated Successfully", "success");
        navigate("/departments");
      });
    } else {
      DepartmentService.addDepartment(department)
        .then((response) => {
          Swal.fire("Success", "Department Added Successfully", "success");
          navigate("/departments");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="row">
        <div
          className="card  text-bg-white adminNotice-table mb-3 shadow-lg text-center col-sm-6 mx-auto"
          style={{ borderRadius: 10, marginTop: 50 }}
        >
          <div className="card-body">
            <h1 className="card-title mt-1">{(departmentId) ? "Update" : "Add"} Department</h1>
            <form onSubmit={submitDepartment}>
              <div>
                <div className="row col-sm-8   mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    Code
                  </strong>
                  <input
                    name="code"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add department code..."
                    type="text"
                    value={code}
                    minLength="2"
                    onChange={(e) => {
                      setDepartmentCode(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row col-sm-8   mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    Name
                  </strong>
                  <input
                    name="name"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add department name..."
                    type="text"
                    value={name}
                    minLength="2"
                    onChange={(e) => {
                      setDepartmentName(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row col-sm-8 mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -3 }}
                    className="col-sm-3  col-form-label"
                  >
                    Location
                  </strong>
                  <input
                    name="location"
                    style={{ marginLeft: 3 }}
                    className="form-control w-75"
                    placeholder="Add department location..."
                    type="text"
                    value={location}
                    minLength="3"
                    onChange={(e) => {
                      setDepartmentLocation(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row col-sm-8   mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    Description
                  </strong>
                  <input
                    name="description"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add department description..."
                    type="text"
                    value={description}
                    minLength="2"
                    onChange={(e) => {
                      setDepartmentDescription(e.target.value);
                    }}
                    required
                  />
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

export default DepartmentForm;