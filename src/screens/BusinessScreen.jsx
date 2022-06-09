import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listStores, signinStore, signout } from "../actions/adminActions";
import LoadingBox from "../components/LoadingBox";
import "../styles/bussines.css";

export default function BusinessScreen(props) {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const [openModal, setOpenModal] = useState(false);
  const [barSelected, setBarSelected] = useState([]);

  const storeList = useSelector((state) => state.storeList);
  const { loading, stores } = storeList;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo, error: errorSignin } = storeSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };
  useEffect(() => {
    dispatch(listStores(adminInfo.email));
  }, [dispatch, adminInfo]);

  const selectBar = (store) => {
    setOpenModal(true);
    setBarSelected(store);
  };

  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("entro");
    dispatch(signinStore(adminInfo.email, barSelected._id, password));
    if (storeInfo) {
      props.history.push("/home");
    }
  };

  if (!loading) {
    console.log(stores);
  }
  return (
    <>
      <div className="container-welcome">
        <div className="welcome-card">
          <div className="container-logo">
            <img src="./assets/logo-partiaf.svg" alt="logo" />

            <button className="gray-btn" onClick={signoutHandler}>
              <img src="/assets/logout.svg" alt="log" />
              Cerrar sesion
            </button>
          </div>

          <div className="info-welcome">
            <h1>¡Bienvenido!</h1>
            <img src={adminInfo.image} alt="" />
            <p>
              {" "}
              {adminInfo.name} {adminInfo.lastname}
            </p>
            <span>Por favor selecciona tu negocio</span>
            <div className="container-btn">
              <Link to="/store" className="black-btn">
                Añadir negocio
              </Link>
            </div>
            {loading ? (
              <LoadingBox />
            ) : (
              <>
                {stores ? (
                  <div className="stores-list">
                    {stores.map((store) => (
                      <button
                        onClick={() => selectBar(store)}
                        key={store._id}
                        className="store-link"
                      >
                        {store.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <h3>No hay Negocios</h3>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className={openModal ? "modalStore active" : "modalStore"}>
        <div>
          {barSelected ? (
            <span>{errorSignin ? errorSignin : barSelected.name}</span>
          ) : (
            <h2>NO BAR</h2>
          )}

          {/* <form onSubmit={submitHandler} className="form-store"> */}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese la contrasena del negocio"
          />
          <button onClick={submitHandler}>Continuar</button>
          <button className="btn-none" onClick={() => setOpenModal(false)}>
            Atras
          </button>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}
