import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import LayerBox from 'components/LayerBox.vue'
import CustomTitile from 'components/CustomTitle/index.vue'
import BarTitle from 'components/CustomTitle/BarTitle.vue'
import CustomParagraph from 'components/CustomParagraph/index.vue'
import Card from 'components/CustomCard/index.vue'
import ArticleCard from 'components/CustomCard/ArticleCard.vue'
import ArticleListCard from 'components/CustomCard/ArticleListCard.vue'
import Vue from 'vue'
export default (Vue: Vue) => {
  Vue.component('LayerBox', LayerBox)
  Vue.component('CustomTitile', CustomTitile)
  Vue.component('BarTitle', BarTitle)
  Vue.component('CustomParagraph', CustomParagraph)
  Vue.component('Card', Card)
  Vue.component('ArticleCard', ArticleCard)
  Vue.component('ArticleListCard', ArticleListCard)

  /* 注册element 图标 */
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    Vue.component(key, component)
  }
}
