import React from "react";

const QueueList = ({ title, type, covers }) => {

    console.log(covers)
  return (
    <div className="queue-list">
      <h3>{title}</h3>
      <div className="queue-cards">
        {covers?.map((cover) => (
          <div className={`card-queue ${type}`} key={cover._id}>
            <div className="image-section">
              <img src="/img/userImage.jpeg" alt="" />
              <div>
                <h3>{cover.name}</h3>
                <p>{cover.gender}</p>
              </div>
            </div>

            <div className="event-section">
              <h4>Gran Evento Masico</h4>
              <p>GENERAL</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueueList;
