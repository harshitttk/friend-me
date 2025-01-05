import React from "react";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <AuthForm type="signup" />
      <p className="mt-4">
        Already have an account?{" "}
        <Link to={"/login"} className="underline text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
