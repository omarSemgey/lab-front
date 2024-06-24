import './LeftNav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUserMd,faUser,faFileAlt,faAngleLeft, faSignOutAlt, faBuilding } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useDispatch } from 'react-redux'
// import { logout } from '../../../redux/reducers/roleSlice';
export default function LeftNav(){
    const role =localStorage.getItem('role');
    const displayDoctor = role <= 2  ? 'none' : '';
    const displaySupervisor = role == 3 || role <= 2 ? 'none' : '';
    const displayBranch = role != 4 ? 'none' : '';
    // const dispatch = useDispatch()
    const navigate =useNavigate();
    function handleLinks(e){
        if(e.currentTarget.children[2].classList.contains('sidebar-arrow-down')){
            e.currentTarget.parentElement.classList.remove('sidebar-active');
            e.currentTarget.children[2].classList.remove('sidebar-arrow-down');
            e.currentTarget.parentElement.children[1].classList.remove('nav-list-active');
        }else{
            // do it the proper way you bastard
            Array.from(document.getElementsByClassName('sidebar-arrow')).forEach(e => {
                e.classList.remove('sidebar-arrow-down')
            });
            Array.from(document.getElementsByClassName('sidebar-item')).forEach(e => {
                e.classList.remove('sidebar-active')
            });
            Array.from(document.getElementsByClassName('nav-list')).forEach(e => {
                e.classList.remove('nav-list-active')
            }); 
            e.currentTarget.parentElement.children[1].classList.add('nav-list-active');
            e.currentTarget.parentElement.classList.add('sidebar-active');
            e.currentTarget.children[2].classList.add('sidebar-arrow-down');
        }
    }
    function handleList(e){
        if(e.target.classList.contains('list-active')){
            }else{
            Array.from(document.getElementsByClassName('sidebar-list-item')).forEach(e => {
                e.classList.remove('list-active');
            });
            e.target.classList.add('list-active')
        }
    }
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
    return(
        <>
        <div className='sidebar'>
        <div className='nav-container'>
            <h6>Main</h6>
            <ul>
                <li className='sidebar-item'  style={{display:displayBranch}}>
                    <span className='sidebar-link sidebar-main-link' onClick={(e)=>{handleLinks(e)}}>
                    <FontAwesomeIcon icon={faBuilding} className='sidebar-icon'></FontAwesomeIcon> 
                    <span className='link-title'>Branches</span>
                    <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                    </span>
                    <ul className='nav-list'>
                        <li>
                            <Link to='/Dashboard/branches' href="#" className='sidebar-link sidebar-list-item' onClick={(e)=>{handleList(e)}}>
                                Branches list
                            </Link>
                        </li>
                        <li>
                            <Link to='/Dashboard/branches/create' href="#" className='sidebar-link sidebar-list-item' onClick={(e)=>{handleList(e)}}>
                                Create Branch
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='sidebar-item'  style={{display:displaySupervisor}}>
                    <span className='sidebar-link sidebar-main-link' onClick={(e)=>{handleLinks(e)}}>
                    <FontAwesomeIcon icon={faUser} className='sidebar-icon'></FontAwesomeIcon> 
                    <span className='link-title'>Supervisors</span>
                    <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                    </span>
                    <ul className='nav-list'>
                        <li>
                            <Link to='/Dashboard/supervisors' href="#" className='sidebar-link sidebar-list-item' onClick={(e)=>{handleList(e)}}>
                                Supervisors list
                            </Link>
                        </li>
                        <li>
                            <Link to='/Dashboard/supervisors/create' href="#" className='sidebar-link sidebar-list-item' onClick={(e)=>{handleList(e)}}>
                                Create Supervisor
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='sidebar-item'  style={{display:displayDoctor}}>
                    <span className='sidebar-link sidebar-main-link' onClick={(e)=>{handleLinks(e)}}>
                    <FontAwesomeIcon icon={faUserMd} className='sidebar-icon'></FontAwesomeIcon> 
                    <span className='link-title'>Doctors</span>
                    <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                    </span>
                    <ul className='nav-list '>
                        <li>
                            <Link to='/Dashboard/doctors' href="#" className='sidebar-link sidebar-list-item' onClick={(e)=>{handleList(e)}}>
                                Doctors list
                            </Link>
                        </li>
                        <li>
                            <Link to='/Dashboard/doctors/create' href="#" className='sidebar-link sidebar-list-item' onClick={(e)=>{handleList(e)}}>
                                Create Doctor
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='sidebar-item'>
                    <span className='sidebar-link sidebar-main-link' onClick={(e)=>{handleLinks(e)}}>
                    <FontAwesomeIcon icon={faUser} className='sidebar-icon'></FontAwesomeIcon> 
                    <span className='link-title'>Patients</span>
                    <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                    </span>
                    <ul className='nav-list'>
                        <li>
                            <Link to='/Dashboard/patients' href="#" className='sidebar-link sidebar-list-item' onClick={(e)=>{handleList(e)}}>
                                Patients list
                            </Link>
                        </li>
                        <li>
                            <Link to='/Dashboard/patients/create' href="#" className='sidebar-link sidebar-list-item' onClick={(e)=>{handleList(e)}}>
                                Create patients
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='sidebar-item'>
                    <span className='sidebar-link sidebar-main-link' onClick={(e)=>{handleLinks(e)}}>
                    <FontAwesomeIcon icon={faFileAlt} className='sidebar-icon'></FontAwesomeIcon> 
                    <span className='link-title'>Analyses</span>
                    <FontAwesomeIcon icon={faAngleLeft} className='sidebar-arrow'></FontAwesomeIcon> 
                    </span>
                    <ul className='nav-list'>
                        <li>
                            <Link to='/Dashboard/analyses' href="#" className='sidebar-link sidebar-list-item' onClick={(e)=>{handleList(e)}}>
                                Analyses list
                            </Link>
                        </li>
                        <li>
                            <Link to='/Dashboard/analyses/create' href="#" className='sidebar-link sidebar-list-item' onClick={(e)=>{handleList(e)}}>
                                Create analyses
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className='sidebar-item log-out'>
                    <span className='sidebar-link sidebar-main-link' onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className='sidebar-icon'></FontAwesomeIcon> 
                    <span className='link-title'>logout</span>
                    </span>
                </li>
            </ul>
        </div>
        </div>
        </>
    )
}