// src/pages/UserList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../services/userService";
import { User } from "../interfaces/User";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    deleteUser(id)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="user-list">
      <div className="container user-list">
        <h1 className="user-list__header">User List</h1>
        <Link to="/add" className="user-list__link">
          Add User
        </Link>
        <ul className="user-list__list">
          {users.map((user) => (
            <li key={user._id} className="user-list__list__item">
              <span className="user-list__list__item__name">{user.name}</span>
              <span>{user.email}</span>
              <span className="user-list__list__item__actions">
                <Link to={`/edit/${user._id}`}>Edit</Link>
                <button onClick={() => handleDelete(user._id!)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UserList;
