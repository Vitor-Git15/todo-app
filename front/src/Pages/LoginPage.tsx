import React, { useState } from 'react';
import { Card, Input, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "rgb(240, 242, 245)" }}>
      <Card style={{ width: 350 }} title="Login">
        <Space direction='vertical' size={16} style={{ width: '100%' }}>
          <Input 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%' }} 
          />
          <Input.Password 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%' }} 
          />
          <Button type="primary" block onClick={() => console.log({ email, password })}>
            Log in
          </Button>
          <Text>
            New user? <Link to="/register">Create an account</Link>
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;
