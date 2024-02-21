import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import DepartmentList from './components/departmentManagement/DepartmentList';
import DepartmentForm from './components/departmentManagement/DepartmentForm';
import EmployeeList from './components/empManagement/EmployeeList';
import EmployeeForm from './components/empManagement/EmployeeForm';

function App() {
  return (
    <div className="App">

      <header>
        <Navbar></Navbar>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/departments' element={<DepartmentList/>}/>
          <Route path='/departments/add' element={<DepartmentForm/>}/>
          <Route path='/departments/add/:departmentId' element={<DepartmentForm/>}/>

          <Route path='/employees' element={<EmployeeList/>}/>
          <Route path='/employees/add' element={<EmployeeForm/>}/>
          <Route path='/employees/add/:empId' element={<EmployeeForm/>}/>
        </Routes>
      </main>  
      
      
      
    </div>
  );
}

export default App;
