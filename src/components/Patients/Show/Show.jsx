import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar'
import './Show.css'
import GetId from '../../../hooks/GetId'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFileAlt, faUserMd } from '@fortawesome/free-solid-svg-icons';

export default function Show(){
    const [PatientId,setId]= useState(0);
    const [analyze,setAnalyze]= useState({})
    const [doctor,setDoctor]= useState({})
    const [branch,setBranch]= useState({})
    const id = useParams();
    const navigate =useNavigate();
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/Analyses/${id.id}`)
        .then(res => {
        setAnalyze(res.data.analyze)
        setDoctor(res.data.analyze.doctor)
        setBranch(res.data.analyze.branch)
            if(res.data.analyze.patients_id == PatientId){
                setAnalyze(res.data.analyze)
            }else if(PatientId != 0){
            navigate('/error') 
        }
    })
    .catch((err)=>{
            navigate('/error')
        });
    },[PatientId]);
    const date= analyze.created_at !== undefined && analyze.created_at.split('T');
    return(
        <>
        <div className='show'>
            <Navbar></Navbar>
            <GetId setId={setId}></GetId>
            <div className='container'>
                <div className='information'>
                    <img src={analyze.content} alt="" />
                    <div className='text'>
                    <h2>{analyze.title}</h2>
                    <ul>
                        <li className='info'>
                        <FontAwesomeIcon className='icon' icon={faCalendar}></FontAwesomeIcon>
                        <span>added at</span>
                        : {date[0]}
                        </li>
                        <li className='info'>
                        <FontAwesomeIcon className='icon' icon={faUserMd}></FontAwesomeIcon>
                        <span>doctor</span>
                        : {doctor.name}
                        </li>
                        <li className='info'>
                        <span>branch</span>
                        : {branch.title}
                        </li>
                        <li className='info'>
                        <FontAwesomeIcon className='icon' icon={faFileAlt}></FontAwesomeIcon>
                        <span>status</span>
                        : {analyze.status == 0 ? 'ongoing' : 'done'}
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}