import React from "react";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3>Test login credentials:</h3>
      <h4>Username: test</h4>
      <h4>Password: test123</h4>
      <AuthForm type="login" />
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to={"/signup"} className="underline text-blue-600">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
