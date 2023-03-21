/*
 * @Author: huaxiaobao 1751517437@qq.com
 * @Date: 2022-06-14 22:36:35
 * @LastEditors: huaxiaobao 1751517437@qq.com
 * @LastEditTime: 2022-12-12 17:58:11
 * @FilePath: \lxh-blog\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export default defineConfig({
  base: './',
  publicDir: path.resolve(__dirname, './dist'),
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
      port: 8080,
      overlay: {

      }
    },
    // 设置 https 代理
    proxy: {
      '/api': {
        target: 'http://175.178.87.125:4000/hxbBlog', //代理目标端口
        changOrigin: true, //是否跨域
        rewrite: (path) => path.replace(/^\/api/, '') //代理使用api，但是访问的后台接口不会增加/api这个路径（如果加上了，可能引起接口404）

      }
    }
  }
})
