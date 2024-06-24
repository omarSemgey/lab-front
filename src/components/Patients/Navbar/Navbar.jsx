import { useEffect } from "react";
import './Navbar.css'
import { Link } from "react-router-dom";
export default function Navbar({link}) {
    const links= document.getElementsByClassName('nav-link');
    useEffect(() => {
        Array.prototype.forEach.call(links, (e) => {
            if(e.id === link){
                e.classList.add('on')
                return;
            }
        })
        },[]);
    function handleMenu(){
        const menu=document.getElementsByClassName('menu')[0];
        const navLinks=document.getElementsByClassName('nav-links')[0];
        if(menu.classList.contains('checked')){
            menu.classList.remove('checked');
            navLinks.classList.remove('nav-active');
        }else{
            menu.classList.add('checked');
            navLinks.classList.add('nav-active');
        }
    }
    // window.onscroll = function() {sticky()};
    // function sticky(){
    //     const navbar = document.getElementsByClassName("navbar")[0];
    // if (window.pageYOffset > navbar.offsetTop) {
    //     navbar.classList.add("sticky");
    // } else {
    //     navbar.classList.remove("sticky");
    // }
    // }
        return (
        <>
        <div className="navbar">
            <a href="#" className="logo"><h1>Lab</h1></a>
        <ul className="nav-links">
            <li>
                <Link id="Home" to={"/"} className="nav-link">
                    Home
                </Link>
            </li>
            <li>
                <Link id="Profile" to={"/profile"} className="nav-link">
                    Profile
                </Link>
            </li>
            <li>
                <Link id="About" to={"/about"} className="nav-link">
                    About us
                </Link>
            </li>
            <li>
                <Link id="Contact" to={"/contact"} className="nav-link">
                    Contact Us
                </Link>
            </li>
        </ul>
        <div className="drop-down" onClick={handleMenu}>
            <span className="menu">menu</span>
        </div>
        </div>
        </>
    )
}