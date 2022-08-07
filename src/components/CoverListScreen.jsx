import React, { useEffect, useState } from "react";
import LoadingBox from "./LoadingBox";
import swal from "sweetalert";
import { deleteStoreCover, updatenStoreCover } from "../actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_COVER_RESET,
  UPDATE_COVER_RESET,
} from "../constants/adminConstants";
import CoverUpdateScreen from "./CoverUpdateScreen";
import { DivisaFormater } from "../utils/DivisaFormater";
import { Link } from "react-router-dom";
import { TimePicker } from "@material-ui/pickers";

export default function CoverListScreen({ loading, covers, state }) {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const [update, setUpdate] = useState(false);
  const [coverSelect, setCoverSelect] = useState({});

  const deleteCover = useSelector((state) => state.deleteCover);
  const { success: successDelete } = deleteCover;

  const updateCover = useSelector((state) => state.updateCover);
  const { success: successUpdate } = updateCover;

  const [openModalUpdate, setOpenModalUpdate] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState(new Date());
  const [price, setPrice] = useState("");
  const [type, setType] = useState("General");
  const [limit, setLimit] = useState("");
  const [image, setImage] = useState("");


  const dispatch = useDispatch();

  const deleteHandler = (cover) => {
    swal("Seguro que quiere borrar " + cover.name + "?", {
      icon: "warning",
      buttons: ["No", "Borrar!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! " + cover.name + " borrado", {
          icon: "success",
        });
        dispatch(
          deleteStoreCover(adminInfo.email, storeInfo._id, cover._id)
        );
      }
    });
  };

  const updateHandler = async (cover) => {
    console.log(cover);
    await setCoverSelect(cover);
    setName(cover.name);
    setDescription(cover.description);
    setDate(cover.date);
    setHour(cover.hour);
    setPrice(cover.price);
    setType(cover.type);
    setLimit(cover.limit);
    await setOpenModalUpdate(true);
    console.log(coverSelect);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatenStoreCover(
        coverSelect._id,
        name,
        type,
        price,
        date,
        limit,
        hour,
        description,
        image
      )
    );
  };

  console.log(name)

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: DELETE_COVER_RESET });
    }
    if (successUpdate) {
      dispatch({ type: UPDATE_COVER_RESET });
      setName("");
      setDescription("");
      setDate("");
      setHour("");
      setPrice("");
      setType("");
      setLimit("");
      setOpenModalUpdate(false);
    }
  }, [dispatch, successUpdate, successDelete]);

  return (
    <>
      {update ? (
        <CoverUpdateScreen cover={coverSelect} />
      ) : (
        <div className="cover__list">
          {loading ? (
            <LoadingBox />
          ) : (
            <>
              {covers.map((cover) => (
                <div className="cover__card" key={cover._id} >
                  <img src="/coverimg.jpg" alt="" />
                  <Link to={`/cover-queue/${cover._id}`} className="cover-content">

                  <div className="card-header">
                    <h4>{cover.name}</h4>   
                 
                                  
                  </div>

                  <div className="cover-middle">
                  <p> {cover.description}</p>
                  <div>
                  <p> <strong>Cupos:</strong> {cover.limit}</p>
                  <p> <strong>Fecha:</strong> {cover.date.substring(0, 10)}</p>
                  <p>  <strong>Hora: </strong> {cover.hour}</p>

                  </div>
                  </div>

                  <div className="cover-footer">
                  <p>{cover.type}</p>

                  <p>{DivisaFormater(cover.price)}</p>

                  
                  {/* <div className="foogler">
             
                  </div> */}
                  </div>

                  </Link>

                  <div className="cover-actions">
                  <button onClick={() => updateHandler(cover)}>
                       <i className="bx bxs-pencil"></i>
                    </button>
                    <button onClick={() => deleteHandler(cover)}>
                      <i className="bx bx-trash"></i>
                    </button>
                  </div>

                </div>
              ))}
            </>
          )}
        </div>
      )}


<div className={openModalUpdate ? "modal active" : "modal"}>
        <div>
          <div className="modal-header">
            <button
              href="/"
              className="back-btn"
              onClick={() => setOpenModalUpdate(false)}
            >
              <img src="./assets/left-back.svg" alt="back" />
              Atras
            </button>
            <h2>Editar entrada o cover</h2>
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
                    <div className="check">
                      <div className="inside"></div>
                    </div>
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
                    <label htmlFor="especial">Especial</label>
                    <div className="check">
                      <div className="inside"></div>
                    </div>
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
              <i className="bx bxs-pencil"></i> Actualizar
            </button>
          </form>

          {/* <input type="file" name="" id="" /> */}
        </div>
      </div>
    </>
  );
}
