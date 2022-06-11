import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatenStoreCover } from "../actions/adminActions";
import { UPDATE_COVER_RESET } from "../constants/adminConstants";

export default function CoverUpdateScreen(cover) {
  console.log(cover);
  const [name, setName] = useState(cover.cover.name);
  const [description, setDescription] = useState(cover.cover.description);
  const [date, setDate] = useState(cover.cover.date);
  const [hour, setHour] = useState(cover.cover.hour);
  const [price, setPrice] = useState(cover.cover.price);
  const [type, setType] = useState(cover.cover.type);
  const [totalLimit, setTotalLimit] = useState(cover.cover.totalLimit);

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const updateCover = useSelector((state) => state.updateCover);
  const { success: successUpdate } = updateCover;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatenStoreCover(
        adminInfo.email,
        storeInfo._id,
        cover.cover._id,
        type,
        date,
        hour,
        price,
        description,
        totalLimit,
        name
      )
    );
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_COVER_RESET });
      setName("");
      setDescription("");
      setDate("");
      setHour("");
      setPrice("");
      setType("");
      setTotalLimit("");
    }
  }, [dispatch, successUpdate, cover]);

  return (
    <div className="state up-screen">
      <div className="state__header">
        <h2>Entrada o Cover</h2>
        <button onClick={submitHandler}>
          <i className="bx bxs-pencil"></i> Guardar
        </button>
      </div>
      <div>
        <div className="item item-flex w-100 up">
          <h3>TIPO DE EVENTO</h3>
          <input
            type="text"
            name=""
            id=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="event-fields">
          <div className="left"></div>
          <div className="w-70">
            <div className="w-50">
              <div className="item item-flex w-100">
                <h3>Precio</h3>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="item item-flex w-100">
                <h3>Cupo total</h3>
                <input
                  type="number"
                  value={totalLimit}
                  onChange={(e) => setTotalLimit(e.target.value)}
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
        <div className="option">
          <div className="form-group">
            <input
              type="radio"
              name="type"
              id="general"
              value="General"
              onChange={(e) => setType(e.target.value)}
              required
              checked
            />
            <label htmlFor="general">General</label>
          </div>
          <div className="form-group">
            <input
              type="radio"
              name="type"
              id="especial"
              value="Especial"
              onChange={(e) => setType(e.target.value)}
              required
            />
            <label htmlFor="especial">Especial</label>
          </div>
        </div>
        <h4>Descripcion de reserva:</h4>
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
