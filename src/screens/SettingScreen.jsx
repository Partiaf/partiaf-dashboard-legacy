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

export default function SettingScreen(props) {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const [name, setName] = useState(adminInfo.firstname);
  const [lastname, setLastname] = useState(adminInfo.lastname);
  const [identification, setIdentification] = useState(
    adminInfo.identification
  );
  const [image, setImage] = useState(adminInfo.image);
  const [email, setEmail] = useState(adminInfo.email);
  const [mobile, setMobile] = useState(adminInfo.phone);
  const [age, setAge] = useState(adminInfo.age);
  const [address, setAddress] = useState(adminInfo.address);
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
    if (adminInfo && !storeInfo) {
      props.history.push("/");
    }
  }, [props.history, adminInfo, storeInfo, props]);

  return (
    <div className="screen">
      <div className="register">
        <form onSubmit={submitHandler}>
          <div className="register-header">
            <p>Datos</p>
            <Link to="/">
              <button className="btn-normal">Atras</button>
            </Link>
          </div>
          <div className="register-content">
            <div className="flex-dev">
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Apellidos"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <label className="label" htmlFor="">
                Tipo de documento
              </label>

              <div className="cont-space">
                <div className="space">
                  <select className="sel" name="" id="" required>
                    <option value="Discoteca">Cedula de ciudadania</option>
                    <option value="Bar">Cedula de extrangeria</option>
                    <option value="Gastrobar">Pasaporte</option>
                  </select>
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="CC"
                    value={identification}
                    onChange={(e) => setIdentification(e.target.value)}
                  />
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly
                    />
                  </div>
                </div>
                <div className="space">
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Movil"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <div>
                    <input
                      type="number"
                      placeholder="Edad"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Direccion"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <p>Ingrese contrseña y confirme</p>
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className={password == confirmPassword ? "" : "warning"}
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="file-input">
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => uploadHandler(e, "featuredImage")}
              />
              {loading ? (
                <LoadingBoxWhite />
              ) : (
                // <div></div>
                <img alt="" className="img-preview-user" src={image} />
              )}
            </div>
          </div>

          <div className="footer"></div>
          <button className="register-btn">Guardar</button>
        </form>
      </div>
    </div>
  );
}
