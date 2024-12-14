'use client';
import { Button, Form, theme } from "antd";
import React from "react";

export default function FormElement({
    onSubmit,
    onSubmitFailed,
    formInputFields,
    submitButtonText
}: {
    onSubmit: (data: any) => void,
    onSubmitFailed: (error: any) => void,
    formInputFields: any[],
    submitButtonText: string
}){
    const [ form ] = Form.useForm();
    const { token } = theme.useToken();

    const onFinish = (values: any) => {
        onSubmit(values);
    }

    const onFinishFailed = (error: any) => {
        if(onSubmitFailed)
            onSubmitFailed(error);
    }

    if(!formInputFields){
        return (
            <Form   
                form={form}
                layout="horizontal"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >
            </Form>
        )
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            className="flex flex-col items-center px-3 pt-3 rounded-md"
            style={{
                backgroundColor: token.colorPrimaryBg,
            }}
        >
            {formInputFields.map((el: any, index: number) => {
                return React.cloneElement(el, {key: index});
            })}

            <Form.Item className="w-full">
                <Button type="primary" htmlType="submit" className="w-full">
                    {submitButtonText}
                </Button>
            </Form.Item>
        </Form>
    )
}