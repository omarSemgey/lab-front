import axios from 'axios';

export default function UseAuth(){
        const token=localStorage.getItem('token');
        if(token !== null){
            axios.post(`http://127.0.0.1:8000/api/role`,[],{ headers: { 'Authorization': `Bearer ${token}` } })
            .then((response) => {
                localStorage.setItem('role',response.data.role)
            });
        }
}