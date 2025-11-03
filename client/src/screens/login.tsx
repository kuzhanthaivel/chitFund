import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const events = e.currentTarget.elements;
    const formElements = events as typeof events & {
      userName: HTMLInputElement;
      password: HTMLInputElement;
    };
    const userName = formElements.userName.value;
    const password = formElements.password.value;
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Login successful");
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        toast.error("Login failed: " + data.message); 
      }
    } catch (error) {
      toast.error("Error during login: " + error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster position="top-right" />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="userName"
            label="User Name"
            type="text"
            placeholder="enter your username"
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="enter your password"
            required
          />
          <div className="flex items-center justify-between">
            <Button text="Login" type="submit" onClick={() => {}} />
          </div>
        </form>
        <div className="mt-4">
          <p className=" text-gray-800 text-center">
            {" "}
            Don't have an account ?{" "}
            <a className="text-blue-600 no-underline " href="/signup">
              {" "}
              Sign Up
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
