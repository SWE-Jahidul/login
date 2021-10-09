import "./App.css";
import { useState } from "react";
import initilizeauthentication from "./Firbase/firebase.initialize";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

initilizeauthentication();

function App() {
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hadleRegistration = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const { email, displayName } = result.user;
        const logeduser = {
          name: displayName,
          email: email,
        };
        setUser(logeduser);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <form onSubmit={hadleRegistration}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          onBlur={handleEmailChange}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          onBlur={handlePasswordChange}
          id="exampleInputPassword1"
          placeholder="Password"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <br></br>

      <div>{user.email}</div>
    </form>
  );
}

export default App;
