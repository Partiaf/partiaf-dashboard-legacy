import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createStore } from "../actions/adminActions";
import CardLocation from "../components/CardLocation";

export default function StoreScreen(props) {
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
    e.preventDefault();
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
        {/* <label htmlFor="" className='form-label'>Tipo de Establecimeinto</label> */}
        <select
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
        <span className="btn-success" onClick={() => setNoNit(!noNit)}>
          {noNit ? "No tengo nit" : "Tengo nit"}{" "}
        </span>
        {noNit && (
          <input
            type="number"
            value={nit}
            onChange={(e) => setNit(e.target.value)}
            name=""
            id=""
            placeholder="NIT"
          />
        )}
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
        <CardLocation />
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

        <p>Ingrese contrseña y confirme</p>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <input type="password" placeholder="Confirmar contraseña" />
        </div>

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

        <span className="term">
          Al registrase usted acepta los terminos y condiciones del servicio de
          PARTIAF
        </span>
        <a href="/" className="register-link">
          ¿Ya tiene una cuenta, desea iniciar sesión?
        </a>

        <div className="footer">
          <Link to="/">
            <button className="btn-normal">Atras</button>
          </Link>
          <button>Siguiente</button>
        </div>
      </form>
    </div>
  );
}
