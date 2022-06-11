import constantsTemplate from "../constants/constantsTemplate";
import { useEffect, useState } from "react";
import menuActions from "../actions/menuActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import "../styles/customStyles.css";
import swal from "sweetalert";
import itemsActions from "../actions/itemsActions";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import React, { Component }  from 'react';

export default function MenuScreen() {
  const dispatch = useDispatch();
  const [menuId, setMenuId] = useState();

  const AddItem = async (id) => {
    console.log("ID", id);
    await setMenuId(id);
    await setOpenModalItem(true);
  };

  // < --------------------List Process  ------------------------->
  const menuList = useSelector((state) => state.menuList);
  const { loading, data: menu } = menuList;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  // < --------------------Create Process  ------------------------->
  const menuCreate = useSelector((state) => state.menuCreate);
  const { success: successCreate } = menuCreate;

  const menuUpdate = useSelector((state) => state.menuUpdate);
  const { success: successUpdate } = menuUpdate;

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  const submitCreateHandler = (e) => {
    e.preventDefault();
    dispatch(
      menuActions.create({
        title: title,
        email: adminInfo.email,
        storeId: storeInfo._id,
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
      setItemImage(data.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  // < --------------------Create Item Process  ------------------------->
  //enviar email - storeid, menuId, name, precio
  const itemCreate = useSelector((state) => state.itemCreate);
  const { success: successCreateItem } = itemCreate;

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalItem, setOpenModalItem] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [itemImage, setItemImage] = useState("");

  const submitCreateItemHandler = (e) => {
    e.preventDefault();
    dispatch(
      itemsActions.create({
        name: name,
        description: description,
        price: price,
        image: itemImage,
        amount: amount,
        email: adminInfo.email,
        storeId: storeInfo._id,
        menuId: menuId,
      })
    );
  };

  // Update item process

  const itemUpdate = useSelector((state) => state.itemUpdate);
  const { success: successUpdateItem } = itemUpdate;

  const [itemId, setItemId] = useState();

  const [openModalUpdateItem, setOpenModalUpdateItem] = useState(false);
  const [nameUpdate, setNameUpdate] = useState();
  const [titleUpdateMenu, setTitleUpdateMenu] = useState();
  const [descriptionUpdateMenu, setDescriptionUpdateMenu] = useState();
  const [priceUpdate, setPriceUpdate] = useState();
  const [amountUpdate, setAmountUpdate] = useState();
  const [itemImageUpdate, setItemImageUpdate] = useState();

  const [nameUpdateMenu, setNameUpdateMenu] = useState();

  // UPLOAD IMAGE HANDLER
  const uploadUpdateHandler = async (e, imageFIeld = "image") => {
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
      setItemImageUpdate(data.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItemHanlder = async (item, menuIdUpdate) => {
    await setItemId(item);
    await setMenuId(menuIdUpdate);
    setNameUpdate(item?.name);
    setPriceUpdate(item?.price);
    setAmountUpdate(item?.amount);
    setDescriptionUpdateMenu(item?.description);
    setItemImageUpdate(item?.itemImage);
    setOpenModalUpdateItem(true);
  };
  const submitUpdateItemHandler = (e) => {
    e.preventDefault();
    dispatch(
      itemsActions.update({
        name: nameUpdate,
        description: descriptionUpdateMenu,
        price: priceUpdate,
        image: itemImageUpdate,
        amount: amountUpdate,
        email: adminInfo.email,
        storeId: storeInfo._id,
        menuId: menuId,
        _id: itemId._id,
      })
    );
  };

  const updateMenuHandler = async (menu) => {
    console.log(menu);
    await setMenuId(menu._id);
    setTitleUpdateMenu(menu?.title);
    setOpenModalUpdate(true);
  };
  const submitUpateMenu = (e) => {
    e.preventDefault();
    dispatch(
      menuActions.update({
        _id: menuId,
        title: titleUpdateMenu,
        menuId: menuId,
        email: adminInfo.email,
        storeId: storeInfo._id,
      })
    );
  };

  // < --------------------delete process  ------------------------->
  const menuDelete = useSelector((state) => state.menuDelete);
  const { success: successDelete } = menuDelete;

  const deleteHandler = (menu) => {
    swal("Seguro que quieres borrar " + menu.title + "?", {
      icon: "warning",
      buttons: ["Cancelar", "Si"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! " + menu.title + " borrado", {
          icon: "success",
        });
        dispatch(
          menuActions.delete(menu._id, adminInfo.email, storeInfo._id)
        );
      }
    });
  };

  // < --------------------delete item process  ------------------------->
  //   idItem, email, storeid, menuid
  const itemDelete = useSelector((state) => state.itemDelete);
  const { success: succesDeleteItem } = itemDelete;

  const deleteItemHandler = (item, menu) => {
    swal("Seguro que quieres borrar " + item.name + "?", {
      icon: "warning",
      buttons: ["Cancelar", "Si"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! " + item.name + " borrado", {
          icon: "success",
        });
        dispatch(
          itemsActions.delete(
            item._id,
            adminInfo.email,
            storeInfo._id,
            menu._id
          )
        );
      }
    });
  };

  useEffect(() => {
    const menuConstants = new constantsTemplate("MENU");
    const itemsConstants = new constantsTemplate("ITEM");

    if (successCreate) {
      dispatch({ type: menuConstants.constants().CREATE_RESET });
      setOpenModal(false);
    }

    if (successCreateItem) {
      dispatch({ type: itemsConstants.constants().CREATE_RESET });
      setOpenModalItem(false);
    }

    if (successUpdateItem) {
      dispatch({ type: itemsConstants.constants().UPDATE_RESET });
      setOpenModalUpdateItem(false);
    }

    if (storeInfo) {
      dispatch(menuActions.list(adminInfo.email, storeInfo._id));
    }

    if (successDelete) {
      dispatch({ type: menuConstants.constants().DELETE_RESET });
    }

    if (succesDeleteItem) {
      dispatch({ type: itemsConstants.constants().DELETE_RESET });
    }

    if (successUpdate) {
      setOpenModalUpdate(false);
      dispatch({ type: menuConstants.constants().UPDATE_RESET });
    }
  }, [
    dispatch,
    adminInfo.coverSelect,
    successCreate,
    successDelete,
    successCreateItem,
    succesDeleteItem,
    successUpdateItem,
    successUpdate,
  ]);

  console.log(itemId);
  const [menuIdSelected, setMenuIdSelected] = useState();

  return (
    <div>
      <div className="screen-two">
        {loading ? (
          <LoadingBox />
        ) : (
          <DragDropContext>
            <div className="center__screen">
              {menu.length === undefined ? (
                <h2>NO HAY MENUS, POR FAVOR AÑADE UNO </h2>
              ) : (
                <div>
                <div className="header-menu">

                  <div className="container-tags">
                    {menu.map((men) => (
                      <button
                        onClick={() => setMenuIdSelected(men.title)}
                        className="menu-tag"
                      >
                        <h4>{men.title}</h4>

                        <button>X</button>
                      </button>
                    ))}
                  </div>

                  <button className="btn">+ Categorias Menu</button>

                </div>

                  {menu
                    .filter((men) => men.title.includes(menuIdSelected))
                    .map((men) => (
                      <Droppable key={men._id} droppableId={men._id}>
                        {(provided) => (
                          <div
                            className="card-t"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            <h4>{men.title}               <button
                                  className="especial-button"
                                  onClick={() => updateMenuHandler(men)}
                                >
                                  <i className="bx bx-pencil"></i>
                                </button></h4>

                            <ul>
                              {men.items.map((item) => (
                                <Draggable key={men._id}>
                                  {(provided) => (
                                    <li
                                      className="menu-item"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <img
                                        className="img-preview-menu"
                                        src={item.image}
                                        alt=""
                                      />
                                      <p>{item.name} </p>

                                      <span className="price">
                                        {" "}
                                        $ {item.price}
                                      </span>
                                      <span className="price">
                                        {" "}
                                        {item.amount > 0
                                          ? "DISPONIBLE"
                                          : "NO DISPONIBLE"}
                                      </span>
                                      <div className="actions">
                                      <button
                                  className="image"
                                  onClick={() => updateMenuHandler(men)}
                                >
                                  Desactivar Item
                                </button>
                                        <button
                                          className="image btn-none-new"
                                          onClick={() =>
                                            updateItemHanlder(item, men._id)
                                          }
                                        >
                                          <i className="bx bx-pencil"></i>
                                        </button>
                                        <button
                                          className="close  btn-none-new"
                                          onClick={() =>
                                            deleteItemHandler(item, men)
                                          }
                                        >
                                          <i className="bx bx-trash"></i>
                                        </button>
                                      </div>
                                    </li>
                                  )}
                                </Draggable>
                              ))}
                            </ul>
                            <div className="footer-card-t">

                              <div>

                  
                                {/* <button onClick={() => deleteHandler(men)}>
                                  <i className="bx bxs-trash-alt"></i>
                                </button> */}
                              </div>
                              <button onClick={() => AddItem(men._id)}>
                                <i className="bx bx-plus-medical"></i> Agregar
                                Item
                              </button>
                            </div>
                            
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))}
                </div>
              )}

              {/* <div className="center-extend">
                <button onClick={() => setOpenModal(!openModal)}>
                  <i className="bx bx-plus-medical"></i> Agregar Menu
                </button>
              </div> */}
            </div>
          </DragDropContext>
        )}
      </div>

      {/*MODAL CREATE*/}
      <div className={openModal ? "openModal" : "closeModal"}>
        <div className="modal">
          <div className="modal-header">
            <h2>Crear</h2>
          </div>
          <form action="" className="form-items">
            <input
              type="text"
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
          <div className="modal-footer">
        
            <button
              className="btn btn-none"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn" onClick={submitCreateHandler}>
              Guardar
            </button>
          </div>
        </div>
      </div>

      {/*MODAL UPDATE MENU*/}
      <div className={openModalUpdate ? "openModal" : "closeModal"}>
        <div className="modal">
          <div className="modal-header">
            <h2>Crear</h2>
          </div>
          <form action="" className="form-items">
            <input
              type="text"
              placeholder="Titulo"
              value={titleUpdateMenu}
              onChange={(e) => setTitleUpdateMenu(e.target.value)}
            />
          </form>
          <div className="modal-footer">
     
            <button
              className="btn btn-none"
              onClick={() => setOpenModalUpdate(false)}
            >
              Cancelar
            </button>
            <button className="btn" onClick={submitUpateMenu}>
              Guardar
            </button>
          </div>
        </div>
      </div>

      {/*MODAL ITEM CREATE*/}
      <div className={openModalItem ? "openModal" : "closeModal"}>
        <div className="modal">
          <div className="modal-header">
            <h2>Crear</h2>
          </div>
          <form action="" className="form-items">
            <input
              type="text"
              placeholder="Nombre Item"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descripcion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => uploadHandler(e, "featuredImage")}
            />
            <img alt="" className="img-preview-modal" src={itemImage} />
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
      <div className={openModalUpdateItem ? "openModal" : "closeModal"}>
        <div className="modal">
          <div className="modal-header">
            <h2>Crear</h2>
          </div>
          <form action="" className="form-items">
            <input
              type="text"
              placeholder="Nombre Item"
              value={nameUpdate}
              onChange={(e) => setNameUpdate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descripcion Item"
              value={descriptionUpdateMenu}
              onChange={(e) => setDescriptionUpdateMenu(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio Item"
              value={priceUpdate}
              onChange={(e) => setPriceUpdate(e.target.value)}
            />
            <input
              type="number"
              placeholder="Cantidad de productos"
              value={amountUpdate}
              onChange={(e) => setAmountUpdate(e.target.value)}
            />
                <input
              type="number"
              placeholder="# de item"
              value={amountUpdate}
              onChange={(e) => setAmountUpdate(e.target.value)}
            />
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => uploadUpdateHandler(e, "featuredImage")}
            />
            <img alt="" className="img-preview" src={itemImage} />
          </form>
          <div className="modal-footer">
            <button
              className="btn btn-none"
              onClick={() => setOpenModalUpdateItem(false)}
            >
              Cancelar
            </button>
            <button className="btn" onClick={submitUpdateItemHandler}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
