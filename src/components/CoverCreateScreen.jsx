import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStoreCover } from "../actions/adminActions";
import { STORE_COVER_RESET } from "../constants/adminConstants";
import { TimePicker } from "@material-ui/pickers";
import swal from "sweetalert";

export default function CoverCreateScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("General");
  const [totalLimit, setTotalLimit] = useState("");

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const createCover = useSelector((state) => state.createCover);
  const { success: successCreate } = createCover;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (name.length <= 0) {
      swal("El campo Tipo de evento no puede estar vacio", {
        icon: "warning",
      });
      return;
    } else if (description.length <= 0) {
      swal("El campo Descripcion no puede estar vacio", {
        icon: "warning",
      });
      return;
    } else if (price.length <= 0) {
      swal("El campo Precio no puede estar vacio", {
        icon: "warning",
      });
      return;
    } else if (totalLimit.length <= 0) {
      swal("El campo Cupo total no puede estar vacio", {
        icon: "warning",
      });
      return;
    } else if (date.length <= 0) {
      swal("El campo Fecha no puede estar vacio", {
        icon: "warning",
      });
      return;
    } else {
      dispatch(
        createStoreCover(
          adminInfo.email,
          storeInfo._id,
          type,
          date,
          hour.toLocaleTimeString(),
          price,
          description,
          totalLimit,
          name
        )
      );
    }
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: STORE_COVER_RESET });
      setName("");
      setDescription("");
      setPrice("");
      setType("");
      setTotalLimit("");
    }
  }, [dispatch, successCreate]);

  return (
    <div className="state">
      <div className="state__header">
        <h2>Entrada o Cover</h2>
        <button onClick={submitHandler}>
          <i className="bx bxs-pencil"></i> Guardar
        </button>
      </div>
      <div>
        <div className="item w-100 up">
          <h3>Tipo de evento</h3>
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
          {/* <div className="left"></div> */}
          <div className="w-70">
            <div className="w-50">
              <div className="item item-flex w-100">
                <h3>Cupo total</h3>
                <input
                  type="number"
                  value={totalLimit}
                  onChange={(e) => setTotalLimit(e.target.value)}
                />
              </div>
              <div className="item item-flex w-100">
                <h3>Precio</h3>
                <input
                  type="text"
                  inputMode="numeric"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="item item-flex w-100">
                <h3>Fecha</h3>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="componentsDate">
                <h3>Hora</h3>
                <div className="cc1">
                  <TimePicker value={hour} onChange={setHour} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="screfooter">
        <div className="option border">
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

      <input type="file" name="" id="" />
    </div>
  );
}
