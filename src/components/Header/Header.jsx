import React, { useEffect } from 'react'
import "./Header.css"

function Header(props) {

  useEffect(()=>{
    props.getItems();
  }, [])

  console.log(props.isAdmin);
  return (
    <nav id='header' className='flex-col-wrap'>
      <h1 className='logo-text'>PRIME</h1>
      <section className='flex-row-wrap'>

        {props.isAdmin && localStorage.currentPage === "votingPage" && (
          <a href="#" onClick={()=>{props.handleAdminClick()}}>Admin</a>
        )}

        {props.isAdmin && localStorage.currentPage === "adminPage" && (
          <a href="#" onClick={()=>{props.handleVotePageClick()}}>Vote</a>
        )}

        <a href="#" onClick={()=>{props.logOut()}}>Log Out</a>
      </section>
    </nav>
  )
}

export default Header