'use client';

import AuthFormProto from "@/components/auth/authFormProto";
import { message, theme } from "antd";
import Link from "next/link";

export default function Login() {
  const { token } = theme.useToken();
  const onSubmit = async (values: any) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if(res.ok){
        const data = await res.json();
        if(data.token){
          message.success("Successfully Logged In. Redirecting...");
          const redirect = document.getElementById("redirect");
          if(redirect){
            redirect.click();
          }
        }
        else{
          message.error("Something went wrong. Please try again");
        }
      }
      else{
        message.error("Invalid email or password");
      }
    }catch(err){
      console.error(err);
    }
  };

  const onSubmitFailed = (errorInfo: any) => {
    console.error("Submission failed:", errorInfo);
    message.error("Submission failed. Please correct the errors and try again.");
  };

  return (
    <div className="w-96 px-3 py-6 border rounded-md" style={{ backgroundColor: "#ffffff", transition: "all 0.3s" }}>
      <div className="flex justify-center w-full mb-5">
        <h1 className="font-bold text-xl">Sign In</h1>
      </div>
      <AuthFormProto
        onSubmit={onSubmit}
        onSubmitFailed={onSubmitFailed}
        formInputFields={[]}
        submitButtonText="Sign In"
      />
      <div className="flex justify-center w-full mb-2" style={{ color: token.colorPrimary }}>
        Forgot Password?
      </div>
      <div className="flex justify-center gap-1 w-full">
        Don't have an account? <Link href="/auth/register" style={{ color: token.colorPrimary }}>Sign Up</Link>
      </div>
      <Link href="/" className="hidden" id="redirect">Sign In</Link>
    </div>
  );
}
