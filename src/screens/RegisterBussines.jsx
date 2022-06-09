import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createStore } from "../actions/adminActions";
import CardLocation from "../components/CardLocation";
import "../styles/RegisterBussines.css";

export default function RegisterBussines(props) {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeCreate = useSelector((state) => state.storeCreate);
  const { loading, error, success: successCreate } = storeCreate;

  const [name, setName] = useState("");
  const [type, setType] = useState("Discoteca");
  const [nit, setNit] = useState("");
  const [mobile, setMobile] = useState("");
  const [employes, setEmployes] = useState("");
  const [address, setAddress] = useState("");
  const [emailStore, setEmailStore] = useState("");
  const [password, setPassword] = useState("");
  const [email] = useState(adminInfo.email);
  const [totalLimit, setTotalLimit] = useState("");
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const removeImage = (e, image) => {
    e.preventDefault();
    const index = images.indexOf(image);
    const newArray = images.splice(index, 1);
    setImages([...images]);
  };

  const uploadHandler = async (e, imageFIeld = "image") => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post(
        "https://rveapi.herokuapp.com/api/v1/users/upload",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({ type: "UPLOAD_SUCCESS" });
      const image = data.secure_url;
      setImages([...images, image]);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (e) => {
   
    dispatch(
      createStore({
        name,
        type,
        nit,
        mobile,
        employes,
        address,
        emailStore,
        password,
        email,
        totalLimit,
        images,
      })
    );
  };

  useEffect(() => {
    if (successCreate) {
      props.history.push("/home");
    }
  }, [successCreate]);

  const [noNit, setNoNit] = useState(true);

  console.log(images);

  return (
    <div className="container-register">
      <div className="register-card">
        <div className="logo-partiaf">
          <img src="./assets/logo-partiaf.svg" alt="logo" />
        </div>
        <a href="/" className="back">
          <img src="./assets/left-back.svg" alt="back" />
          Atras
        </a>
        <div className="form">
          <form className="register-form" onSubmit>
            <div className="register-date">
              <div className="info-register">
                <h5>Datos del establecimiento</h5>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <select
                  className="select-store"
                  name=""
                  id=""
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">Tipo de Establecimiento</option>
                  <option value="Discoteca">Discoteca</option>
                  <option value="Bar">Bar</option>
                  <option value="Gastrobar">Gastrobar</option>
                </select>
              </div>
              <div className="photo">
                <h5>Foto de perfil</h5>
                <div className="container-photo">
                  <button className="contenedor-btn-file">
                    <img src="./assets/add-photo.svg" alt="profile-picture" />
                    <input
                      type="file"
                      id="btn-file"
                      onChange={(e) => uploadHandler(e, "featuredImage")}
                      required
                    />
                  </button>
                </div>
              </div>
              <input
                type="number"
                placeholder="NIT (opcional)"
                value={nit}
                onChange={(e) => setNit(e.target.value)}
              />
              <input
                type="number"
                placeholder="N° Empleados"
                value={employes}
                onChange={(e) => setEmployes(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Cupo total"
                value={totalLimit}
                onChange={(e) => setTotalLimit(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Direccion"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={emailStore}
                onChange={(e) => setEmailStore(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="movil"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <h5>Ingrese una contraseña</h5>
            <div className="personal-data">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input type="password" placeholder="Confirmar contraseña" required />
            </div>

            <div className="container-btn">
              <input
                type="submit"
                value="Siguiente"
                className="black-button-bss"
                onClick={() => submitHandler()}
              />
            </div>
            <span>
              Al registrarse usted acepta los términos y condiciones del
              servicio de PARTIAF
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
