import React from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3>Test login credentials:</h3>
      <h4>Username: test</h4>
      <h4>Password: test123</h4>
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
