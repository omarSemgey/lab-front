import { useEffect } from "react";
import axios from 'axios';

export default function GetRole({setId}){
    useEffect(()=>{
        const token=localStorage.getItem('token');
        axios.post(`http://127.0.0.1:8000/api/role`,[],{ headers: { 'Authorization': `Bearer ${token}` } })
        .then((response) => {
                setId(response.data.id)
        });
        
    },[])
}