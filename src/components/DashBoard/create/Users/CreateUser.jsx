import './CreateUser.css'
import Form from '../../Form/UsersForm/Form'
import { Link } from 'react-router-dom'
export default function CreateUser({page}){
    return(
        <>
        <div className='create'>
            <div className='container'>
                <div className='page-header'>
                    <Link to='/Dashboard'>DASHBOARD</Link>
                    <span className='slash'>/</span>
                    <span>{page}</span>
                    <span className='slash'>/</span>
                    <span>create</span>
                </div>
                <Form page={'create'} type={page}></Form>
            </div>
        </div>
        </>
    )
}