import React, { useEffect } from 'react'
import "./VotingPage.css"


function VotingPage(props) {

  return (
    <section className='flex-row-wrap voting-page'>
      {props.children}
    </section>
  )
}

export default VotingPage