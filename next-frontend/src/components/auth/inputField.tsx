import { Form, Input } from "antd"

export default function InputField({
    label,
    name,
    placeholder,
    required
}: {
    label: string,
    name: string,
    placeholder: string,
    required: boolean
}){
    return (
        <Form.Item
            label={label}
            name={name}
            rules={[
                { required: required, message: 'Email'},
                { type: 'email', message: 'Please make sure the Email is valid'}
            ]}
        >
            <Input />
        </Form.Item>
    )
}