import user from './user';
import { Circle } from '../../../../customTypeScriptTypes/circle';

const circles: Circle[] = [
  // Fields to display/edit
  ////////////////////////////////////////
  {
    id: 'title-field-settings',
    creator: user.id,
    type: 'TEXT',
    data: {
      property: 'title',
      variant: 'body1',
      defaultValue: 'Some String',
      styles: {
        background: 'red',
      },
    },
  },
  {
    id: 'description-field-settings',
    type: 'TEXT',
    creator: user.id,
    data: {
      property: 'description',
      variant: 'body1',
      defaultValue: 'Some String',
      styles: {
        background: 'red',
      },
    },
  },
  // Settings
  ////////////////////////////////////////
  {
    id: 'all-fields-settings',
    type: 'LINES',
    cached: true,
    cache: {
      // Fill with lines fetched
    },
    creator: user.id,
    lines: ['title-field-settings', 'description-field-settings'],
  },
  // Types
  ////////////////////////////////////////
  {
    id: 'all-fields',
    type: 'ALL_FIELDS',
    icon: 'group_work',
    title: 'All Fields',
    creator: user.id,
    parent: null,
    settings: 'all-fields-settings',
    description: 'All content types on a circle',
  },
  {
    id: 'app-created-types',
    type: 'LINES',
    icon: 'list',
    title: 'App approved types',
    creator: user.id,
    parent: null,
    settings: '',
    description: 'Types that the App creators approved for use.',
    lines: ['all-fields'],
  },
];

export default circles;
