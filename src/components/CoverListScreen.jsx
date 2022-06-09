import React, { useEffect, useState } from "react";
import LoadingBox from "./LoadingBox";
import swal from "sweetalert";
import { deleteStoreCover } from "../actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_COVER_RESET,
  UPDATE_COVER_RESET,
} from "../constants/adminConstants";
import CoverUpdateScreen from "./CoverUpdateScreen";
import { DivisaFormater } from "../utils/DivisaFormater";

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
          deleteStoreCover(adminInfo.email, storeInfo.store._id, cover._id)
        );
      }
    });
  };

  const updateHandler = async (cover) => {
    console.log(cover);
    await setCoverSelect(cover);
    await setUpdate(true);
    console.log(coverSelect);
  };

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: DELETE_COVER_RESET });
    }

    if (successUpdate) {
      dispatch({ type: UPDATE_COVER_RESET });
      setUpdate(false);
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
                <div className="cover__card">
                  <div className="card-header">
                    <p>
                      {" "}
                      Estado del cover :{" "}
                      {state == true ? "Activa" : "Finalizada"}{" "}
                    </p>
                  </div>
                  <h4>Tipo: {cover.name}</h4>
                  <p>{cover.type}</p>
                  <p>Precio: {DivisaFormater(cover.price)}</p>
                  <p>Fecha: {cover.date}</p>
                  <p>Cupos: {cover.totalLimit}</p>
                  <p>Hora: {cover.hour}</p>
                  <p>Descripcion: {cover.description}</p>
                  <div className="foogler">
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
    </>
  );
}
