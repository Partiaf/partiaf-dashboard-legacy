import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../actions/bookingActions";
import { CREATE_BOOKING_RESET } from "../constants/bookingConstants";

export default function BookingCreateScreen() {
  const [info, setInfo] = useState("");
  const [cupo, setCupo] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [description, setDescription] = useState("");

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const bookingCreate = useSelector((state) => state.bookingCreate);
  const { success: successCreate } = bookingCreate;

  // LOGICAL
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createBooking(
        adminInfo.email,
        storeInfo.store._id,
        info,
        cupo,
        date,
        hour,
        description
      )
    );
  };

  useEffect(() => {
    if (successCreate) {
      console.log("ENTROOO");
      dispatch({ type: CREATE_BOOKING_RESET });
      setInfo("");
      setCupo("");
      setDate("");
      setHour("");
      setDescription("");
    }
  }, [dispatch, successCreate]);

  return (
    <div className="state">
      <div className="state__header">
        <h2>Reserva</h2>
        <button onClick={submitHandler}>
          <i className="bx bxs-pencil"></i> Guardar
        </button>
      </div>
      <div>
        <div className="item item-flex w-100 up">
          <h3>INFO</h3>
          <input
            type="text"
            name=""
            id=""
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            required
          />
        </div>
        <div className="event-fields">
          <div className="left"></div>
          <div className="w-70">
            <div className="w-50">
              <div className="item item-flex w-100">
                <h3>Cupos</h3>
                <input
                  type="number"
                  value={cupo}
                  onChange={(e) => setCupo(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="w-50">
              <div className="item item-flex w-100">
                <h3>Fecha</h3>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="item item-flex w-100">
                <h3>Hora</h3>
                <input
                  type="text"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="screfooter">
        <h4>Descripcion:</h4>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
