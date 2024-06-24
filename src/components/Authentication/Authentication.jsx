import './Authentication.css'
import { useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
// import { setRole } from '../../redux/reducers/roleSlice';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Authentication({form}){
    // const dispatch = useDispatch()
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const api = form === 'Sign up' ? 'register' : 'login';
    const [displayNameForm,setDisplayNameForm] = useState('none');
    const [display,setDisplay] = useState('none');
    const [displayName,setDisplayName] = useState('none');
    const [displayPassword,setDisplayPassword] = useState('none');
    const [displayEmail,setDisplayEmail] = useState('none');
    const [displayValidEmail,setDisplayValidEmail] = useState('none');
    const [displayUnique,setDisplayUnique] = useState('none');
    const navigate=useNavigate();
    useEffect(()=>{
        form === 'Sign up' ? setDisplayNameForm('block') : setDisplayNameForm('none');
    },[])
    function handleSubmit(e){
        e.preventDefault();
        if(api == 'register'){
        axios.post(`http://127.0.0.1:8000/api/Patients/${api}`,{
            name:api == 'register' && name.current.value,
            email: email.current.value,
            password: password.current.value,
            role: 1,
            branches_id: 1,
        })
        .then((response) => {
            localStorage.setItem('token',response.data.authorisation.token);
            localStorage.setItem('role',response.data.role)
            navigate('/')
        })
        .catch(error => { 
            const err=error.response.data.message;
            err == 'The name field is required.' || err == 'The name field is required. (and 2 more errors)' || err == 'The name field is required. (and 1 more error)' ? setDisplayName('block') : setDisplayName('none')
            err == 'The email field is required.' || err == 'The name field is required. (and 2 more errors)' || err == 'The email field is required. (and 1 more error)' ? setDisplayEmail('block') : setDisplayEmail('none')
            err == 'The email field must be a valid email address' ? setDisplayValidEmail('block') : setDisplayValidEmail('none');
            err == 'The email has already been taken.' ? setDisplayUnique('block') : setDisplayUnique('none')
            err == 'The password field is required.' || err == 'The name field is required. (and 2 more errors)' || err == 'The email field is required. (and 1 more error)' ? setDisplayPassword('block') : setDisplayPassword('none')
            err == 'Unauthorized' ? setDisplay('block') : setDisplay('none')
        });
        }else{
            axios.post(`http://127.0.0.1:8000/api/Employees/${api}`,{
                email: email.current.value,
                password: password.current.value,
            })
            .then((response) => {
                localStorage.setItem('token',response.data.authorisation.token);
                localStorage.setItem('role',response.data.role)
                navigate('/Dashboard')
                // dispatch(setRole(response.data.role));
            })
            .catch(error => { 
                const err=error.response.data.message;
                err == 'The password field is required.' || err == 'The email field is required. (and 1 more error)' ? setDisplayPassword('block') : setDisplayPassword('none')
                err == 'The email field is required.' || err == 'The email field is required. (and 1 more error)' ? setDisplayEmail('block') : setDisplayEmail('none')
                if(err == 'Unauthorized'){
                    axios.post(`http://127.0.0.1:8000/api/Patients/${api}`,{
                        email: email.current.value,
                        password: password.current.value,
                    })
                    .then((response) => {
                        localStorage.setItem('token',response.data.authorisation.token);
                        localStorage.setItem('role',response.data.role)
                        navigate('/')
                    })
                    .catch(error => { 
                        const err=error.response.data.message;
                        err == 'The password field is required.' || err == 'The email field is required. (and 1 more error)' ? setDisplayPassword('block') : setDisplayPassword('none')
                        err == 'The email field is required.' || err == 'The email field is required. (and 1 more error)' ? setDisplayEmail('block') : setDisplayEmail('none')
                        err == 'Unauthorized' ? setDisplay('block') : setDisplay('none')
                    });
                }
            });
        }
    };
    return(
        <>
        <div className="Authentication">
            <div className='container'>
            <h1>
                {form}
            </h1>
            <h4>
                Please fill in this form to {form === 'Sign up' ? 'create an account' : 'log in'}
            </h4>
            <hr />
                <form method="post">
                    <label htmlFor="user" style={{display:displayNameForm}}>Full Name</label>
                    <input type="text" placeholder="Your Name..." id="user" required ref={name} style={{display:displayNameForm}}/>
                    <p className='error' style={{display:displayName}}>the name field is required</p>
                    <label htmlFor="email"> Email Address </label>
                    <input type="text" id="email" placeholder="Your E-mail..." required ref={email}/>
                    <p className='error' style={{display:displayEmail}}>the email field is required</p>
                    <p className='error' style={{display:displayUnique}}>this email is already registered</p>
                    <p className='error' style={{display:displayValidEmail}}>the email must be a valid email address.</p>
                    <label htmlFor="subject">Password</label>
                    <input type="text" id="subject" placeholder="password..."  required ref={password}/>
                    <p className='error' style={{display:displayPassword}}>the password field is required</p>
                    {form === 'Sign up' ? <span>By creating an account you agree to our <a>Terms & Privacy.</a></span> : <span>By log in in you agree to our <a>Terms & Privacy.</a></span>}
                    <p className='error' style={{display:display}}>email or password are wrong</p>
                    {/* <button type='submit' onClick={(e) => handleSubmit(e)} className="main-button"><Link className='link' to={'/'}>{form}</Link></button> */}
                    <button type='submit' onClick={(e) => handleSubmit(e)} className="main-button">{form}</button>
                    {form === 'Sign up' ? <span>Or if you already have an account <a href='/logIn'>Log in.</a></span> : <span>Or if you don't already have an account <a href='/signUp'>Sign up.</a></span>}
                </form>
            </div>
        </div>
        </>
    )
}
