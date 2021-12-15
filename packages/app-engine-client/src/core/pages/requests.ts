
export interface ICreatePageRequest {
  code: string
  titles: Map<string, string>
  parentCode: string
  ownerGroup: string
  pageModel: string
  seo: boolean
  displayedInMenu: boolean
  charset: string
  contentType: string
}

export interface IUpdatePageStatusRequest {
  status: string
}

export interface IClonePageRequest {
  newPageCode: string
  parentCode: string
  titles: Map<string, string>
}
