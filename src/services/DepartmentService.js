import axios from "axios";
const URL = "https://localhost:7261/department";

class DepartmentService {
  addDepartment(department) {
    return axios.post(URL, department);
  }

  getAllDepartments() {
    return axios.get(URL).then((res) => res.data);
  }

  deleteDepartment(id) {
    return axios.delete(URL + "/" + id);
  }

  updateDepartment(department) {
    return axios.put(URL + "/" + department.id, department);
  }

  getDepartmentById(id) {
    return axios.get(URL + "/" + id).then((resopnse) => resopnse.data);
  }
}
export default new DepartmentService();