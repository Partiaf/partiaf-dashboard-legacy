import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createStore } from "../actions/adminActions";

export default function SettingStoreScreen(props) {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  console.log(storeInfo);

  const storeCreate = useSelector((state) => state.storeCreate);
  const { loading, error, success: successCreate } = storeCreate;

  const [name, setName] = useState(storeInfo.store.name);
  const [type, setType] = useState(storeInfo.store.type);
  const [nit, setNit] = useState(storeInfo.store.nit);
  const [mobile, setMobile] = useState(storeInfo.store.mobile);
  const [employes, setEmployes] = useState(storeInfo.store.employes);
  const [address, setAddress] = useState(storeInfo.store.address);
  const [emailStore, setEmailStore] = useState(storeInfo.store.email);
  const [password, setPassword] = useState(storeInfo.store.password);
  const [email] = useState(adminInfo.email);
  const [totalLimit, setTotalLimit] = useState(storeInfo.store.totalLimit);

  const dispatch = useDispatch();

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
      })
    );
  };

  useEffect(() => {
    if (successCreate) {
      props.history.push("/home");
    }
  }, [successCreate]);

  const [noNit, setNoNit] = useState(true);

  return <div className="register center"></div>;
}
