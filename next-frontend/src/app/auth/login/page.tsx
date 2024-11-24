'use client';

import AuthFormProto from "@/components/auth/authFormProto";
import { Form, message, theme } from "antd";
import Link from "next/link";

export default function Login() {
  const { token } = theme.useToken();
  const onSubmit = (values: any) => {
    console.log("Submitted values:", values);

    if (values.Avatar) {
      const avatarFile = values.Avatar.file; // File from form values
      console.log("Avatar file:", avatarFile);
    }

    message.success("Form submitted successfully!");
  };

  const onSubmitFailed = (errorInfo: any) => {
    console.error("Submission failed:", errorInfo);
    message.error("Submission failed. Please correct the errors and try again.");
  };

  return (
    <div className="w-96 px-3 py-6 border" style={{ backgroundColor: "#ffffff" }}>
      <div className="flex justify-center w-full mb-5">
        <h1 className="font-bold text-xl">Sign In</h1>
      </div>
      <AuthFormProto
        onSubmit={onSubmit}
        onSubmitFailed={onSubmitFailed}
        formInputFields={[]}
        submitButtonText="Sign Up"
      />
      <div className="flex justify-center w-full mb-2" style={{ color: token.colorPrimary }}>
        Forgot Password?
      </div>
      <div className="flex justify-center gap-1 w-full">
        Don't have an account? <Link href="/auth/register" style={{ color: token.colorPrimary }}>Sign Up</Link>
      </div>
    </div>
  );
}
