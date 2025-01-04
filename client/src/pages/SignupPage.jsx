import React from "react";
import AuthForm from "../components/AuthForm";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <AuthForm type="signup" />
      <p className="mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default SignupPage;
