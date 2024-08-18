import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import svgr from 'vite-plugin-svgr';
// import fs from 'fs';
// import path from 'path';

// // 插件：在构建完成后创建 'uploads' 目录
// const createUploadsDirPlugin = () => {
//   return {
//     name: 'create-uploads-dir',
//     closeBundle() {
//       const uploadDir = path.join(__dirname, 'dist', 'uploads');
      
//       if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//         console.log('Uploads 目录创建成功:', uploadDir);
//       } else {
//         console.log('Uploads 目录已经存在:', uploadDir);
//       }
//     }
//   };
// }


// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), createBlockletPlugin({ disableLoading: true }), svgr()],
  };
});
