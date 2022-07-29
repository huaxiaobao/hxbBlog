import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig({
  publicDir: '/',
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'api': path.resolve(__dirname, 'src/api')
    }
  },
  define: {
    'process.env': process.env
  },
  plugins: [
    vue(),
    AutoImport({
      //插件自动引入
      // resolvers: [ElementPlusResolver()],
    }),
    Components({
      // resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      symbolId: 'icon-[dir]-[name]',

    })
  ],
  server: {
    open: true, //自启浏览器端口
    port: 8080, //启动端口
    hmr: {
      host: '127.0.0.1',
      port: 8080
    },
    // 设置 https 代理
    proxy: {

    }
  }
})
