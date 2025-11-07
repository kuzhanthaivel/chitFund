import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { toast, Toaster } from "react-hot-toast";
import baseUri from "../utils/baseUri";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const isloggedIn = localStorage.getItem("token");
    if (isloggedIn) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      console.error("Passwords do not match");
      setIsMatch(false);
    } else {
      setIsMatch(true);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUri}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password, phone: phoneNo }) ,
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Signup successful");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error during signup: " + error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster position="top-right" />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h2>
        <form className="space-y-4">
          <Input
            label="User Name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="enter your username"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm your password"
            required
          />
          {!isMatch && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}
          <Input
            label="Phone no"
            type="number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="enter your phone no"
            required
          />
          <Button text="Sign Up" disabled={!isMatch} onClick={handleSubmit} />
        </form>
        <div className="mt-4">
          <p className=" text-gray-800 text-center">
            {" "}
            Already have account ?{" "}
            <a className="text-blue-600 no-underline " href="/login">
              {" "}
              Log In
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
