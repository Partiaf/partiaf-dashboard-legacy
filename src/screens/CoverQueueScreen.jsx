import React, { useEffect, useState } from "react";
import QueueList from "../components/QueueList";

export default function CoverQueueScreen(props) {
  return (
    <>
      <div className="screen">
        <div className="center__screen">
          <div className="screen-header-principal">
            <div className="box">
              <h3>Total Entradas</h3>
              <p>0</p>
            </div>
            <div className="box">
              <h3>Entradas Efectivas</h3>
              <p>0</p>
            </div>
            <div className="box">
              <h3>Entradas no Efectivas </h3>
              <p>0</p>
            </div>
          </div>
          <div className="queue-steps">

          <QueueList title="En cola" type="" />
          <QueueList title="Aprobados" type="success" />
          <QueueList title="Recazhados" type="denied" />
          </div>

        </div>
      </div>

     
    </>
  );
}
