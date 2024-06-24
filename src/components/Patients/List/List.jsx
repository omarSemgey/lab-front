import { Link } from 'react-router-dom'
import './List.css'
import { useEffect,useState } from 'react'
import GetId from '../../../hooks/GetId'
import axios from 'axios';

export default function List(){
    const [id,setId]=useState(0);
    const [analyses,setAnalyses]=useState({});
    useEffect(()=>{
        if( id != 0 ){
            axios.get(`http://127.0.0.1:8000/api/Patients/${id}`)
            .then(res => {
                setAnalyses(res.data.patient.analyses)
            })
        }
    },[id])
    return(
        <div className='list'>
        <GetId setId={setId}></GetId>
            <div className='container'>
            <div className='header'>
                <p>your analyses:</p>
                <div className='add'>
                    <Link className='new' to={`/analyses/create`}>add new</Link>
                </div>
            </div>
            <div className='cards'>
                {
                    analyses.length == 0
                    ? (
                        <div className="empty">
                            <p>you have no analyses at the moment, <Link className='span' to={`/analyses/create`}>try to make one!</Link></p>
                        </div>
                    ) : (
                        Array.from(analyses).map((e,index)=>{
                            return(
                                <div className='card' key={index}>
                                    <Link to={`/analyses/${e.id}`} className='img'>
                                    <div className='status'>
                                    <span className={e.status == 0 ? 'ongoing' : 'done'}>
                                        {e.status == 0 ? 'ongoing' : 'done'}
                                    </span>
                                    </div>
                                        <img src={e.content} ></img>
                                    </Link>
                                    <div className='text'>
                                        <p>
                                            {e.title}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
        </div>
    )
}