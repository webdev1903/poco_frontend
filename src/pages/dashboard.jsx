import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../redux/store";
import {
  addTask,
  getTasks,
  logout,
  refreshToken,
  deleteTask,
} from "../redux/user/user.actions";
// import { useJwt } from "react-jwt";

// import jwt from "jsonwebtoken";

export default function Dashboard() {
  const { name, tasks, accessToken: token } = useSelector((store) => store);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    dispatch(getTasks(config)).then((res) => console.log(res));
    // setInterval(getNewToken, 3000);
  }, []);

  const getNewToken = async () => {
    // console.log(jwt.decode(token));
    // if (authenticated) console.log(await dispatch(refreshToken({ token })));
    // const { decodedToken, isExpired } = useJwt(token);
    // console.log("tokenrefresh", decodedToken, isExpired);
  };

  const handleClick = async () => {
    console.log(await dispatch(addTask({ task: text }, config)));
    setText("");
  };
  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge();
  };
  // const getNewToken = async () => {
  //   console.log(jwt.decode(token));
  //   // console.log(await dispatch(refreshToken({ token })));
  // };
  const handleDelete = async (id) => {
    console.log(await dispatch(deleteTask(id, config)));
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h1>Welcome, {name}</h1>
      <ul>
        {tasks.map((e, i) => (
          <li key={i}>
            <span>{e.task}</span>{" "}
            <button onClick={handleDelete.bind(null, e._id)}>delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
}
