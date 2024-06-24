import './Create.css'
import Navbar from '../Navbar/Navbar'
import Form from '../Form/AnalysesForm/Form'

export default function Create(){
    return(
        <>
        <div className='patient'>
        <div className='create'>
            <Navbar></Navbar>
            <Form></Form>
        </div>
        </div>
        </>
    )
}