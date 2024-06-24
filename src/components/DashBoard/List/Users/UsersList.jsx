import './UsersList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEdit,faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function UsersList({page}){
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
    const api = page == 'patient' ? 'Patients' : 'Employees'; 
        useEffect(()=>{
            axios.get(`http://127.0.0.1:8000/api/${api}`)
            .then(res => {
                if(page === 'supervisor'){
                    setData(Array.from(res.data.employees).filter(item => item.role == 3));
                }else if(page === 'doctor'){
                    setData(Array.from(res.data.employees).filter(item => item.role == 2));
                }else{
                    setData(res.data.patient)
                }
        }
        )
    },[render,page])

    // async function handleDelete(id){
    //     const token=localStorage.getItem('token');
    //     await axios.delete(`http://127.0.0.1:8000/api/${api}/${id}`,{ headers: { 'Authorization': `Bearer ${token}`} });
    //     setRender(render + 1)
    // }
    return(
        <>
        <div className='list'>
            <div className='container'>
            <div className='page-header'>
                <Link to='/Dashboard'>DASHBOARD</Link>
                <span className='slash'>/</span>
                <span>{page}s</span>
            </div>
            <div className='page-heading'>
                <h1>{page}s</h1>
                <Link className='new' to={`/Dashboard/${page}s/create`}>add new</Link>
            </div>
            <table className='content-table'>
                <thead className='table-head'>
                    <tr>
                        <th className='table-item'>
                            {page} id
                        </th>
                        <th  className='table-item'>
                            <span className='direction up' onClick={(e)=>{handleDirections(e)}}>
                                name
                            </span>
                        </th>
                        {page !== 'supervisor' &&          
                            <th>
                                <span className='direction' onClick={(e)=>{handleDirections(e)}}>
                                Analyses
                                </span>
                            </th>
                        }
                        {page !== 'patient' && <th><span className='direction' onClick={(e)=>{handleDirections(e)}}>Branch</span></th>}
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {
                        Array.from(data).map((e,index) => {
                            return(
                                <tr key={index} className='table-row'>
                                <td>
                                    {e.id}
                                </td>
                                <td>
                                    {e.name}
                                </td>
                                {page !== 'supervisor' &&              
                                    <td>
                                        {e.analyses_count}
                                    </td>
                                }
                                {page !== 'patient' && <td>{e.branch.title}</td>}
                                <td>
                                    <Link to={`/Dashboard/${page}s/${e.id}/edit`} className='edit'><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link>
                                    {/* <span className='delete' onClick={() => handleDelete(e.id)}><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></span> */}
                                </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='counter'>
                <span>
                Showing {data.length} {page}s
                </span>
            </div>
            </div>
        </div>
        </>
    )
}