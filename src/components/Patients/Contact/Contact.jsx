import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../Navbar/Navbar'
import './Contact.css'
import {  faMap, faMessage } from '@fortawesome/free-regular-svg-icons'
import {  faMapPin, faPhone } from '@fortawesome/free-solid-svg-icons'
export default function Contact(){
    return(
        
        <div className='contact'>
        <Navbar link={'Contact'}></Navbar>
        <div className='container'>
            
        <div className='header'>
        <h1>GET IN TOUCH</h1>
        </div>
        <div className='cards'>

        <div className='card'>
        <div className='card-wrapper'>
            <div className='icon-wrapper'>
            <FontAwesomeIcon className='icon' icon={faMap}></FontAwesomeIcon>
            </div>
            <h3>Address</h3>
            <p>lab address</p>
        </div>
        </div>
        <div className='card'>
        <div className='card-wrapper'>
        <div className='icon-wrapper'>
            <FontAwesomeIcon className='icon' icon={faPhone}></FontAwesomeIcon>
            </div>           
            <h3>Phone</h3>
            <p>096794112</p>
        </div>
        </div>

        <div className='card'>
        <div className='card-wrapper'>
            <div className='icon-wrapper'>
            <FontAwesomeIcon className='icon' icon={faMapPin}></FontAwesomeIcon>
            </div>
            <h3>email</h3>
            <p>lab@gmail.com</p>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}