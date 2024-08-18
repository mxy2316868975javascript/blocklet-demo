import React, { useState, useEffect } from 'react';
import api from '../libs/api';
import logo from '../assets/logo.png';
import { Form, Input, Button, Card, Row, Col, message } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  FieldTimeOutlined,
  CopyOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import AvatarUpload from '../components/AvatarUpload';
import './home.css';

/** 用户信息布局专用 */
const BaseLayout = ({ icon, label, value }) => {
  return (
    <Row gutter={[10, 10]} align="middle" style={{ width: '100%' }}>
      <Col flex="10px">{icon}</Col>
      <Col flex="70px" className="user-label">
        <strong>{label}</strong>
      </Col>
      :
      <Col flex="auto" align="left">
        {value}
      </Col>
    </Row>
  );
};

const Home = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);

  const formatTime = (s) => {
    if (!s) return;
    return new Date(s).toLocaleString();
  };

  /** 获取用户Profile信息 */
  const getProfile = () => {
    api
      .get('/api/profile')
      .then((res) => {
        if (res.status === 200) {
          if (res && res.data) {
            const modifiedTime = formatTime(res.data?.modifiedTime);
            setProfile({ ...res.data, modifiedTime });
          }
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  /**
   * 保存用户Profile信息
   */
  const updateProfile = (values) => {
    api
      .post('/api/profile', values)
      .then((res) => {
        if (res.status === 200) {
          setProfile({ ...values, avatar: profile.avatar });
          setEditMode(false);
          message.success('保存成功');
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSave = (values) => {
    const modifiedTime = formatTime(new Date().toISOString());
    const newValues = { ...values, modifiedTime };
    updateProfile(newValues);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(17621987970)
      .then(() => {
        message.success('复制成功');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAvatarChange = (avatarUrl) => {
    setProfile({ ...profile, avatar: avatarUrl });
  };

  return (
    <div>
      <div className="container">
        <Row>
          <img className="logo" src={logo} />
        </Row>
        <Row className="main-continer">
          <Card
            title={
              <>
                <Row className="avatar-container" type="flex" justify="center">
                  <AvatarUpload
                    avatarUrl={profile.avatar}
                    // editMode={editMode}
                    // onAvatarChange={handleAvatarChange}
                  />
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: '100%', height: 36 }}>
                  <Col onClick={handleCopy}>
                    UID <CopyOutlined />
                  </Col>
                </Row>
              </>
            }
            style={{ width: 380, margin: '0 auto' }}>
            {editMode ? (
              <Form initialValues={profile} onFinish={handleSave} layout="vertical">
                <Form.Item
                  name="username"
                  label={<strong>用户名</strong>}
                  rules={[{ required: true, message: '请填写用户名！' }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label={<strong>邮箱</strong>}
                  rules={[{ required: true, message: '请填写邮箱！' }]}>
                  <Input type="email" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label={<strong>手机号</strong>}
                  rules={[{ required: true, message: '请填写手机号！' }]}>
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
                    保存
                  </Button>
                  <Button style={{ marginLeft: '10px' }} onClick={() => setEditMode(false)}>
                    取消
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <>
                <Row gutter={[0, 10]}>
                  <BaseLayout icon={<UserOutlined />} label="用户名" value={profile.username} />
                  <BaseLayout icon={<MailOutlined />} label="邮箱" value={profile.email} />
                  <BaseLayout icon={<PhoneOutlined />} label="手机号" value={profile.phone} />
                  {profile.modifiedTime ? (
                    <BaseLayout icon={<FieldTimeOutlined />} label="修改时间" value={profile.modifiedTime} />
                  ) : null}
                </Row>
                <Row type="flex" justify="center" style={{ marginTop: 10 }}>
                  <Button icon={<EditOutlined />} hidden={editMode} type="primary" onClick={() => setEditMode(true)}>
                    编辑资料
                  </Button>
                </Row>
              </>
            )}
          </Card>
        </Row>
      </div>
    </div>
  );
};

export default Home;
