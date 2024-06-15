// src/pages/EditUser.tsx
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../services/userService";
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

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(id as string)
      .then((response) => {
        const user = response.data;
        setValue("name", user.name);
        setValue("email", user.email);
        setValue("password", user.password);
      })
      .catch((error) => {
        console.error("There was an error fetching the user!", error);
      });
  }, [id, setValue]);

  const onSubmit: SubmitHandler<User> = (data) => {
    updateUser(id as string, data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
      });
  };

  return (
    <section className="edit-user">
      <div className="container edit-user">
        <h1 className="edit-user__header">Edit User</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="edit-user__form">
          <div>
            <input
              type="text"
              {...register("name")}
              placeholder="Name"
              className="edit-user__form__input"
            />
            <p className="edit-user__form__error">{errors.name?.message}</p>
          </div>
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="edit-user__form__input"
            />
            <p className="edit-user__form__error">{errors.email?.message}</p>
          </div>
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="edit-user__form__input"
            />
            <p className="edit-user__form__error">{errors.password?.message}</p>
          </div>
          <button type="submit" className="edit-user__form__button">
            Update User
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditUser;
