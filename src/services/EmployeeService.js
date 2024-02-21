import axios from "axios";
const URL = "https://localhost:7261/employee";

class EmployeeService {
  addEmployee(employee) {
    return axios.post(URL, employee);
  }

  getAllEmployees() {
    return axios.get(URL).then((res) => res.data);
  }

  deleteEmployee(id) {
    return axios.delete(URL + "/" + id);
  }

  updateEmployee(employee) {
    return axios.put(URL + "/" + employee.id, employee);
  }

  getEmployeeById(id) {
    return axios.get(URL + "/" + id).then((resopnse) => resopnse.data);
  }
}
export default new EmployeeService();