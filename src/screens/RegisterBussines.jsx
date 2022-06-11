import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createStore } from "../actions/adminActions";
import storeActions from "../actions/storeActions";
import CardLocation from "../components/CardLocation";
import LoadingBox from "../components/LoadingBox";
import "../styles/RegisterBussines.css";

export default function RegisterBussines(props) {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeCreate = useSelector((state) => state.storeCreate);
  const { loading, error, success: successCreate } = storeCreate;

  const storeAddressMap = useSelector((state) => state.storeAddressMap);
  const { address: addressMap } = storeAddressMap;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [nit, setNit] = useState("");
  const [phone, setPhone] = useState("");
  const [employes, setEmployes] = useState("");
  const [address, setAddress] = useState("");
  const [emailStore, setEmailStore] = useState("");
  const [password, setPassword] = useState("");
  const [email] = useState("");
  const [totalLimit, setTotalLimit] = useState("");
  const [images, setImages] = useState([]);
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

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
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : "";
    const newLng = addressMap ? addressMap.lng : "";

    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }

    let moveOn = true;

    if (!newLat || !newLng) {
      // moveOn = window.confirm(
      //   "No has configurado una direccion en el mapa, deseas continuar?"
      // );
    }
    dispatch(
      storeActions.create({
        name,
        type,
        nit,
        phone,
        employes,
        password,
        email,
        limit: totalLimit,
        images,
        location: [{ geo: [{ caract: "point", longitud: lng, latitude: lat }] }],
        admin: adminInfo._id
      })
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (successCreate) {
      navigate("/home");
    }
  }, [successCreate]);

  const [noNit, setNoNit] = useState(true);


  const chooseOnMap = () => {
    navigate("/maps");
  };

  console.log(loading)

  const [imageStore, setImageStore] = useState(false);

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
        <div className="form-register">
          <form className="register-form">
            <div className="register-date">
              <div className="info-register">
                <h5>Datos del establecimiento</h5>
              </div>

              <div className="input-container">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="movil"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
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
              <input
                type="password"
                placeholder="Confirmar contraseña"
                required
              />
            </div>

            <div className="container-btn">
              <input
                type="button"
                value="Siguiente"
                className="black-button-bss"
                onClick={() => setImageStore(true)}
              />
            </div>
            <span>
              Al registrarse usted acepta los términos y condiciones del
              servicio de PARTIAF
            </span>
          </form>
        </div>
      </div>

      {imageStore && (
        <div className="image-store-container">
          <div className="register-card">
            <div className="logo-partiaf">
              <img src="./assets/logo-partiaf.svg" alt="logo" />
            </div>
            <button onClick={() => setImageStore(false)} className="back-btn">
              <img src="./assets/left-back.svg" alt="back" />
              Atras
            </button>
            <div className="form-register">
              <form className="register-form" onSubmit={submitHandler}>
                <div className="register-date">
                  <div className="info-register">
                    <h5>Carga fotos del establecimiento</h5>
                  </div>

                  <div className="inputs-store">
                  <div className="input-container-image">
                    <div className="photo">
                      <div className="container-photo box-photo">
                        <div className="contenedor-btn-file">
                          {loading ? (
                            <LoadingBox />
                          ) : (
                            <img
                              className={images[0] ? "" : "image-preview"}
                              src={
                                images[0] ? images[0] : "./assets/add-photo.svg"
                              }
                              alt="profile-picture"
                            />
                          )}

                          <input
                            type="file"
                            name="file"
                            id="btn-file"
                            onChange={(e) => uploadHandler(e, "featuredphoto")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="multi-images-store">
                  <div className="photo">
                      <div className="container-photo box-photo-mini">
                        <div className="contenedor-btn-file">
                          {loading ? (
                            <LoadingBox />
                          ) : (
                            <img
                              className={images[1] ? "" : "image-preview"}
                              src={
                                images[1] ? images[1] : "./assets/add-photo.svg"
                              }
                              alt="profile-picture"
                            />
                          )}

                          <input
                            type="file"
                            name="file"
                            id="btn-file"
                            onChange={(e) => uploadHandler(e, "featuredphoto")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="photo">
                      <div className="container-photo box-photo-mini">
                        <div className="contenedor-btn-file">
                          {loading ? (
                            <LoadingBox />
                          ) : (
                            <img
                              className={images[2] ? "" : "image-preview"}
                              src={
                                images[2] ? images[2] : "./assets/add-photo.svg"
                              }
                              alt="profile-picture"
                            />
                          )}

                          <input
                            type="file"
                            name="file"
                            id="btn-file"
                            onChange={(e) => uploadHandler(e, "featuredphoto")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="photo">
                      <div className="container-photo box-photo-mini">
                        <div className="contenedor-btn-file">
                          {loading ? (
                            <LoadingBox />
                          ) : (
                            <img
                              className={images[3] ? "" : "image-preview"}
                              src={
                                images[3] ? images[3] : "./assets/add-photo.svg"
                              }
                              alt="profile-picture"
                            />
                          )}

                          <input
                            type="file"
                            name="file"
                            id="btn-file"
                            onChange={(e) => uploadHandler(e, "featuredphoto")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="photo">
                      <div className="container-photo box-photo-mini">
                        <div className="contenedor-btn-file">
                          {loading ? (
                            <LoadingBox />
                          ) : (
                            <img
                              className={images[4] ? "" : "image-preview"}
                              src={
                                images[4] ? images[4] : "./assets/add-photo.svg"
                              }
                              alt="profile-picture"
                            />
                          )}

                          <input
                            type="file"
                            name="file"
                            id="btn-file"
                            onChange={(e) => uploadHandler(e, "featuredphoto")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="photo">
                      <div className="container-photo box-photo-mini">
                        <div className="contenedor-btn-file">
                          {loading ? (
                            <LoadingBox />
                          ) : (
                            <img
                              className={images[5] ? "" : "image-preview"}
                              src={
                                images[5] ? images[5] : "./assets/add-photo.svg"
                              }
                              alt="profile-picture"
                            />
                          )}

                          <input
                            type="file"
                            name="file"
                            id="btn-file"
                            onChange={(e) => uploadHandler(e, "featuredphoto")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="photo">
                      <div className="container-photo box-photo-mini">
                        <div className="contenedor-btn-file">
                          {loading ? (
                            <LoadingBox />
                          ) : (
                            <img
                              className={images[6] ? "" : "image-preview"}
                              src={
                                images[6] ? images[6] : "./assets/add-photo.svg"
                              }
                              alt="profile-picture"
                            />
                          )}

                          <input
                            type="file"
                            name="file"
                            id="btn-file"
                            onChange={(e) => uploadHandler(e, "featuredphoto")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="photo">
                      <div className="container-photo box-photo-mini">
                        <div className="contenedor-btn-file">
                          {loading ? (
                            <LoadingBox />
                          ) : (
                            <img
                              className={images[7] ? "" : "image-preview"}
                              src={
                                images[7] ? images[7] : "./assets/add-photo.svg"
                              }
                              alt="profile-picture"
                            />
                          )}

                          <input
                            type="file"
                            name="file"
                            id="btn-file"
                            onChange={(e) => uploadHandler(e, "featuredphoto")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="photo">
                      <div className="container-photo box-photo-mini">
                        <div className="contenedor-btn-file">
                          {loading ? (
                            <LoadingBox />
                          ) : (
                            <img
                              className={images[8] ? "" : "image-preview"}
                              src={
                                images[8] ? images[8] : "./assets/add-photo.svg"
                              }
                              alt="profile-picture"
                            />
                          )}

                          <input
                            type="file"
                            name="file"
                            id="btn-file"
                            onChange={(e) => uploadHandler(e, "featuredphoto")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                    
                  </div>
               
                </div>

                <h5>Establece una breve description</h5>
                <div className="personal-data">
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="container-btn">
                  <input
                    type="submit"
                    value="Siguiente"
                    className="black-button-bss"
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
      )}
    </div>
  );
}
