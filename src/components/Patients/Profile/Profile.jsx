import './Profile.css'
import { useEffect, useState } from 'react'
import GetId from '../../../hooks/GetId'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEdit, faFileAlt, faSignOutAlt, faAddressCard, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Profile(){
    const [id,setId]=useState(0);
    const [patient,setPatient]=useState('');
    const [count,setCount] =useState(0)
    const navigate =useNavigate();
    useEffect(()=>{
        if( id != 0 ){
            axios.get(`http://127.0.0.1:8000/api/Patients/${id}`)
            .then(res => {
                setPatient(res.data.patient)
                setCount(res.data.patient.analyses.length)
            })
        }
    },[id]);
    function handleLogout(){
        const token=localStorage.getItem('token');
        axios.post(`http://127.0.0.1:8000/api/Employees/logout`,[],{ headers: { 'Authorization': `Bearer ${token}` } })
        .then((response) => {
        });
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        // dispatch(logout())
        navigate('/login')
    }
    const date= patient.created_at !== undefined && patient.created_at.split('T');
    return(
        <div className='profile'>
        <Navbar link={'Profile'}></Navbar>
        <GetId setId={setId}></GetId>
        <div className='container'>
        <div className='information'>
            <div className='info-header'>
                <div className='text'>
                    <span>my information</span>
                    <div className='actions'>
                    <Link className='link edit' to={'/profile/edit'}>
                        <FontAwesomeIcon className='link-icon'  icon={faEdit}></FontAwesomeIcon>
                        edit profile
                    </Link>

                    <span className='link logout' onClick={handleLogout}>
                        <FontAwesomeIcon className='link-icon'  icon={faSignOutAlt}></FontAwesomeIcon>
                        log out
                    </span>
                    </div>
                </div>
            </div>
            <ul>
                <li className='info'>
                <FontAwesomeIcon className='icon' icon={faAddressCard}></FontAwesomeIcon>
                <span>name</span>
                : {patient.name}
                </li>
                <li className='info'>
                <FontAwesomeIcon className='icon' icon={faEnvelope}></FontAwesomeIcon>
                <span>email</span>
                : {patient.email}
                </li>
                <li className='info'>
                <FontAwesomeIcon className='icon' icon={faFileAlt}></FontAwesomeIcon>
                <span>analyses count</span>
                : {count}
                </li>
                <li className='info'>
                <FontAwesomeIcon className='icon' icon={faCalendar}></FontAwesomeIcon>
                <span>register date</span>
                : {date[0]}
                </li>
            </ul>
        </div>
        </div>
        </div>
    )
}