import './Form.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
export default function Form({ type,page }){
    const [user,setUser] = useState({});
    const [branch,setBranch] = useState({});
    const [displayName,setDisplayName] = useState('none');
    const [displayPassword,setDisplayPassword] = useState('none');
    const [displayEmail,setDisplayEmail] = useState('none');
    const [displayValidEmail,setDisplayValidEmail] = useState('none');
    const [displayUnique,setDisplayUnique] = useState('none');
    // const [selected,setSelected] = useState(false);
    const api = type == 'patient' ? 'Patients' : 'Employees';
    const id = useParams();
    useEffect(()=>{
        if(page == 'update'){
        axios.get(`http://127.0.0.1:8000/api/${api}/${id.id}`)
        .then(res => {
            api == 'Patients' ? setUser(res.data.patient) : setUser(res.data.employees);
        })
        }
        axios.get('http://127.0.0.1:8000/api/Branches')
        .then(res => {
            setBranch(res.data.branch)
        })
        },[])

    //request refs
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const branches_id = useRef();
    const role = type == 'doctor' ? 2 : 3;
    const token=localStorage.getItem('token');
    const navigate =useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        if(page == 'create'){
        axios.post(`http://127.0.0.1:8000/api/${api}`,{
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            role:type == 'patient' ? 1 : role,
            branches_id:type !== 'patients' && branches_id.current.value,
        },{ headers: { 'Authorization': `Bearer ${token}` } })
        .then((response) => {
            navigate(`/Dashboard/${type}s`)
        })
        .catch(error => { 
            const err=error.response.data.message;
            err == 'The name field is required.' || err == 'The name field is required. (and 1 more error)'  || err == 'The name field is required. (and 2 more errors)' ? setDisplayName('block') : setDisplayName('none');
            err == 'The email field is required.' || err == 'The name field is required. (and 1 more error)' || err == 'The name field is required. (and 2 more errors)' ? setDisplayEmail('block') : setDisplayEmail('none');
            err == 'The email field must be a valid email address' ? setDisplayValidEmail('block') : setDisplayValidEmail('none');
            err == 'The email has already been taken.' ? setDisplayUnique('block') : setDisplayUnique('none')
            err == 'The password field is required.' || err == 'The name field is required. (and 1 more error)' || err == 'The name field is required. (and 2 more errors)' ? setDisplayPassword('block') : setDisplayPassword('none');
        });
        }else{
            axios.put(`http://127.0.0.1:8000/api/${api}/${id.id}`, {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                branches_id: type !== 'patients' && branches_id.current.value,
            },{ headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                navigate(`/Dashboard/${type}s`)
            })
            .catch(error => { 
                console.log(error.response.data.message)
                const err=error.response.data.message;
                err == 'The name field is required.' || err == 'The name field is required. (and 1 more error)'  || err == 'The name field is required. (and 2 more errors)' ? setDisplayName('block') : setDisplayName('none');
                err == 'The email field is required.' || err == 'The name field is required. (and 1 more error)' || err == 'The name field is required. (and 2 more errors)' || err == 'The email field is required. (and 1 more error)' ? setDisplayEmail('block') : setDisplayEmail('none');
                err == 'The email field must be a valid email address' ? setDisplayValidEmail('block') : setDisplayValidEmail('none');
                err == 'The email has already been taken.' ? setDisplayUnique('block') : setDisplayUnique('none')
                err == 'The password field is required.' || err == 'The name field is required. (and 1 more error)' || err == 'The name field is required. (and 2 more errors)' || err == 'The email field is required. (and 1 more error)' ? setDisplayPassword('block') : setDisplayPassword('none');
            });
        }
    };
    return(
        <>
            <div className="create-form">
                <div className='container'>
                    <h1>
                        {page == 'create' ? 'Add new' : 'Update'} {type}
                    </h1>
                    <h4>
                        Please fill this form to {page == 'create' ? 'Add new' : 'update'} {type}
                    </h4>
                    <hr />
                    <form className="form" method="post">
                        <label htmlFor="user">Full Name</label>
                        <input type="text" placeholder="Full Name..." required defaultValue={user.name} ref={name}/>
                        <p className='error' style={{display:displayName}}>the name field is required, and must be 3 litters at least</p>
                        <label htmlFor="email"> Email Address </label>
                        <input type="text" placeholder="Email Address..." required defaultValue={user.email} ref={email}/>
                        <p className='error' style={{display:displayEmail}}>the email field is required.</p>
                        <p className='error' style={{display:displayValidEmail}}>the email must be a valid email address.</p>
                        <p className='error' style={{display:displayUnique}}>this email is already registered</p>
                        <label htmlFor="subject">Password</label>
                        <input type="text" placeholder="password..."  required ref={password}/>
                        <p className='error' style={{display:displayPassword}}>the password field is required.</p>
                        <div style={{'display':type == 'patient' && 'none'}}>
                            <label htmlFor="branch">Branch</label>
                            <select id='branch' className='select' ref={branches_id}>
                                {
                                    Array.from(branch).map((branch,index)=>{
                                        return(
                                            <option key={index} value={branch.id} selected={branch.id == user.branches_id}>{branch.title}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {/* <button type='submit' onClick={(e) => handleSubmit(e)} className="main-button"><Link className='link' to={`/Dashboard/${type}s/`}>{page}</Link></button> */}
                        <button type='submit' onClick={(e) => handleSubmit(e)} className="main-button">{page}</button>
                    </form>
                </div>
            </div>
        </>
    )
}