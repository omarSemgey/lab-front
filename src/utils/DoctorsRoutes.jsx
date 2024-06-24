import { Navigate, Outlet } from "react-router-dom";

export default function EmployeesRoutes(){
    const token=localStorage.getItem('token');
    const role=localStorage.getItem('role');
    // return role <=2 ? <Navigate to='/'></Navigate> : <Outlet/>
    if(token !== null){
        if(role <=2){
            if(role == 1){
                return <Navigate to='/'></Navigate>
                // console.log('patient')
                }else{
                return <Navigate to='/Dashboard'></Navigate>
                // console.log('doctor')
                }
        }else{
            return <Outlet/>
            // console.log('authorized')
        }
    }else{
        // return <Navigate to='/logIn'></Navigate>
        console.log('not logged in')
    }
}