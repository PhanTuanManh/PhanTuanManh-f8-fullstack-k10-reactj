import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.use));
      console.log(response.data.user);
      navigate("/");
    } catch (error) {
      setLoginError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="max-w-[500px] p-5 mx-auto mt-[100px] shadow-lg rounded-2xl">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-danger">Email is required</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">Password is required</span>
          )}
        </div>

        {loginError && <div className="text-danger">{loginError}</div>}

        <div className="flex gap-4 items-center">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <span>
            Don't have an account?{" "}
            <Link to="/register" className="underline">
              Signup
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
