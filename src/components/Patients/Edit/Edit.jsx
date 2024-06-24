import './Edit.css'
import Navbar from '../Navbar/Navbar'
import Form from '../Form/UsersForm/Form'

export default function Edit(){
    return(
        <>
        <div className='patient'>
        <div className='Edit'>
            <Navbar></Navbar>
            <Form></Form>
        </div>
        </div>
        </>
    )
}