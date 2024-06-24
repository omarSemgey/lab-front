import { Navigate, Outlet } from "react-router-dom";

export default function EmployeesRoutes(){
    const token=localStorage.getItem('token');
    const role=localStorage.getItem('role');
    // return role <=3 ? <Navigate to='/'></Navigate> : <Outlet/>
    if(token !== null){
        if(role <=3){
            if(role == 1){
                return <Navigate to='/'></Navigate>
            }else{
                return <Navigate to='/Dashboard'></Navigate>
            }
        }else{
            return <Outlet/>
        }
    }else{
        return <Navigate to='/logIn'></Navigate>
    }
}
