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
          deleteStoreCover(adminInfo.email, storeInfo._id, cover._id)
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
                <div className="cover__card" key={cover._id} >
                  <img src="/coverimg.jpg" alt="" />
                  <div className="cover-content">

                  <div className="card-header">
                    <h4>{cover.name}</h4>   
                    <button onClick={() => updateHandler(cover)}>
                      Editar <i className="bx bxs-pencil"></i>
                    </button>
                                  
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

                  <button onClick={() => deleteHandler(cover)}>
                      <i className="bx bx-trash"></i>
                    </button>
                  {/* <div className="foogler">
             
                  </div> */}
                  </div>

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
