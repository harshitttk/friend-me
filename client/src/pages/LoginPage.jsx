import React from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <AuthForm type="login" />
      <p className="mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
