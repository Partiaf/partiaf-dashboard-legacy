import React, { useEffect, useState } from "react";
import LoadingBox from "./LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_COVER_RESET,
  UPDATE_COVER_RESET,
} from "../constants/adminConstants";
import CoverUpdateScreen from "./CoverUpdateScreen";
import CardBookin from "./CardBookin";
import swal from "sweetalert";
import { deleteBooking } from "../actions/bookingActions";

export default function BookingListScreen({ loading, bookings }) {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const [update, setUpdate] = useState(false);
  const [bookingSelect, setBookingSelect] = useState({});

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
          deleteBooking(adminInfo.email, storeInfo._id, cover._id)
        );
      }
    });
  };

  const updateHandler = async (cover) => {
    console.log(cover);
    await setBookingSelect(cover);
    await setUpdate(true);
    console.log(bookingSelect);
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
        <CoverUpdateScreen cover={bookingSelect} />
      ) : (
        <div className="cover__list">
          {loading ? (
            <LoadingBox />
          ) : (
            <>
              {bookings === undefined ? (
                <h2>NO HAY RESERVAS</h2>
              ) : (
                <>
                  {bookings.map((booking) => (
                    // <CardBookin
                    //   name={booking.info}
                    //   cupos={booking.cupo}
                    //   time={booking.hour}
                    //   date={booking.date}
                    //   state={booking.state}
                    // />
                    <div className="card card-new">
                      <div className="card-header">
                        <p>
                          {" "}
                          Estado de reserva:{" "}
                          {booking.state === true
                            ? "Activa"
                            : "Finalizada"}{" "}
                        </p>
                      </div>
                      <div>
                        INFO
                        <h2>{booking.type}</h2>
                      </div>
                      <ul>
                        <li>Cupos: {booking.peoples}</li>
                        <li>Hora: {booking.hour}</li>
                        <li>Fecha: {booking.day}</li>
                      </ul>

                      <div className="icons-cardBooking">
                        {/* <button onClick={() => updateHandler()}>
                          <i className="bx bxs-pencil"></i>
                        </button>
                        <button onClick={() => deleteHandler(booking)}>
                          <i className="bx bx-trash"></i>
                        </button> */}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
