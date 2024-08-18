import React from 'react';
import {
  // Upload,
  Avatar,
  // message,
} from 'antd';
// import { CameraOutlined } from '@ant-design/icons';
import api from '../../libs/api';
import './index.css';

const AvatarUpload = ({
  avatarUrl,
  // , editMode, onAvatarChange
}) => {
  // const handleUpload = async (file) => {
  //   const formData = new FormData();
  //   formData.append('avatar', file);
  //   api
  //     .post('/api/avatar', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then((res) => {
  //       onAvatarChange(res.data.avatar);
  //     })
  //     .catch((err) => {
  //       message.error(err);
  //     });
  // };

  // const uploadProps = {
  //   disabled: !editMode,
  //   showUploadList: false,
  //   beforeUpload: (file) => {
  //     handleUpload(file);
  //     return false;
  //   },
  // };

  return (
    <div className="avatar-upload-container">
      {/* <Upload {...uploadProps}> */}
      <Avatar className="avatar" shape="square" size={100} src={avatarUrl} />
      {/* <div hidden={!editMode} className="avatar-upload-container-icon"> */}
      {/* <CameraOutlined /> */}
      {/* </div> */}
      {/* </Upload> */}
    </div>
  );
};

export default AvatarUpload;
