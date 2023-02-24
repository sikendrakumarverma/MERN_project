//import logo from "./logo.svg";
import "../App.css";
import Users from "./Users";
import { useEffect } from "react";

import axios from "axios";
import { useState } from "react";

function AttractiveUi() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    name: "sikendra",
    phone: "7492956183"
  });

  useEffect(() => {
    console.log("Selcted User Changed..");
  }, [selectedUser]);

  useEffect(() => {
    console.log("App Mounted"); // On Component Mount
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUsers(response.data);
    });

    return () => { };
  }, []);

  const handleUserClick = (user) => { // Here user details come from child
    console.log("From App", user);
    alert(`Name:  ${user.name}
ID:  ${user.id}
Email:  ${user.email}
phone:  ${user.phone}`)

    setSelectedUser(user);

  };

  const handleOnDelete = (user) => {
    console.log("delete ", user.id);
    alert(`Are you sure want to remove : ${user.name}`)

    const indexToDelete = users.findIndex((item) => {
      return item.id === user.id;
    });

    const updated = [...users];
    updated.splice(indexToDelete, 1);

    setUsers(updated);
  };

  //console.log({ users });
  if (users && Array.isArray(users) && users.length > 0) {
    return (
      <div style={{ display: "flex", }} >
        <div>
          <Users
            onDelete={handleOnDelete}
            onUserClick={handleUserClick}
            users={users}
          />
        </div>
        
      </div>
    );
  }
  return <h>Congratulations You Remove All Users Please! Refresh Page For Again Start</h>;
}

export default AttractiveUi;