import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import BookingScreen from "./screens/BookingScreen";
import BusinessScreen from "./screens/BusinessScreen";
import BuyScreen from "./screens/BuyScreen";
import CoverScreen from "./screens/CoverScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MenuScreen from "./screens/MenuScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StaffScreen from "./screens/StaffScreen";
import StoreScreen from "./screens/StoreScreen";
import { useSelector } from "react-redux";
import LayoutHome from "./components/LayoutHome";
import ComingSoon from "./screens/ComingSoon";
import ChairsScreen from "./screens/ChairsScreen";
import SettingScreen from "./screens/SettingScreen";
import SettingStoreScreen from "./screens/SettingStoreScreen";
import "./styles/variables.css"

function App() {
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const storeSignin = useSelector((state) => state.storeSignin);
  const { loading, storeInfo } = storeSignin;

  return (
    <BrowserRouter>
      <>
        {adminInfo && storeInfo && !loading ? (
          <Layout>
            <Switch>
              <Route path="/home" component={ComingSoon} exact></Route>
              <Route path="/booking" component={BookingScreen} exact></Route>
              <Route path="/menu" component={MenuScreen} exact></Route>
              <Route path="/chairs" component={ChairsScreen} exact></Route>
              <Route path="/cover" component={CoverScreen} exact></Route>
              <Route path="/buy" component={BuyScreen} exact></Route>
              <Route path="/staff" component={StaffScreen} exact></Route>
              <Route path="/setting" component={SettingScreen} exact></Route>
              <Route path="/settings" component={SettingsScreen} exact></Route>
              <Route
                path="/settingstore"
                component={SettingStoreScreen}
                exact
              ></Route>
            </Switch>
            {/* <Route path="/" component={ComingSoon} exact></Route>   */}
          </Layout>
        ) : adminInfo ? (
          <LayoutHome>
            <Switch>
              <Route path="/" component={BusinessScreen} exact></Route>
              <Route path="/store" component={StoreScreen} exact></Route>
            </Switch>
          </LayoutHome>
        ) : (
          <>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/login" component={LoginScreen} exact></Route>
            <Route path="/register" component={RegisterScreen} exact></Route>
            <Route path="/settings" component={SettingsScreen} exact></Route>
          </>
        )}
      </>
    </BrowserRouter>
  );
}

export default App;