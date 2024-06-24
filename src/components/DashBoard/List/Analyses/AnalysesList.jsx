import './AnalysesList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEdit,faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

export default function AnalysesList(){
    function handleDirections(e){
        if(e.target.classList.contains('down')){
            e.target.classList.remove('down');
            Array.from(document.getElementsByClassName('direction')).forEach(e => {
                e.classList.remove('up')
                e.classList.remove('down')
            });
            e.target.classList.add('up');
        }else{
            e.target.classList.remove('up');
            Array.from(document.getElementsByClassName('direction')).forEach(e => {
                e.classList.remove('up')
                e.classList.remove('down')
            });
            e.target.classList.add('down')
        }
    }
    const [render, setRender] = useState(0)
    const [data,setData] = useState({});
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/Analyses')
        .then(res => {
            setData(res.data.analyze)
        })
    },[render])
    async function handleDelete(id){
        await axios.delete(`http://127.0.0.1:8000/api/Analyses/${id}`);
        setRender(render + 1)
    }
    return(
        <>
        <div className='list analyses-list'>
            <div className='container'>
            <div className='page-header'>
                <Link to='/Dashboard'>DASHBOARD</Link>
                <span className='slash'>/</span>
                <span>analyses</span>
            </div>
            <div className='page-heading'>
                <h1>analyses</h1>
                <Link className='new' to={`/Dashboard/analyses/create`}>add new</Link>
            </div>
            <table className='content-table'>
                <thead className='table-head'>
                    <tr>
                        <th className='table-item'>
                            analyses id
                        </th>
                        <th  className='table-item'>
                            <span className='direction up' onClick={(e)=>{handleDirections(e)}}>
                                type
                            </span>
                        </th>
                        <th>
                            <span className='direction' onClick={(e)=>{handleDirections(e)}}>
                            Doctor
                            </span>
                        </th>
                        <th>
                            <span className='direction' onClick={(e)=>{handleDirections(e)}}>
                            Patient
                            </span>
                        </th>
                        <th>
                            <span className='direction' onClick={(e)=>{handleDirections(e)}}>
                            Branch
                            </span>
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {
                        Array.from(data).map((e,index)=>{
                            return(
                                <tr key={index} className='table-row'>
                                <td>
                                    {e.id}
                                </td>
                                <td>
                                    {e.title}
                                </td>
                                <td>
                                    {e.doctor.name}
                                </td>
                                <td>
                                    {e.patient.name}
                                </td>
                                <td>
                                    {e.branch.title}
                                </td>
                                <td>
                                <Link to={`/Dashboard/analyses/${e.id}/edit`} className='edit'><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link>
                                    <span className='delete' onClick={() => handleDelete(e.id)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></span>
                                </td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='counter'>
                <span>
                Showing {data.length} analyses
                </span>
            </div>
            </div>
        </div>
        </>
    )
}