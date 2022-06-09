import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStore, updateStore } from "../actions/adminActions";
import React, { Component }  from 'react';

export default function SettingsScreen(props) {
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo, error: errorSignin } = storeSignin;

  const storeUpdate = useSelector((state) => state.storeUpdate);
  const { storeInfo: storeInfoUpdate } = storeUpdate;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(deleteStore(adminInfo.email, storeInfo.store._id, password));
  };

  console.log(storeInfoUpdate);

  const storeCreate = useSelector((state) => state.storeCreate);
  const { loading, error, success: successCreate } = storeCreate;

  const [name, setName] = useState(storeInfo.store.name);
  const [type, setType] = useState(storeInfo.store.type);
  const [nit, setNit] = useState(storeInfo.store.nit);
  const [mobile, setMobile] = useState(storeInfo.store.mobile);
  const [images, setImages] = useState([...storeInfo.store.images]);
  const [employes, setEmployes] = useState(storeInfo.store.employes);
  const [address, setAddress] = useState(storeInfo.store.address);
  const [emailStore, setEmailStore] = useState(storeInfo.store.email);
  const [email] = useState(adminInfo.email);
  const [totalLimit, setTotalLimit] = useState(storeInfo.store.totalLimit);

  console.log(images);
  const removeImage = (e, image) => {
    e.preventDefault();
    const index = images.indexOf(image);
    const newArray = images.splice(index, 1);
    setImages([...images]);
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    console.log("CLICK");
    dispatch(
      updateStore({
        id: storeInfo.store._id,
        name,
        type,
        nit,
        mobile,
        employes,
        images,
        address,
        emailStore,
        email,
        totalLimit,
        password: storeInfo.store.password,
      })
    );
  };

  // UPLOAD IMAGE HANDLER
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
      setImages([...images, data.secure_url]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);

  const [noNit, setNoNit] = useState(true);

  return (
    <div>
      <div className="settings">
        <div className="register center">
          <h2 className="register-title new-title">Bienvenido!</h2>
          <form onSubmit={submitHandler}>
            <p>Datos del establecimeinto</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              required
            />
            <label htmlFor="" className="form-label">
              Tipo de Establecimeinto
            </label>
            <select
              name=""
              id=""
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="Discoteca">Discoteca</option>
              <option value="Bar">Bar</option>
              <option value="Gastrobar">Gastrobar</option>
            </select>
            <input
              type="number"
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              name=""
              id=""
              placeholder="NIT"
            />
            <input
              type="text"
              value={totalLimit}
              onChange={(e) => setTotalLimit(e.target.value)}
              name=""
              id=""
              placeholder="Cupo total"
              required
            />
            <div>
              <input
                type="email"
                value={emailStore}
                onChange={(e) => setEmailStore(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                name=""
                id=""
                placeholder="Movil"
                required
              />
            </div>
            <div>
              <input
                type="number"
                value={employes}
                onChange={(e) => setEmployes(e.target.value)}
                placeholder="N° de empleados"
                required
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name=""
                id=""
                placeholder="Direccion"
                required
              />
            </div>

            {/* <p>Ingrese contrseña y confirme</p>
                <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                    <input type="password" placeholder="Confirmar contraseña" />
                </div> */}

            <input
              type="file"
              name=""
              className="file-input"
              id=""
              onChange={(e) => uploadHandler(e, "featuredImage")}
            />
            <div className="store-images">
              {images.map((image) => (
                <div className="image">
                  <img src={image} alt="" />
                  <button
                    className="store-image-btn"
                    onClick={(e) => removeImage(e, image)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div className="footer">
              <Link to="/">
                <button className="btn-normal">Atras</button>
              </Link>
              <button onClick={(e) => updateSubmit(e)}>Editar</button>
            </div>
          </form>
        </div>
        <button className="btn-danger" onClick={() => setOpenModal(true)}>
          Eliminar Negocio
        </button>
      </div>
      <div className={openModal ? "modalStore active" : "modalStore"}>
        <div>
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
    </div>
  );
}
