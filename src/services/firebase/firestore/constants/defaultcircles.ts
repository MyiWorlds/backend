// These are the default circles used to be copied in order to

const myTheme = {
  id: 'my_theme',
};

const menuButton = {
  id: 'menu_button',
  title: 'Navigation Button',
  type: 'BUTTTON',
  data: {
    onClick: 'someValue',
    icon: 'menu',
  },
};

const uiName = {
  id: 'site_name',
  type: 'CUSTOM',
};

const profileMenu = {
  id: 'profile_menu',
  data: {
    // bunch
    // of
    // code
  },
};

const appController = {
  id: 'app_bar',
  title: 'App Menu controller',
  type: 'APP_BAR',
  lines: ['menu_button', 'site_name', 'profile_menu'],
};

const profileUi = {
  id: 'profile_ui',
  title: 'My User Interface',
  tags: ['user_interface'],
  type: 'LINES',
  lines: ['app_bar', 'navigation'],
};

const customCircle = {
  id: 'customCircle',
  data: {},
};

const profileCreated = {
  id: 'profileCreated',
};

// Do not think I need to do this anymore
// const myHistory = {
//   id: 'history',
//   public: true,
//   collection: 'circles',
//   type: 'GET_CIRCLES_BY_FILTERS',
//   settings: {
//     cursor: null,
//     filters: [
//       {
//         condition: '==',
//         property: 'parent',
//         value: 'history',
//       },
//     ],
//     numberOfResults: 12,
//     orderBy: 'dateUpdated',
//   },
//   creator: 'APP',
//   title: 'My History',
//   description:
//     'The history of what I have done on the platform.  This can be turned on/off through the profile controls.',
// };

const circles = [
  // Profile things
  myTheme,
  menuButton,
  uiName,
  profileMenu,
  appController,
  profileUi,
  profileCreated,
  // myHistory,

  // Content Types
  customCircle,
];

export default circles;
