import { useState, useEffect } from "react";

function User() {
  const users = [
    { id: 1, name: "Ali", age: 22 },
    { id: 2, name: "Ahmed", age: 25 },
    { id: 3, name: "Sara", age: 20 },
  ];

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(users);
  }, []);

  const deleteUser = (id) => {
    setUserData((prevUsers) =>
      prevUsers.filter((user) => user.id !== id)
    );
  };

  return (
    <div>
      <h2>User List</h2>

      {userData.map((user) => (
        <div key={user.id}>
          <p>
            {user.name} - {user.age} years old
          </p>
          <button onClick={() => deleteUser(user.id)}>
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
}

export default User;