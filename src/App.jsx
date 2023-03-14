import "./App.css";
import AllRoutes from "./components/allRoutes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/user/user.actions";
// import { useJwt } from "react-jwt";

function App() {
  const dispatch = useDispatch();
  const { refreshToken: token, authenticated } = useSelector((store) => store);
  console.log(token);

  useEffect(() => {
    // checkToken();
    setInterval(getNewToken, 30000);
  }, []);

  const getNewToken = async () => {
    // console.log(jwt.decode(token));
    if (authenticated) console.log(await dispatch(refreshToken({ token })));
    // const { decodedToken, isExpired } = useJwt(token);
    // console.log("tokenrefresh", decodedToken, isExpired);
  };

  // const checkToken = () => {
  //   const { decodedToken, isExpired } = useJwt(token);
  //   console.log(decodedToken, isExpired);
  // };
  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;
