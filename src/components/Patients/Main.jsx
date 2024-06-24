import './Main.css'
import Navbar from './Navbar/Navbar'
import List from './List/List'
export default function Home(){
    return(
        <div className='patients'>
        <Navbar link={'Home'}></Navbar>
        <List></List>
        </div>
    )
}