import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import buyActions from "../actions/buyActions";
import CardBooking from "../components/CardBooking";
import data from "../utils/data";
import { DivisaFormater } from "../utils/DivisaFormater";
export default function BuyScreen() {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { storeInfo } = storeSignin;

  const buyList = useSelector((state) => state.buyList);
  const { loading, data: buys } = buyList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (storeInfo) {
      dispatch(buyActions.list(adminInfo.email, storeInfo._id));
    }
  }, [dispatch]);

  return (
    <div className="screen">
      <div className="center__screen state-scroll">
        <input type="text" className="search m-b" placeholder="Buscar:" />

        {!loading &&
          buys.map((buy) => (
            <div className="state-card">
              <div className="state__header">
                <h3>{buy.name}</h3>
                <span className="corner">
                  <i className="bx bxs-star"></i>
                </span>
              </div>
              <div className="buy_item-list">
                {buy.items.map((item) => (
                  <div className="buy_item">
                    <p>{item.name}</p>
                    <span>{DivisaFormater(item.price)}</span>
                  </div>
                ))}
              </div>
              <div>Total: {DivisaFormater(buy.total)}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
