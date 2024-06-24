import { Link } from 'react-router-dom'
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faUserMd, faUsers } from '@fortawesome/free-solid-svg-icons'
import { useEffect,useState } from 'react'
import axios from 'axios';

export default function Home(){
    const [analyses,setAnalyses] = useState({});
    const [branches,setBranch] = useState({});
    const [doctors,setDoctor] = useState({});
    const [patients,setPatient] = useState({});
    useEffect(()=>{
            axios.get(`http://127.0.0.1:8000/api/Analyses`)
            .then(res => {
                setAnalyses(res.data.analyze)
            })
            axios.get('http://127.0.0.1:8000/api/Branches')
            .then(res => {
                setBranch(res.data.branch)
            })
            axios.get('http://127.0.0.1:8000/api/Patients')
            .then(res => {
                setPatient(res.data.patient)
            })
            axios.get('http://127.0.0.1:8000/api/Employees')
            .then(res => {
                setDoctor(Array.from(res.data.employees).filter(item => item.role == 2));
            })
    },[])
    return(
        <>
        <div className='home'>
            <div className='container'>
                <div className='page-header'>
                    <span>DASHBOARD</span>
                </div>
                <div className='page-heading'>
                    <span className='lab'>Omar's lab</span>
                    <span className='role'>you have administrator access</span>
                </div>
                <div className='overview'>
                    <span>
                        Analytics Overview
                    </span>
                    <div className='cards'>
                        <div className='card'>
                            <FontAwesomeIcon className='card-icon' icon={faUsers}></FontAwesomeIcon>
                            <div className='card-text'>
                                <h1 className='counter'>{branches.length}</h1>
                                <span>Total Branches</span>
                            </div>
                        </div>
                        <div className='card'>
                            <FontAwesomeIcon className='card-icon' icon={faUsers}></FontAwesomeIcon>
                            <div className='card-text'>
                                <h1 className='counter'>{patients.length}</h1>
                                <span>Total Patients</span>
                            </div>
                        </div>
                        <div className='card'>
                            <FontAwesomeIcon className='card-icon' icon={faUserMd}></FontAwesomeIcon>
                            <div className='card-text'>
                                <h1 className='counter'>{doctors.length}</h1>
                                <span>Total Doctors</span>
                            </div>
                        </div>
                        <div className='card'>
                            <FontAwesomeIcon className='card-icon' icon={faFileAlt}></FontAwesomeIcon>
                            <div className='card-text'>
                                <h1 className='counter'>{analyses.length}</h1>
                                <span>Total Analyses</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}