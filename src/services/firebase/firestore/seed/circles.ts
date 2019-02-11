const circles: Circle[] = [
  // Fields to display/edit
  ////////////////////////////////////////
  {
    id: 'title-field-settings',
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
    lines: ['title-field-settings', 'description-field-settings'],
  },
  // Types
  ////////////////////////////////////////
  {
    id: 'all-fields',
    type: 'ALL_FIELDS',
    icon: 'group_work',
    title: 'All Fields',
    parent: null,
    settings: 'all-fields-settings',
    description: 'All content types on a circle',
  },
];

export default circles;
