import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoverCreateScreen from "../components/CoverCreateScreen";
import { listCovers } from "../actions/adminActions";
import CoverListScreen from "../components/CoverListScreen";
import {
  DELETE_COVER_RESET,
  STORE_COVER_RESET,
  UPDATE_COVER_RESET,
} from "../constants/adminConstants";
import LoadingBox from "../components/LoadingBox";

export default function CoverScreen(props) {
  const [thatScreen, setThatScreen] = useState("Create");

  /*
  // < ------- LOCAL DATES ------------>
  const setItem = (id) => {
    data.bookings
      .filter((booking) => booking.id == id)
      .map((booking) => {
        setName(booking.name);
        setNote(booking.note);
        setDate(booking.date);
      });
  };
  */

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const coversList = useSelector((state) => state.coversList);
  const { loading: loadingList, covers } = coversList;

  const createCover = useSelector((state) => state.createCover);
  const { success: successCreate } = createCover;

  const deleteCover = useSelector((state) => state.deleteCover);
  const { success: successDelete } = deleteCover;

  const updateCover = useSelector((state) => state.updateCover);
  const { success: successUpdate } = updateCover;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: STORE_COVER_RESET });
      setThatScreen("List");
    }
    if (successDelete) {
      dispatch({ type: DELETE_COVER_RESET });
      setThatScreen("List");
    }

    if (successUpdate) {
      dispatch({ type: UPDATE_COVER_RESET });
      setThatScreen("List");
    }

    if (storeInfo) {
      dispatch(listCovers(adminInfo.email, storeInfo.store._id));
    }
  }, [
    dispatch,
    adminInfo,
    storeInfo,
    successCreate,
    successDelete,
    successUpdate,
  ]);

  return (
    <div className="screen">
      <div className="center__screen">
        <div className="flex flexm border">
          <div className="box">
            <h3>Total Entradas</h3>
            {loadingList ? <LoadingBox /> : <p>{storeInfo.store.totalLimit}</p>}
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
        {thatScreen === "List" ? (
          <button
            className="btn-create"
            onClick={() => setThatScreen("Create")}
          >
            {" "}
            CREAR ENTRADA
          </button>
        ) : (
          <button className="btn-create" onClick={() => setThatScreen("List")}>
            {" "}
            LISTA DE ENTRADAS
          </button>
        )}

        {thatScreen === "List" ? (
          <CoverListScreen loading={loadingList} covers={covers} />
        ) : (
          <CoverCreateScreen />
        )}
      </div>
      <div className="right__screen">
        <div className="card__title">
          <h4>Covers Stream</h4>
        </div>
        {/* {data.bookings.map((booking) => (
          <button className="button__none" onClick={() => setItem(booking.id)}>
            <CardBooking
              key={booking.id}
              name={booking.name}
              number={booking.number}
            />
          </button>
        ))} */}
      </div>
    </div>
  );
}
