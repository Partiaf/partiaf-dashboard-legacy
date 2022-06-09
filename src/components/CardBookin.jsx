import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_BOOKING_RESET } from "../constants/bookingConstants";

export default function CardBookin({ name, state, cupos, time, date }) {
  const dispatch = useDispatch();

  const [update, setUpdate] = useState(false);
  const [bookingSelect, setBookingSelect] = useState({});

  const bookingUpdate = useSelector((state) => state.bookingUpdate);
  const { success } = bookingUpdate;

  const updateHandler = async (booking) => {
    await setBookingSelect(booking);
    await setUpdate(true);
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: UPDATE_BOOKING_RESET });
      setUpdate(false);
    }
  }, [dispatch, success]);

  return (
    <div className="card card-new">
      <div className="card-header">
        <p> Estado de reserva: {state === true ? "Activa" : "Finalizada"} </p>
      </div>
      <div>
        INFO
        <h2>{name}</h2>
      </div>
      <ul>
        <li>Cupos: {cupos}</li>
        <li>Hora: {time}</li>
        <li>Fecha: {date}</li>
      </ul>

      <div className="icons-cardBooking">
        <button onClick={() => updateHandler()}>
          <i className="bx bxs-pencil"></i>
        </button>
        <button>
          <i className="bx bx-trash"></i>
        </button>
      </div>
    </div>
  );
}
