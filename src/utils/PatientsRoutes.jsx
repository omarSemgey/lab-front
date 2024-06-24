import { Navigate, Outlet } from "react-router-dom";

export default function EmployeesRoutes(){
    const token=localStorage.getItem('token');
    const role=localStorage.getItem('role');
    
    // return role != 1 ? <Navigate to='/Dashboard'></Navigate> : <Outlet/>
        if(token !== null ){
            if(role != 1){
                return <Navigate to='/Dashboard'></Navigate>
                // console.log('employee')
            }else{
                return <Outlet/>
                // console.log('employee')
            }
        }else{
            return <Navigate to='/logIn'></Navigate>
            // console.log('not logged in')
        }
}
