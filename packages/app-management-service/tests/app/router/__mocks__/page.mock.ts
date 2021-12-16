export const CREATE_PAGE_REQUEST = {
  code: 'new_page',
  titles: {
    'en': 'New Page',
    'it': 'Nuova Pagina'
  },
  parentCode: 'homepage',
  ownerGroup: 'administrators',
  pageModel: 'home',
  seo: false,
  displayedInMenu: true,
  charset: 'utf-8',
  contentType: 'text/html',
};

export const CREATE_NX_PAGE_RESPONSE = {
  code: 'new_page',
  status: 'unpublished',
  type: 'nx',
  onlineInstance: false,
  displayedInMenu: true,
  pageModel: 'home',
  charset: 'utf-8',
  contentType: 'text/html',
  parentCode: 'homepage',
  seo: false,
  titles: {
    en: 'New Page',
    it: 'Nuova Pagina'
  },
  fullTitles: {
    en: 'Home / New Page',
    it: 'Home / Nuova Pagina'
  },
  ownerGroup: 'administrators',
  joinGroups: [],
  children: [],
  position: 8,
  numWidget: 0,
  lastModified: '2021-12-08 14:12:35',
  fullPath: 'homepage/new_page',
  token: null
};

export const CREATE_LEGACY_PAGE_RESPONSE = {
  ...CREATE_NX_PAGE_RESPONSE,
  type: 'legacy',
};

export const UPDATE_PAGE_REQUEST = {
  ...CREATE_PAGE_REQUEST,
  parentCode: 'service',
};

export const UPDATE_PAGE_RESPONSE = {
  ...CREATE_NX_PAGE_RESPONSE,
  parentCode: UPDATE_PAGE_REQUEST.parentCode,
};

export const UPDATE_TO_LEGACY_PAGE_RESPONSE = {
  ...UPDATE_PAGE_RESPONSE,
  type: 'legacy',
};

export const UPDATE_TO_NX_PAGE_RESPONSE = {
  ...UPDATE_PAGE_RESPONSE,
  type: 'nx',
};

export const CLONE_PAGE_REQUEST = {
  newPageCode: 'cloned_page',
  titles: {
    'en': 'Cloned Page',
    'it': 'Pagina Clonata'
  },
  parentCode: 'new_page'
};

export const CLONE_PAGE_RESPONSE = {
  code: 'cloned_page',
  status: 'unpublished',
  type: 'nx',
  onlineInstance: false,
  displayedInMenu: true,
  pageModel: 'home',
  charset: 'utf-8',
  contentType: 'text/html',
  parentCode: 'new_page',
  seo: false,
  titles: {
    'en': 'Cloned Page',
    'it': 'Pagina Clonata'
  },
  fullTitles: {
    en: 'Home / Cloned Page',
    it: 'Home / Pagina Clonata'
  },
  ownerGroup: 'administrators',
  joinGroups: [],
  children: [],
  position: 8,
  numWidget: 0,
  lastModified: '2021-12-08 14:12:35',
  fullPath: 'homepage/new_page/cloned_page',
  token: null
};

export const CREATE_VALIDATION_ERRORS = [
  'code must be a string',
  'titles should not be null or undefined',
  'parentCode must be a string',
  'ownerGroup must be a string',
  'pageModel must be a string',
  'seo must be a boolean value',
  'displayedInMenu must be a boolean value',
  'charset must be a string',
  'contentType must be a string'
];

export const UPDATE_VALIDATION_ERRORS = CREATE_VALIDATION_ERRORS;

export const CLONE_VALIDATION_ERRORS = [
  'parentCode must be a string',
  'titles should not be null or undefined'
];

export const UPDATE_STATUS_VALIDATION_ERRORS_INVALID_STATUS = [
  'status must be one of the following values: draft, published',
];

export const UPDATE_STATUS_VALIDATION_ERRORS_EMPTY_BODY = [
  'status must be one of the following values: draft, published',
  'status must be a string',
];
