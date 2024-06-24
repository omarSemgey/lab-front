import './Error'
import { Link } from 'react-router-dom'

export default function Error(){
    return(
        <>
        <div className='error'>
            <h1>404</h1>
            <p>page not found</p>
            <Link to={'/'} className='link'>go back to home page</Link>
        </div>
        </>
    )
}