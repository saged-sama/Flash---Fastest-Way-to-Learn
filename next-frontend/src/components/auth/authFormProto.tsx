import { Form, Input, message } from "antd";
import FormElement from "./formElement";

export default function AuthFormProto({
    onSubmit,
    onSubmitFailed,
    formInputFields,
    submitButtonText
}: {
    onSubmit: (values: any) => void,
    onSubmitFailed: (error: any) => void,
    formInputFields: any[],
    submitButtonText: string
}){

    const inputFields = [
        ...formInputFields,
        <Form.Item
            name={"email"}
            rules={[
                {required: true, message: "Email is required"},
                {type: "email", message: "Please ensure you entered a valid email"}
            ]}
            className="w-full"
        >
            <Input placeholder="Your Email here"/>
        </Form.Item>,
        <Form.Item
            name="password"
            rules={[
                {required: true, message: "Please set a password"},
                {type: "regexp", message: "Please set a strong Password"}
            ]}
            className="w-full"
        >
            <Input type="password" placeholder="Password"/>
        </Form.Item>
    ]

    return (
        <FormElement
            onSubmit={onSubmit}
            onSubmitFailed={onSubmitFailed}
            formInputFields={inputFields}
            submitButtonText={submitButtonText}
        />
    );
}