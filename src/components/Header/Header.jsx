import React from 'react'
import '../Header/Header.css'
import { Link } from 'react-router-dom'
import {FaEthereum} from 'react-icons/fa'
function Header() {
  return (
    <div className='Navbar'>
        <div className="logo">
            <h1>CrptoVerse</h1>
            <FaEthereum color='orange' size={'25'} />
        </div>
        <ul>
            <li><Link to='/' >Home</Link></li>
            <li><Link to = '/coins' >Coins</Link></li>
            
        </ul>
    </div>
  )
}

export default Header