import React from 'react'

import "./ItemCard.css"

function ItemCard(props) {
  return (
    <section className='item-card'>
      <img src={props.imageLink} alt={props.name} />
      <h2>{props.name}</h2>
      <p>{props.numOfVotes}</p>

      {props.userData.votedTo?.id===props.id && (
        <button id={props.id} onClick={(e) => props.handleChangeVote(e)}>Change Vote</button>
      )}

      {!props.userData.voted && (
        <button id={props.id} onClick={(e) => props.handleVote(e)}>Vote</button>
      )}
    </section>
  )
}

export default ItemCard