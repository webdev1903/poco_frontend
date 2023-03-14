import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { authenticated } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) navigate("/");
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post("https://poco.onrender.com/register", data);
    if (res.status == 201) {
      alert("Registration successful, proceed to login");
      Navigate("/login");
      return;
    } else {
      alert("Try another email");
    }
  };
  return (
    <div className="SignupContainer">
      <h1>APP NAME</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={data.name}
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="email"
          value={data.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <div>
          <input
            type={passwordVisibility ? "text" : "password"}
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <FontAwesomeIcon
            icon={passwordVisibility ? faEyeSlash : faEye}
            className="EyeIcon"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          />
        </div>
        <input type="submit" value="Register" />
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/login" className="LinktoSignup">
          Login
        </Link>
      </p>
    </div>
  );
}
