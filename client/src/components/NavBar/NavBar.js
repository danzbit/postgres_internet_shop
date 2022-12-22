import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../..";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import "./NavBar.scss";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header_name">
          <NavLink to={SHOP_ROUTE}>
            Buy device
          </NavLink>
        </div>
        {user.isAuth ? (
          <div className="header_items">
            <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Admin panel</Button>
            <Button variant={"outline-light"} onClick={() => logOut()}>Sign In</Button>
          </div>
        ) : (
          <div className="header_items">
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
});

export default NavBar;
