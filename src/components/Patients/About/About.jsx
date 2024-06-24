import './About.css'
import Navbar from '../Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd, faBuilding, faGears } from "@fortawesome/free-solid-svg-icons"

export default function About(){
    return(
        <>
        <Navbar link={'About'}></Navbar>
        <div className='about'>
            <div className='container'>
                <h1>your safety is our mission</h1>
                <p>
                    To always stay informed about your health,
                    you need to regularly take analyses,
                    and here where our service come:
                    <div className='cards'>
                        <div className='card'>
                            <div className='card-wrapper'>
                            <div className='icon-wrapper'>
                                <FontAwesomeIcon className='icon' icon={faUserMd}></FontAwesomeIcon>
                            </div>
                            <div className='text'>
                                <span>Our doctors are among the elite of the global field</span>
                            </div>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-wrapper'>
                            <div className='icon-wrapper'>
                                <FontAwesomeIcon className='icon' icon={faGears}></FontAwesomeIcon>
                            </div>
                            <div className='text'>
                                <span>Our laboratory is equipped with the latest equipment in the world</span>
                            </div>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-wrapper'>
                            <div className='icon-wrapper'>
                                <FontAwesomeIcon className='icon' icon={faBuilding}></FontAwesomeIcon>
                            </div>
                            <div className='text'>
                                <span>We have branches all over the world</span>
                            </div>
                            </div>
                        </div>
                    </div>
                </p>
            </div>
        </div>
        </>
    )
}