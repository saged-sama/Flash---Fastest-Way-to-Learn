'use client';
import { Button, Form } from "antd";

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
            className="flex flex-col items-center"
        >
            {formInputFields.map((el: any) => {
                return (el);
            })}

            <Form.Item className="w-full">
                <Button type="primary" htmlType="submit" className="w-full">
                    {submitButtonText}
                </Button>
            </Form.Item>
        </Form>
    )
}