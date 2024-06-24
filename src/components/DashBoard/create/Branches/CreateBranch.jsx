import './CreateBranch.css'
import Form from '../../Form/BranchesForm/Form'
import { Link } from 'react-router-dom'
export default function CreateBranch(){
    return(
        <>
        <div className='create'>
            <div className='container'>
                <div className='page-header'>
                    <Link to='/Dashboard'>DASHBOARD</Link>
                    <span className='slash'>/</span>
                    <span>branches</span>
                    <span className='slash'>/</span>
                    <span>create</span>
                </div>
                <Form page={'create'}></Form>
            </div>
        </div>
        </>
    )
}