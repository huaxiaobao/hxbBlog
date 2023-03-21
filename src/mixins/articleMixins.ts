
import { ref, onMounted, onUnmounted } from 'vue'

import { useRouter } from 'vue-router'

// /* 文章详情 */
interface queryParams {
  id: string,
  url: string
}


export const goTOArticle = (router: any, params:
  queryParams) => {
  router.push({ path: `articledetails`, query: params })
}

// export const goTOArticle = () => {

// }