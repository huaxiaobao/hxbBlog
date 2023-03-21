import { type } from 'os';
import { title } from 'process';


const defaultTitle: string = '花小宝'

type Meta = {
  title: string,
  [property: string]: any
}

/* 设置页面标题 */
export default function getPageTitle(meta: Meta): string {
  return `${meta.title || defaultTitle}`
}