import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Divider } from 'antd';
import api from '../libs/api';
import './home.css';
import { message } from 'antd';

const BaseLayout = ({label, value}) => {
  return (
    <Row gutter={[10, 10]} style={{width:'100%'}}>
      <Col flex="100px" align="right">
        <strong>{label}:</strong>
      </Col>
      <Col flex="auto" align="left">
        {value}
      </Col>
    </Row>
  )
}

const Home = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // 获取用户Profile信息
    api
      .get('/api/profile')
      .then((res) => {
        if (res.status === 200) {
          setProfile(res.data);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  }, []);

  const handleSave = (values) => {
    // 保存用户Profile信息
    api
      .post('/api/profile', values)
      .then((res) => {
        if (res.status === 200) {
          setProfile(values);
          setEditMode(false);
          message.success('保存成功');
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  return (
    <div className="container">
      <Card title={`${editMode ? '编辑': ''}用户信息`} style={{ width: 360 }}>
        {editMode ? (
          <Form initialValues={profile} onFinish={handleSave} layout="vertical">
            <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请填写用户名！' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请填写邮箱！' }]}>
              <Input type="email" />
            </Form.Item>
            <Form.Item name="phone" label="联系方式" rules={[{ required: true, message: '请填写联系方式！' }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button style={{ marginLeft: '10px' }} onClick={() => setEditMode(false)}>
                取消
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Row gutter={[0, 24]} style={{ width: '100%' }}>
            <BaseLayout label='用户名' value={profile.username}/>
            <BaseLayout label='邮箱' value={profile.email}/>
            <BaseLayout label='联系方式' value={profile.phone}/>
            <Row type='flex' align='center' style={{width: '100%'}}>
              <Button type="primary" onClick={() => setEditMode(true)}>
                编辑
              </Button>
            </Row>
          </Row>
        )}
      </Card>
    </div>
  );
};

export default Home;
