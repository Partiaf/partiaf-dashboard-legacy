import React from 'react'

const QueueList = ({title, type}) => {
  return (
    <div className="queue-list">
        <h3>{title}</h3>
        <div className="queue-cards">
            <div className={`card-queue ${type}`}>
                <div className='image-section'>
                <img src="/img/userImage.jpeg" alt="" />
                <div>
                    <h3>Juan Velez</h3>
                    <p>Masculino</p>
                </div>
                </div>

                <div className='event-section'>
                    <h4>Gran Evento Masico</h4>
                    <p>GENERAL</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QueueList
