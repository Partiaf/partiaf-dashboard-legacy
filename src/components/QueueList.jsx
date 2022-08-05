import React from "react";

const QueueList = ({ title, type, covers, in_state, coverData}) => {

    console.log("type", covers)
  return (
    <div className="queue-list">
      <h3>{title}</h3>
      <div className="queue-cards">
        {covers?.filter((cover) => cover.state == in_state)
        .map((cover) => (
          <div className={`card-queue ${type}`} key={cover._id}>
            <div className="image-section">
              <img src="/img/userImage.jpeg" alt="" />
              <div>
                <h3>{cover.name}</h3>
                <p>{cover.gender}</p>
              </div>
            </div>

            <div className="event-section">
              <h4>{coverData.name}</h4>
              <p>{coverData.type.toUpperCase()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueueList;
