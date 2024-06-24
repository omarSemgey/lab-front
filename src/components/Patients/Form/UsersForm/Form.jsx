import './Form.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GetId from '../../../../hooks/GetId'
export default function Form(){
    const [user,setUser] = useState({});
    const [displayName,setDisplayName] = useState('none');
    const [displayPassword,setDisplayPassword] = useState('none');
    const [displayEmail,setDisplayEmail] = useState('none');
    const [displayValidEmail,setDisplayValidEmail] = useState('none');
    const [displayUnique,setDisplayUnique] = useState('none');
    const [id,setId]=useState(0);
    useEffect(()=>{
        if( id != 0 ){
            axios.get(`http://127.0.0.1:8000/api/Patients/${id}`)
            .then(res => {
                setUser(res.data.patient)
            })
        }
        },[id])

    //request refs
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const token=localStorage.getItem('token');
    const navigate=useNavigate();
    function handleSubmit(e){
        e.preventDefault();
            axios.put(`http://127.0.0.1:8000/api/Patients/${id}`, {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
            },{
                headers: {
                    'Authorization': `Bearer ${token}` 
                } 
            })
            .then((response) => {
                navigate('/profile')
            })
            .catch(error => { 
                const err=error.response.data.message;
                err == 'The name field is required.' || err == 'The name field is required. (and 1 more error)'  || err == 'The name field is required. (and 2 more errors)' ? setDisplayName('block') : setDisplayName('none');
                err == 'The email field is required.' || err == 'The name field is required. (and 1 more error)' || err == 'The name field is required. (and 2 more errors)' || err == 'The email field is required. (and 1 more error)' ? setDisplayEmail('block') : setDisplayEmail('none');
                err == 'The email field must be a valid email address.' ? setDisplayValidEmail('block') : setDisplayValidEmail('none');
                err == 'The email has already been taken.' ? setDisplayUnique('block') : setDisplayUnique('none')
                err == 'The password field is required.' || err == 'The name field is required. (and 1 more error)' || err == 'The name field is required. (and 2 more errors)' || err == 'The email field is required. (and 1 more error)' ? setDisplayPassword('block') : setDisplayPassword('none');
            });
    };
    return(
        <>
        <GetId setId={setId}></GetId>
            <div className="create-form">
                <div className='container'>
                    <h1>
                        Update profile 
                    </h1>
                    <h4>
                        Please fill this form to update your profile
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
                        {/* <button type='submit' onClick={(e) => handleSubmit(e)} className="main-button"><Link className='link' to={`/profile`}>Update</Link></button> */}
                        <button type='submit' onClick={(e) => handleSubmit(e)} className="main-button">Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}