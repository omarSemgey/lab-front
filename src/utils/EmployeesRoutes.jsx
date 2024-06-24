import { Navigate, Outlet } from "react-router-dom";

export default function EmployeesRoutes(){
    const token=localStorage.getItem('token');
    const role=localStorage.getItem('role');
    if(token !== null){
        if(role <=1){
            return <Navigate to='/'></Navigate>
            // console.log('patient')
        }else{
            return <Outlet/>
            // console.log('employee')
        }
    }else{
        return <Navigate to='/logIn'></Navigate>
        // console.log('not logged in')
    }

}