// src/pages/AddUser.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";
import { User } from "../interfaces/User";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import "../App.css"; // Make sure to import the CSS file where additional styles are defined

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
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<User> = async (data) => {
    setLoading(true);
    try {
      await createUser(data);
      navigate("/");
    } catch (error) {
      console.error("There was an error creating the user!", error);
      toast.error("There was an error creating the user!");
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
            />
            <p className="add-user__form__error">{errors.name?.message}</p>
          </div>
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="add-user__form__input"
              disabled={loading}
            />
            <p className="add-user__form__error">{errors.email?.message}</p>
          </div>
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="add-user__form__input"
              disabled={loading}
            />
            <p className="add-user__form__error">{errors.password?.message}</p>
          </div>
          <button
            type="submit"
            className="add-user__form__button"
            disabled={loading}
          >
            {loading ? (
              <>
                Adding...
                <AiOutlineLoading3Quarters className="loader-icon" />
              </>
            ) : (
              "Add User"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddUser;
