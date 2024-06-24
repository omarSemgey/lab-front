import './Form.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
export default function Form({ page }){
    const [branch,setBranch] = useState({});
    const [displayTitle,setDisplayTitle]= useState('none');
    const [displayDescription,setDisplayDescription]= useState('none');
    const id = useParams();
    useEffect(()=>{
        if(page == 'update'){
            axios.get(`http://127.0.0.1:8000/api/Branches/${id.id}`)
        .then(res => {
            setBranch(res.data.Branch);
        })
    }
},[])

//request refs
const title = useRef();
const description = useRef();
const token=localStorage.getItem('token');
const navigate=useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        if(page == 'create'){
        axios.post(`http://127.0.0.1:8000/api/Branches`,{
            title: title.current.value,
            description:description.current.value,
        },{ headers: { 'Authorization': `Bearer ${token}` } })
        .then((response) => {
            navigate('/Dashboard/Branches')
        })            
        .catch(error => { 
            const err=error.response.data.message;
            err == 'The title field is required.' || err == 'The title field is required. (and 1 more error)' || err == 'The title field must be at least 3 characters' ? setDisplayTitle('block') : setDisplayTitle('none');
            err == 'The description field is required.' || err == 'The title field is required. (and 1 more error)' || err == 'The title field must be at least 3 characters' ? setDisplayDescription('block') : setDisplayDescription('none');
        });
        }else{
            axios.put(`http://127.0.0.1:8000/api/Branches/${id.id}`, {
                title: title.current.value,
                description:description.current.value,
            },{ headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                navigate('/Dashboard/Branches')
            })
            .catch(error => { 
                const err=error.response.data.message;
                err == 'The title field is required.' || err == 'The title field is required. (and 1 more error)' || err == 'The title field must be at least 3 characters' ? setDisplayTitle('block') : setDisplayTitle('none');
                err == 'The description field is required.' || err == 'The title field is required. (and 1 more error)' || err == 'The title field must be at least 3 characters' ? setDisplayDescription('block') : setDisplayDescription('none');
            });
        }
    };
    return(
        <>
            <div className="create-form">
                <div className='container'>
                    <h1>
                        {page == 'create' ? 'Add new' : 'Update'} branches
                    </h1>
                    <h4>
                        Please fill this form to {page == 'create' ? 'Add new' : 'update'} branch
                    </h4>
                    <hr />
                    <form className="form" method="post">
                        <label htmlFor="user">Branch Title</label>
                        <input type="text" placeholder="Branch Title..." required defaultValue={branch.title} ref={title}/>
                        <p className='error' style={{display:displayTitle}}>The title field is required, and must be at least 3 letters</p>
                        <label htmlFor="description"> Branch Description </label>
                        <input type="text" placeholder="Branch description..." required defaultValue={branch.title} ref={description}/>
                        <p className='error' style={{display:displayDescription}}>The description field is required, and must be at least 3 letters</p>
                        {/* <button type='submit' onClick={(e) => handleSubmit(e)} className="main-button"><Link className='link' to={`/Dashboard/Branches/`}>{page}</Link></button> */}
                        <button type='submit' onClick={(e) => handleSubmit(e)} className="main-button">{page}</button>
                    </form>
                </div>
            </div>
        </>
    )
}