//文章数据定义

/* 接口信息 */
export interface ArticleAPIKeyWord {
  articleId: string,
  acticleTitle: string,
  articlePicture: string,
  articleTime: string,
  articleType?: Array<tagTypes>,
  articleLikes: number,
  articleReadNum: number
}


export interface articleInfoInter {
  articleId: string,
  articleTitle: string,
  pictureUrl: string,
  fileUrl: string,
  createTime: string,
  tag: Array<tagTypes>,
  likesNum: number,
  commentNum: number,
  readNum: number
}

/* 文章标签 */
export type tagTypes = {
  label: string,
  tagType: string
}



