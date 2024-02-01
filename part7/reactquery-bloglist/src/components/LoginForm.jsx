import { useState } from "react";
import Notification from "./Notification";
import PropTypes from "prop-types";
import { Button, TextField } from "@mui/material";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    if ((await handleLogin(username, password)) === "success") {
      setUsername("");
      setPassword("");
    }
  };

  const Header = ({ label }) => (
    <>
      <h2>{label}</h2>
      <Notification />
    </>
  );
  Header.propTypes = {
    label: PropTypes.string.isRequired
  }

  return (
    <>
      <Header label="log in to application" />
      <form onSubmit={login}>
        <div>
          username:{" "}
          <TextField
            variant="standard"
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          password:{" "}
          <TextField
            variant="standard"
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button id="login-button" variant="contained" type="submit">
          log in
        </Button>
      </form>
    </>
  );
};
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}
export default LoginForm;
