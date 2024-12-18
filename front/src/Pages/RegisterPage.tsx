import React from 'react';
import { useState } from 'react';
import { Card, Form, Input, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom'; // If you are using React Router for navigation

const { Text } = Typography;

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = () => {
        console.log(username, email, password, passwordConfirmation);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "rgb(240, 242, 245)" }}>
            <Card style={{ width: 350 }} title="Login">
                <Space
                    direction='vertical'
                    size={16}
                    style={{ width: '100%' }}
                >
                    <Input placeholder="Username" onChange={e => setUsername(e.target.value)} />
                    <Input placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <Input.Password placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <Input.Password placeholder="Confirm Password" onChange={e => setPasswordConfirmation(e.target.value)} />

                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        onClick={handleSubmit}
                    >
                        Register
                    </Button>

                    <Text>
                        Already have an account? <Link to="/login">Log-in</Link>
                    </Text>
                </Space>
            </Card>
        </div>
    );
};

export default RegisterPage;
