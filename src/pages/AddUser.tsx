// src/pages/AddUser.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";
import { User } from "../interfaces/User";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AddUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<User> = (data) => {
    createUser(data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error creating the user!", error);
      });
  };

  return (
    <section className="add-user">
      <div className="container add-user">
        <h1 className="add-user__header">Add User</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="add-user__form">
          <div>
            <input
              type="text"
              {...register("name")}
              placeholder="Name"
              className="add-user__form__input"
            />
            <p className="add-user__form__error">{errors.name?.message}</p>
          </div>
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="add-user__form__input"
            />
            <p className="add-user__form__error">{errors.email?.message}</p>
          </div>
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="add-user__form__input"
            />
            <p className="add-user__form__error">{errors.password?.message}</p>
          </div>
          <button type="submit" className="add-user__form__button">
            Add User
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddUser;
