import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../actions/adminActions";
import LoadingBox from "../components/LoadingBox";
import LoadingBoxWhite from "../components/LoadingBoxWhite";
import "../styles/register.css";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [identification, setIdentification] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [password, setPassword] = useState("");

  const uploadImage = useSelector((state) => state.uploadImage);
  const { loading } = uploadImage;

  console.log(loading);

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
      setImage(data.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  //const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      signup(
        name,
        lastname,
        identification,
        email,
        mobile,
        age,
        address,
        password,
        image
      )
    );
    // if (adminInfo) {
    //   props.history.push("/");
    // }
    // if (adminInfo && !storeInfo) {
    //   props.history.push("/");
    // }
  };

  useEffect(() => {
    if (adminInfo) {
      props.replace.push("/");
    }
    if (adminInfo && !storeInfo) {
      props.history.push("/");
    }
  }, [props.history, adminInfo, storeInfo, props]);

  return (
    <div className="container-register">
      <div className="register-card">
        <div className="logo-partiaf">
          <img src="./assets/logo-partiaf.svg" alt="logo" />
        </div>
        <div className="form">
          <form className="register-form" onSubmit={submitHandler}>
            <div className="register-date">
              <div className="info-register">
                <h5>Datos de registro</h5>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div className="photo">
                <h5>Foto de perfil</h5>
                <div className="container-photo">
                  <button className="contenedor-btn-file">
                    <img src="./assets/add-photo.svg" alt="profile-picture" />
                    <input
                      type="file"
                      name="file"
                      id="btn-file"
                      onChange={(e) => uploadHandler(e, "featuredImage")}
                    />
                  </button>
                </div>
              </div>
            </div>
            <h5>Tipo de documento</h5>
            <div className="personal-data">
              <select className="select-type-doc" name="" id="" required>
                <option value="CC">Cedula de ciudadania</option>
                <option value="CE">Cedula de extranjeria</option>
                <option value="PS">Pasaporte</option>
              </select>
              <input
                type="number"
                placeholder="CC"
                value={identification}
                onChange={(e) => setIdentification(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Edad"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Telefono"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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
                type="text"
                placeholder="Direccion"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
              <input
                className={password == confirmPassword ? "" : "warning"}
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="container-btn-register">
              <Link to="/login" className="gray-button">
                Ir a iniciar sesion
              </Link>

              <button className="black-button">Registrate</button>
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
