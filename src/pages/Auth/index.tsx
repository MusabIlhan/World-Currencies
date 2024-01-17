import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {fetchData} from "../../helpers";

const Auth = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isSignUp, setIsSignUp] = React.useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [isSignUp]);

  const register = () => {
    fetchData("/auth/register", "POST", {
      username,
      password,
    }).then(() => setIsSignUp(false));
  };

  const login = () => {
    fetchData("/auth/login", "POST", {
      username,
      password,
    }).then((data) => {
      localStorage.setItem("sessionToken", data.token);
      navigate("/dashboard");
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (isSignUp) {
      register();
    } else {
      login();
    }
    // TODO: Handle errors and give direction to user on sign up success to sign in
  };

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <form
        style={{display: "flex", flexDirection: "column", padding: 20, gap: 10}}
      >
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          {isSignUp ? "Sign up" : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
