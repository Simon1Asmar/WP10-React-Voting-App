import React from 'react'

import "./ItemCard.css"

function ItemCard(props) {
  return (
    <section className='item-card'>
      <img src={props.imageLink} alt={props.name} />
      <h2>{props.name}</h2>
      <p>{props.numOfVotes}</p>
      <button id={props.id} onClick={(e) => props.handleVote(e)}>Vote</button>
    </section>
  )
}

export default ItemCard