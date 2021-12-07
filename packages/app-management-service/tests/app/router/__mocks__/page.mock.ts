export const CREATE_PAGE_REQUEST = {
  seo: false,
  displayedInMenu: true,
  charset: 'utf-8',
  contentType: 'text/html',
  code: 'new_page',
  titles: {
    'en': 'new page'
  },
  parentCode: 'homepage',
  ownerGroup: 'administrators',
  pageModel: 'home'
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
