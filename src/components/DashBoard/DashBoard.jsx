import { Outlet } from 'react-router-dom';
import './DashBoard.css'
import LeftNav from "./LeftNav/LeftNav";
import { useEffect } from 'react';
export default function DashBoard(){

    return(
        <>
        <div className='dashboard'>
        <LeftNav></LeftNav>
        <Outlet></Outlet>
        </div>
        </>
    )
}