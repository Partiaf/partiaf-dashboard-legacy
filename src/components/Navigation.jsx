import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navigation.css";

export default function Navigation() {
  const [active, setActive] = useState("");

  return (
    <aside>
      <div className="logo-navigation">
        <img src="./img/resources/logo-header.svg" alt="logo" />
      </div>
      <ul>
        {/* <Link to="/" onClick={() => setActive('notifications')} className={active === "notifications"? "navigation__item active"
                  : 'navigation__item'}>

                      <div className="icon">
                        <img src="./img/warning.png" alt="" />
                      </div>
                      <div className="title">Notificaciones</div>
                </Link> */}
        <Link
          to="/cover"
          onClick={() => setActive("covers")}
          className={
            active === "covers" ? "navigation__item active" : "navigation__item"
          }
        >
          <div className="icon">
            <img src="./img/navigation/covers-icon.svg" alt="" />
          </div>
          <div className="title">Covers</div>
        </Link>
        <Link
          to="/booking"
          onClick={() => setActive("booking")}
          className={
            active === "booking"
              ? "navigation__item active"
              : "navigation__item"
          }
        >
          <div className="icon">
            <img src="./img/navigation/booking-icon.svg" alt="" />
          </div>
          <div className="title">Reservas</div>
        </Link>
        <Link
          to="/buy"
          onClick={() => setActive("buy")}
          className={
            active === "buy" ? "navigation__item active" : "navigation__item"
          }
        >
          <div className="icon">
            <img src="./img/navigation/buy-icon.svg" alt="" />
          </div>
          <div className="title">Compras</div>
        </Link>
        <Link
          to="/menu"
          onClick={() => setActive("menu")}
          className={
            active === "menu" ? "navigation__item active" : "navigation__item"
          }
        >
          <div className="icon">
            <img src="./img/navigation/menu-icon.svg" alt="" />
          </div>
          <div className="title">Menu</div>
        </Link>
        <Link
          to="/chairs"
          onClick={() => setActive("chairs")}
          className={
            active === "chairs" ? "navigation__item active" : "navigation__item"
          }
        >
          <div className="icon">
            <img src="./img/chair.png" alt="" />
          </div>
          <div className="title">Mesas</div>
        </Link>
        <Link
          to="/settings"
          onClick={() => setActive("settings")}
          className={
            active === "settings"
              ? "navigation__item active"
              : "navigation__item"
          }
        >
          <div className="icon">
            <img src="./img/navigation/settings-icon.svg" alt="" />
          </div>
          <div className="title">Configuracion</div>
        </Link>
        {/* 
                <Link to="/buy" onClick={() => setActive('buys')} className={active === "buys"? "navigation__item active"
                  : 'navigation__item'}>

                      <div className="icon">
                      <img src="./img/cash-on-delivery.png" alt="" />
                      </div>
                      <div className="title">Compras</div>
                </Link>
                <Link to="/order" onClick={() => setActive('orders')} className={active === "orders"? "navigation__item active"
                  : 'navigation__item'}>

                      <div className="icon">
                      <img src="./img/cargo.png" alt="" />
                      </div>
                      <div className="title">Pedidos</div>
                </Link>

                <Link to="/staff" onClick={() => setActive('staff')} className={active === "staff"? "navigation__item active"
                  : 'navigation__item'}>

                      <div className="icon">
                      <img src="./img/staff.png" alt="" />
                      </div>
                      <div className="title">Staff</div>
                </Link> 
      
                */}
      </ul>
    </aside>
  );
}
