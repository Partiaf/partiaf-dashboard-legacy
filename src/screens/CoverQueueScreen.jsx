import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import coverActions from "../actions/coverActions";
import QueueList from "../components/QueueList";
import CoverScreen from "./CoverScreen";

export default function CoverQueueScreen(props) {
  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const coverList = useSelector((state) => state.coverList);
  const { loading: loadingList, data: covers } = coverList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (storeInfo) {
      dispatch(coverActions.list(storeInfo._id));
    }
  }, [dispatch, storeInfo]);

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
                <QueueList title="En cola" type="" />
                <QueueList
                  title="Aprobados"
                  type="success"
                  covers={covers[0].peoples}
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
