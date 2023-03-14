import { useEffect, useState } from "react";
import "./pages.modules.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user/user.actions";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { authenticated } = useSelector((store) => store);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticated) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await dispatch(login(data));
    console.log(res);
    if (res.type == "user/login") {
      navigate("/");
      return;
    } else {
      alert(res.payload.response.data);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <div className="LoginContainer">
      <h1>POCO CARE</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
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
            onClick={handleToggle}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="LinktoSignup">
          Sign up
        </Link>
      </p>
    </div>
  );
}
