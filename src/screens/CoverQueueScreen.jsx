import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import coverActions, { getCover } from "../actions/coverActions";
import QueueList from "../components/QueueList";
import CoverScreen from "./CoverScreen";

export default function CoverQueueScreen(props) {
  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const oneCover = useSelector((state) => state.oneCover);
  const { loading: loadingList, cover} = oneCover;

  const {id} = useParams();

  console.log(loadingList)
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getCover(id));
  }, [dispatch, storeInfo]);

  console.log(cover)

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
            {!loadingList && (
              <>
                <QueueList 
                  title="En cola" 
                  type="in-list" 
                  in_state="in-list" 
                  covers={cover.peoples} 
                  coverData={cover}/>
                <QueueList
                  title="Aprobados"
                  type="success"
                  in_state="accepted"
                  covers={cover.peoples}
                  coverData={cover}
                />
                <QueueList title="Recazhados" type="denied" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
