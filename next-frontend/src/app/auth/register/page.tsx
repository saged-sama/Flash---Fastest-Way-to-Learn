'use client';

import AuthFormProto from "@/components/auth/authFormProto";
import { springbase } from "@/lib/springbase";
import { Form, Input, Button, message, theme } from "antd";
import { Image, ImageUp } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const { token } = theme.useToken();
  const [form] = Form.useForm(); // Form instance
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // State to handle avatar preview

  const onSubmit = async (values: any) => {
    console.log(values);
    let formData = new FormData();
    Object.keys(values).forEach((key) => {
      if(Array.isArray(values[key])){
          values[key].forEach((items, index) => {
            formData.append(`${key}[${index}]`, items);
          });
      }
      else{
        formData.append(key, values[key]);
      }
    });
    formData.append("avatarFile", values.Avatar[0].originFileObj);
    const response = await springbase.collection("users").create(formData);
    if(response){
      redirect("/auth/login");
    }
  };

  const onSubmitFailed = (errorInfo: any) => {
    console.error("Submission failed:", errorInfo);
    message.error("Submission failed. Please correct the errors and try again.");
  };

  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Set avatar preview URL
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);

      // Set the file value in the form
      form.setFieldsValue({
        Avatar: { file },
      });
    }
  };

  const formInputFields: any[] = [
    <Form.Item
      name="Avatar"
      className="flex flex-col items-center w-full"
      valuePropName="file"
    >
      <label className="cursor-pointer">
        <div className="relative w-40 h-40 rounded-full border overflow-hidden">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="absolute w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <ImageUp className="w-20 h-20" />
            </div>
          )}
        </div>
        <div className="hidden">
            <Input type="file" onChange={handleAvatarChange} />
        </div>
      </label>
    </Form.Item>,

    <Form.Item
      name="name"
      rules={[{ required: true, message: "Name is required" }]}
      className="w-full"
    >
      <Input placeholder="Your Name Here" />
    </Form.Item>,

    <Form.Item
      name="username"
      rules={
        [
          { required: true, message: "Username is required" },
          { min: 4, message: "Username must be at least 4 characters" },
        ]
      }
      className="w-full"
    >
      <Input placeholder="Give yourselfs a username" />
    </Form.Item>
  ];

  return (
    <div className="w-96 px-3 py-6 border" style={{ backgroundColor: "#ffffff" }}>
      <div className="flex justify-center w-full mb-5">
        <h1 className="font-bold text-xl">Sign Up</h1>
      </div>
      <AuthFormProto
        onSubmit={onSubmit}
        onSubmitFailed={onSubmitFailed}
        formInputFields={formInputFields}
        submitButtonText="Sign Up"
      />
      <div className="flex justify-center gap-1 w-full">
        Already have an account? <Link href="/auth/login" style={{ color: token.colorPrimary }}>Sign In</Link>
      </div>
    </div>
  );
}
