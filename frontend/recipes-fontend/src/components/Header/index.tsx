import React, { useState } from "react";
import "./styles.scss";
import { AppBar, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Toolbar, Link } from "@material-ui/core";
import Login from "../Login";
import { getUser } from "src/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "src/store/effect";

function Header() {
  const [openLogin, setOpenLogin] = useState(false);
  const [loginPage, setLoginPage] = useState("");

  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const LoginButtons = (
    <div className="flex align-center gaps">
      <Button
        variant="contained"
        disableElevation
        onClick={() => {
          setOpenLogin(true);
          setLoginPage("login");
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        disableElevation
        onClick={() => {
          setOpenLogin(true);
          setLoginPage("signup");
        }}
      >
        Cadastrar-se
      </Button>
    </div>
  );

  const LoggedUser = (
    <div className="logged-user flex center gaps">
      <span>{user?.username}</span>
      <Button
        variant="contained"
        disableElevation
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>
    </div>
  );

  return (
    <AppBar elevation={0} className="Header" position="static">
      <div className="flex justify-space-between">
        <Toolbar className="flex justify-space-between" component="nav">
          <Button>
            <Link to="/" color="inherit" component={RouterLink}>
              Home
            </Link>
          </Button>

          <Button>
            <Link to="/recipes" color="inherit" component={RouterLink}>
              Receitas
            </Link>
          </Button>
        </Toolbar>

        {user ? LoggedUser : LoginButtons}
      </div>
      <Login open={openLogin} onClose={() => setOpenLogin(false)} page={loginPage} />
    </AppBar>
  );
}

export default Header;
