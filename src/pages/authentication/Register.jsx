import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerService } from "../../services/authentication";
import { registerSchema } from "../../validations";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.authentication.register);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (credentials) => {
    dispatch(registerService(credentials))
      .unwrap()
      .then(() => navigate("/signIn"))
      .catch((error) => {
        console.error("Error in registration:", error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200  p-6 rounded-lg shadow-md w-[90%] md:max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full name"
            className={`w-full px-4 py-2 text-[0.9rem] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-[0.8rem] mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-2 text-[0.9rem] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-[0.8rem] mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className={`w-full px-4 py-2 text-[0.9rem] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 text-[0.8rem] mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full px-4 py-2 text-[0.9rem] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-10 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <i
              className={`absolute right-1 text-gray-500 cursor-pointer ${
                showPassword ? "fa fa-eye-slash" : "fa fa-eye"
              }`}
            ></i>
          </button>
          {errors.password && (
            <p className="text-red-500 text-[0.8rem] mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#213555] hover:bg-[#3E5879] text-white py-2 rounded-md focus:outline-none focus:ring-2"
        >
          {loading ? (
            <ClipLoader loading={loading} color={"white"} size={12} />
          ) : (
            "Register"
          )}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account ?{" "}
          <Link
            to={"/"}
            className="text-sm hover:text-[#213555] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
