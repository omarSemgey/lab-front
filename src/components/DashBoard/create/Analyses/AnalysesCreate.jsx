import './AnalysesCreate.css'
import { Link } from 'react-router-dom'
import Form from '../../Form/AnalysesForm/Form'
export default function AnalysesCreate(){

    return(
        <>
        <div className='analyses-create'>
            <div className='container'>
                <div className='page-header'>
                    <Link to='/Dashboard'>DASHBOARD</Link>
                    <span className='slash'>/</span>
                    <span>analyses</span>
                    <span className='slash'>/</span>
                    <span>create</span>
                </div>
                <Form page={'create'}></Form>
            </div>
        </div>
        </>
    )
}