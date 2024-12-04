import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signupError, setSignupError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        email: data.email,
        password: data.password,
      });
      confirm("Register successfully") && navigate("/login");
    } catch (error) {
      setSignupError("An error occurred, please try again.");
    }
  };

  return (
    <div className="max-w-[500px] p-5 mx-auto mt-[100px] shadow-lg rounded-2xl">
      <h2 className="text-center">Signup</h2>
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
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <span className="text-danger">
              Password is required (min 6 characters)
            </span>
          )}
        </div>

        {signupError && <div className="text-danger">{signupError}</div>}

        <div className="flex items-center gap-4">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
