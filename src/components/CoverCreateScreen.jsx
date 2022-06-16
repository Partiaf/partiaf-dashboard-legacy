import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStoreCover } from "../actions/adminActions";
import coverActions from "../actions/coverActions";
import { STORE_COVER_RESET } from "../constants/adminConstants";
import { TimePicker } from "@material-ui/pickers";
import swal from "sweetalert";

export default function CoverCreateScreen(setModal=false) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState(new Date());
  const [price, setPrice] = useState("");
  const [type, setType] = useState("General");
  const [limit, setLimit] = useState("");

  const [openModal, setOpenModal] = useState("");


  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const coverCreate = useSelector((state) => state.coverCreate);
  const { success: successCreate } = coverCreate;

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
    } else if (limit.length <= 0) {
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
        coverActions.create({
          store: storeInfo._id,
          type,
          date,
          hout: hour.toLocaleTimeString(),
          price,
          description,
          limit,
          name,
        })
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
      setLimit("");
    }
    setOpenModal(setModal)

  }, [dispatch, successCreate]);

  return (
    <div className={openModal? "modal active" : "modal"}>
      <div>
        <div className="modal-header">
          <button
            href="/"
            className="back-btn"
            onClick={() => setOpenModal(false)}
          >
            <img src="./assets/left-back.svg" alt="back" />
            Atras
          </button>
          <h2>Crear entrada o cover</h2>
          
        </div>
        <form>
          <input
            type="text"
            name=""
            id=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del evento"
            required
          />
               <input
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    placeholder="Cupo total"
                  />

<input
                    type="text"
                    inputMode="numeric"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Precio"
                  />

<input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Fecha"
                    required
                  />


          <div className="event-fields">
            {/* <div className="left"></div> */}
            <div className="second-modal-container">
            <TimePicker value={hour} onChange={setHour} />

              <ul className="cover-type-list">
                <li>
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
              <div className="check"><div className="inside"></div></div>

                </li>

                <li>
                <input
                type="radio"
                name="type"
                id="especial"
                value="Especial"
                onChange={(e) => setType(e.target.value)}
                required
              />
              <label htmlFor="Especial">Especial</label>
              <div className="check"><div className="inside"></div></div>
                </li>
              </ul>
            </div>
          </div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripcion"
          ></textarea>
           <button onClick={submitHandler}>
          <i className="bx bxs-pencil"></i> Guardar
        </button> 
        </form>
        
       
        {/* <input type="file" name="" id="" /> */}
      </div>
    </div>
  );
}
