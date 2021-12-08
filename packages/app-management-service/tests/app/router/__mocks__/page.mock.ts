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

export const CREATE_PAGE_RESPONSE = {
  code: 'new_page',
  status: 'unpublished',
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

export const CREATE_VALIDATION_ERRORS = [
  'titles should not be null or undefined',
  'parentCode must be a string',
  'ownerGroup must be a string',
  'pageModel must be a string',
  'seo must be a boolean value',
  'displayedInMenu must be a boolean value',
  'charset must be a string',
  'contentType must be a string'
];
