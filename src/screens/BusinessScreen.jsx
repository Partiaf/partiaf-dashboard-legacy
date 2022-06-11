import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listStores, signinStore, signout } from "../actions/adminActions";
import storeActions from "../actions/storeActions";
import LoadingBox from "../components/LoadingBox";
import "../styles/bussines.css";

export default function BusinessScreen(props) {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const [openModal, setOpenModal] = useState(false);
  const [barSelected, setBarSelected] = useState([]);

  const storeList = useSelector((state) => state.storeList);
  const { loading, data: stores } = storeList;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo, error: errorSignin } = storeSignin;

  const adminActiveEmail = useSelector((state) => state.adminActiveEmail);
  const { adminInfo: activeAdminInfo } = adminActiveEmail;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };
  useEffect(() => {
    dispatch(storeActions.list(adminInfo._id));
  }, [dispatch, adminInfo]);

  const selectBar = (store) => {
    setOpenModal(true);
    setBarSelected(store);
  };

  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signinStore(barSelected._id, password));
    if (storeInfo) {
      props.history.push("/home");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (adminActiveEmail) {
      if (adminActiveEmail.status === "active") {
        navigate("/");
      }
    }

    if (adminInfo && !activeAdminInfo) {
      if (adminInfo.status === "inactive") {
        navigate("/verification");
      }
    }
  }, [navigate, activeAdminInfo, adminInfo]);

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
            <img src={adminInfo.photo} alt="" />
            <p>
              {" "}
              {adminInfo.firstname} {adminInfo.lastname}
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
                  <h3 className="dont-business">No hay Negocios</h3>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className={openModal ? "modal-store active" : "modal-store"}>
        <div>
          <header>
            <button href="/" className="back-btn" onClick={() => setOpenModal(false)}>
              <img src="./assets/left-back.svg" alt="back" />
              Atras
            </button>
            <h2>{barSelected.name}</h2>
          </header>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese la contrasena del negocio"
          />
          {errorSignin && <p>{errorSignin}</p>}
          <button className="login-store" onClick={submitHandler}>Entrar</button>
          <button className="reset-password-link">Has olvidado tu contrasena?</button>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}
