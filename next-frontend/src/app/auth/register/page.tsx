'use client';

import AuthFormProto from "@/components/auth/authFormProto";
import { Form, Input, Button, message, theme } from "antd";
import { Image, ImageUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const { token } = theme.useToken();
  const [form] = Form.useForm(); // Form instance
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // State to handle avatar preview

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
      name="Name"
      rules={[{ required: true, message: "Name is required" }]}
      className="w-full"
    >
      <Input placeholder="Your Name Here" />
    </Form.Item>,
  ];

  return (
    <div className="w-96 px-3 py-6 border" style={{ backgroundColor: "#ffffff" }}>
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
