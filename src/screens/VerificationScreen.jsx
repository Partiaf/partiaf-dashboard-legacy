import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { activeEmail } from "../actions/adminActions";
import swal from "sweetalert";
import "../styles/verification.css";

const VerificationScreen = (props) => {
  const dispatch = useDispatch();

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");
  const [num5, setNum5] = useState("");
  const [num6, setNum6] = useState("");

  const adminActiveEmail = useSelector((state) => state.adminActiveEmail);
  const { loading, error, success } = adminActiveEmail;
  console.log("VERIFICATION", error);

  const activeEmailFetch = () => {
    if (error === "Codigo no valido") {
      swal(error, {
        icon: "warning",
        buttons: "Reintentar",
        dangerMode: true,
      });
    } else {
      const code = num1 + num2 + num3 + num4 + num5 + num6;
      console.log(code);
      dispatch(activeEmail(code));
    }
  };

  const navigate = useHistory();

  useEffect(() => {
    console.log(success);
    if (success) {
      props.history.push("/");
    }
  }, [success]);

  return (
    <div className="container-verification">
      <div className="verification-card">
        <div className="container-logo">
          <img src="./assets/logo-partiaf.svg" alt="logo" />
        </div>

        <div className="info-verification">
          <p>Te enviamos un codigo para verificar tu correo electronico</p>
          <span>Enviado a "correoalqueseenvio@gmail.com"</span>
          <div>
            <form className="form">
              <input
                type="text"
                maxLength={1}
                pattern="\d*"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                required
              />
              <input
                type="text"
                maxLength={1}
                pattern="\d*"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                required
              />
              <input
                type="text"
                maxLength={1}
                pattern="\d*"
                value={num3}
                onChange={(e) => setNum3(e.target.value)}
                required
              />
              <input
                type="text"
                maxLength={1}
                pattern="\d*"
                value={num4}
                onChange={(e) => setNum4(e.target.value)}
                required
              />
              <input
                type="text"
                maxLength={1}
                pattern="\d*"
                value={num5}
                onChange={(e) => setNum5(e.target.value)}
                required
              />
              <input
                type="text"
                maxLength={1}
                pattern="\d*"
                value={num6}
                onChange={(e) => setNum6(e.target.value)}
                required
              />
            </form>
          </div>
          <p>¡No recibi un codigo!</p>
          <a className="text-reenviar"> Reenviar</a>
          <div className="container-btn">
            <button className="black-btn" onClick={() => activeEmailFetch()}>
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationScreen;
