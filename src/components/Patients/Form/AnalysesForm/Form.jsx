import './Form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import GetId from '../../../../hooks/GetId'
import axios from 'axios';

export default function Form(){
    const [id,setId]=useState(0);
    const [analyze,setAnalyze] = useState({});
    const [branch,setBranch] = useState({});
    const [doctor,setDoctor] = useState({});
    const [displayTitle,setDisplayTitle]= useState('none');
    const [displayContent,setDisplayContent]= useState('none');
    useEffect(()=>{
            axios.get('http://127.0.0.1:8000/api/Branches')
            .then(res => {
                setBranch(res.data.branch)
            })
            axios.get('http://127.0.0.1:8000/api/Employees')
            .then(res => {
                setDoctor(res.data.employees)
            })
        },[])
    //request refs
    const title= useRef();
    const doctors_id= useRef();
    const branches_id= useRef();
    const image= useRef();
    const token=localStorage.getItem('token');
    const navigate =useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/Analyses", {
            title: title.current.value,
            content: image.current.files[0],
            status:0,
            patients_id: id,
            employees_id: doctors_id.current.value,
            branches_id: branches_id.current.value,
        },{ headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        } })
        .then((response) => {
            navigate('/')
            console.log(response)
        })            
        .catch(error => { 
            const err=error.response.data.message;
            err == 'The title field is required.' || err == 'The title field is required. (and 1 more error)' || err == 'The title field must be at least 3 characters' ? setDisplayTitle('block') : setDisplayTitle('none');
            err == 'The content field is required.' || err == 'The content field must be an image. (and 3 more errors)' || err == 'The title field is required. (and 1 more error)' || err == 'The content field must be a file of type: png, jpg, jpeg.' ? setDisplayContent('block') : setDisplayContent('none');           
            err == 'content is not appropriate.' ? setDisplayContent('block') : setDisplayContent('none')
            });
    }
    return(
        <>
        <GetId setId={setId}></GetId>
            <div className="analyze-form">
                <div className='container'>
                <h1>
                    Add new Analyze
                </h1>
                <h4>
                    Please fill in this form to Add new Analyze
                </h4>
                <hr />
                <form method="post">
                    {/* class upload error for any error that could occur during upload */}
                    <label htmlFor="user">Full Name</label>
                    <input type="text" placeholder="Analyze title" required defaultValue={analyze.title} ref={title}/>
                    <p className='error' style={{display:displayTitle}}>The title field is required, and must be at least 3 letters</p>
                    <div className='image-upload'>
                        <label htmlFor="image">
                            <FontAwesomeIcon className='upload-icon' icon={faUpload}></FontAwesomeIcon>
                            <div className='upload-error-result'>
                                <p >Error occurred, please <span>try again</span></p>
                            </div>
                            <div className='upload-text'>
                                <p>Drop your image here, or <span className='browse'>browse</span></p>
                                <span className='support'>png,jpg,jpeg</span>
                            </div>
                            </label>
                        <input className='upload-button' id='image' type="file" ref={image}/>
                    </div>
                    <p className='error' style={{display:displayContent}}>The image is required</p>
                    <label htmlFor='doctor'>Doctor</label>
                    <select id='doctor' className='select' ref={doctors_id}>
                        {
                            Array.from(doctor).map((doctor,index)=>{
                                return(
                                    <option key={index} value={doctor.id}>{doctor.name}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor='branch'>Branch</label>
                    <select id='branch' className='select' ref={branches_id} >
                        {
                            Array.from(branch).map((branch,index)=>{
                                return(
                                    <option key={index} value={branch.id}>{branch.title}</option>
                                )
                            })
                        }
                    </select>
                    {/* <button type='submit' onClick={(e) => handleSubmit(e)} className="main-button"><Link className='link' to={"/"}>create</Link></button> */}
                    <button type='submit' onClick={(e) => handleSubmit(e)} className="main-button">Create</button>
                </form>
                </div>
            </div>
        </>
    )
}