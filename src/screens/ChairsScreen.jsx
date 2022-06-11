import React from "react";
import { DivisaFormater } from "../utils/DivisaFormater";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import chairActions from "../actions/chairActions";
import constantsTemplate from "../constants/constantsTemplate";
import LoadingBox from "../components/LoadingBox";
import swal from "sweetalert";
export default function ChairsScreen() {
  const chairList = useSelector((state) => state.chairList);
  const { loading, data: chairs } = chairList;

  const chairCreate = useSelector((state) => state.chairCreate);
  const { success: successCreate } = chairCreate;

  const chairDelete = useSelector((state) => state.chairDelete);
  const { success: successDelete } = chairDelete;

  const chairUpdate = useSelector((state) => state.chairUpdate);
  const { success: successUpdate } = chairUpdate;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const [openModalItem, setOpenModalItem] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState("");
  const [limit, setLimit] = useState("");

  const [chairId, setChairId] = useState("");
  const [typeUpdate, setTypeUpdate] = useState("");
  const [priceUpdate, setPriceUpdate] = useState("");
  const [amountUpdate, setAmountUpdate] = useState("");
  const [limitUpdate, setLimitUpdate] = useState("");

  const dispatch = useDispatch();
  const submitCreateItemHandler = (e) => {
    e.preventDefault();
    if (type.length <= 0) {
      swal("El campo Tipo de mesa no puede estar vacio", {
        icon: "warning",
      });
      return;
    } else if (amount.length <= 0) {
      swal("El campo Cantidad no puede estar vacio", {
        icon: "warning",
      });
      return;
    } else if (limit.length <= 0) {
      swal("El campo Cupo total no puede estar vacio", {
        icon: "warning",
      });
      return;
    } else {
      dispatch(
        chairActions.create({
          email: adminInfo.email,
          storeId: storeInfo._id,
          type: type,
          limit: limit,
          price: price,
          amount: amount,
        })
      );
    }
  };

  const deleteHandler = (chair) => {
    swal("Seguro que quieres borrar " + chair.type + "?", {
      icon: "warning",
      buttons: ["Cancelar", "Si"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! " + chair.type + " borrado", {
          icon: "success",
        });
        dispatch(
          chairActions.delete(chair._id, adminInfo.email, storeInfo._id)
        );
      }
    });
  };

  const updateChairHandler = async (chair) => {
    await setChairId(chair._id);
    setTypeUpdate(chair?.type);
    setPriceUpdate(chair?.price);
    setAmountUpdate(chair?.amount);
    setLimitUpdate(chair?.limit);
    setOpenModalUpdate(true);
  };

  const submitUpateChair = (e) => {
    e.preventDefault();
    dispatch(
      chairActions.update({
        type: typeUpdate,
        limit: limitUpdate,
        amount: amountUpdate,
        price: priceUpdate,
        _id: chairId,
        email: adminInfo.email,
        storeId: storeInfo._id,
      })
    );
  };

  useEffect(() => {
    const chairConstants = new constantsTemplate("CHAIR");
    const itemsConstants = new constantsTemplate("ITEM");

    if (successCreate) {
      dispatch({ type: chairConstants.constants().CREATE_RESET });
      setOpenModalItem(false);
    }

    // if (successCreateItem) {
    //   dispatch({ type: itemsConstants.constants().CREATE_RESET });
    //   setOpenModalItem(false);
    // }

    if (successUpdate) {
      dispatch({ type: chairConstants.constants().UPDATE_RESET });
      setOpenModalUpdate(false);
    }
    if (storeInfo) {
      dispatch(chairActions.list(adminInfo.email, storeInfo._id));
    }

    if (successDelete) {
      dispatch({ type: chairConstants.constants().DELETE_RESET });
    }

    // if (succesDeleteItem) {
    //   dispatch({ type: itemsConstants.constants().DELETE_RESET });
    // }
  }, [
    dispatch,
    adminInfo,
    storeInfo,
    successCreate,
    successDelete,
    successUpdate,
    // successCreateItem,
    // succesDeleteItem,
  ]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <div className="page">
          <div className="">
            <div className="chair-header">

            <div className="screen-header ">

              <span>
                Cantidad de Sillas Generales:{" "}
                {chairs
                  .filter((chair) => chair.type == "GENERAL")
                  .reduce((p, c) => p + c.amount * c.limit, 0)}
              </span>
              <span>
                Cantidad de Sillas Privadas:{" "}
                {chairs
                  .filter((chair) => chair.type == "PRIVADO")
                  .reduce((p, c) => p + c.amount * c.limit, 0)}
              </span>
              <span>
                Cantidad de Sillas Especiales:{" "}
                {chairs
                  .filter((chair) => chair.type == "ESPECIAL")
                  .reduce((p, c) => p + c.amount * c.limit, 0)}
              </span>
              <span>
                Cantidad de Sillas Totales:{" "}
                {chairs.reduce((p, c) => p + c.amount * c.limit, 0)}
              </span>
              <span>
                Cantidad de Mesas Totales:{" "}
                {chairs.reduce((p, c) => p + c.amount, 0)}
              </span>
            </div>
            <button onClick={() => setOpenModalItem(true)}>+ Crear Mesa</button>
            </div>


            <div className="chair__container">
              {chairs.map((chair) => (
                <div key={chair._id} className="card__chair">
                  <div className="header_card">{chair.type.toUpperCase()}</div>
                  <div>
                    <ul>
                      <li>
                        <span> Cupos por mesa</span>: {chair.limit}
                      </li>
                      <li>
                        <span> Consumo minimo por mesa</span>: {DivisaFormater(chair.price)}
                      </li>
                      <li>
                        <span> Cantidad de Mesas</span>: {chair.amount}
                      </li>
                      <li>
                        <span> Reservados</span>: {chair.reserved}
                      </li>
                      <li>
                        <span> Libres</span>: {chair.amount - chair.reserved}
                      </li>
                    </ul>
                  </div>
                  <div className="footer__list">
                    <button onClick={() => updateChairHandler(chair)}>
                      <i className="bx bx-pencil"></i>
                    </button>

                    <button onClick={() => deleteHandler(chair)}>
                      {" "}
                      <i className="bx bx-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/*MODAL ITEM CREATE*/}
      <div className={openModalItem ? "openModal" : "closeModal"}>
        <div className="modal">
          <div className="modal-header">
            <h2>Crear</h2>
          </div>
          <form action="" className="form-items">
            <select
              name=""
              id=""
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Tipo</option>
              <option value="PRIVADO">Privado</option>
              <option value="GENERAL">General</option>
              <option value="ESPECIAL">Especial</option>
            </select>
            <input
              type="number"
              placeholder="Consumo minimo por mesa"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Cantidad de mesas"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Cupos por mesa"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              required
            />
          </form>
          <div className="modal-footer">
          <button
              className="btn btn-none"
              onClick={() => setOpenModalItem(false)}
            >
              Cancelar
            </button>
            <button className="btn" onClick={submitCreateItemHandler}>
              Guardar
            </button>
        
          </div>
        </div>
      </div>

      {/*MODAL ITEM UPDATE*/}
      <div className={openModalUpdate ? "openModal" : "closeModal"}>
        <div className="modal">
          <div className="modal-header">
            <h2>Crear</h2>
          </div>
          <form action="" className="form-items">
            <select
              name=""
              id=""
              onChange={(e) => setTypeUpdate(e.target.value)}
              required
            >
              <option value="">Tipo</option>
              <option value="PRIVADO">Privado</option>
              <option value="GENERAL">General</option>
              <option value="ESPECIAL">Especial</option>
            </select>
            <input
              type="number"
              placeholder="Consumo minimo por mesa"
              value={priceUpdate}
              onChange={(e) => setPriceUpdate(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Cantidad de mesas"
              value={amountUpdate}
              onChange={(e) => setAmountUpdate(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Cupos por mesa"
              value={limitUpdate}
              onChange={(e) => setLimitUpdate(e.target.value)}
              required
            />
          </form>
          <div className="modal-footer">
          <button
              className="btn btn-none"
              onClick={() => setOpenModalUpdate(false)}
            >
              Cancelar
            </button>
            <button className="btn" onClick={submitUpateChair}>
              Guardar
            </button>
       
          </div>
        </div>
      </div>
    </>
  );
}
