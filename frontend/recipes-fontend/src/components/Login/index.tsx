import { Button, Dialog, DialogTitle, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, signUpUser } from "src/store/effect";
import "./styles.scss";

export interface LoginProps {
  open: boolean;
  page: string;
  onClose: () => void;
}

const Login = (props: LoginProps) => {
  const { open, page, onClose } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  function handleLogin() {
    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
    onClose();
  }

  function handleSignUp() {
    if (!email || !password || !username) return;
    dispatch(signUpUser({ email, password, username }));
    onClose();
  }

  const Login = (
    <>
      <DialogTitle>Login</DialogTitle>
      <TextField label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} />
      <TextField
        type="password"
        label="Senha"
        variant="outlined"
        onChange={e => setPassword(e.target.value)}
      />
      <Button color="primary" variant="contained" disableElevation onClick={handleLogin}>
        Login
      </Button>
    </>
  );

  const SignUp = (
    <>
      <DialogTitle>Cadastre-se</DialogTitle>
      <TextField label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} />
      <TextField
        type="password"
        label="Senha"
        variant="outlined"
        onChange={e => setPassword(e.target.value)}
      />
      <TextField label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
      <Button color="primary" variant="contained" disableElevation onClick={handleSignUp}>
        Cadastrar-se
      </Button>
    </>
  );

  return (
    <Dialog className="Login" open={open} onClose={onClose}>
      <div className="login-wrapper flex column gaps">
        {page === "login" ? Login : page === "signup" ? SignUp : <div>Invalido</div>}
      </div>
    </Dialog>
  );
};

export default Login;
