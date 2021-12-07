import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import ServicePage from 'pages/entando-de-app/[language]/service.page';

jest.mock('next-auth/react');

describe('Tests the service page', () => {
  test('guest user tries to render private page', () => {
    const page = {
      title: 'My Test Service Page',
      group: 'administrators',
      secondaryGroups: [],
    };

    const session = {};

    verifyUserIsNotAuthorized({ page, session });
  });

  test('guest user can access public page', () => {
    const page = {
      title: 'My Test Service Page',
      group: 'free',
      secondaryGroups: ['reviewers', 'developers'],
    };

    const session = {};

    verifyUserIsAuthorized({ page, session });
  });

  test('user doesn\'t have correct permissions', () => {
    const page = {
      title: 'My Test Service Page',
      group: 'administrators',
      secondaryGroups: ['reviewers', 'developers'],
    };

    const session = {
      user: {
        permissions: [{ group: 'editors', role: 'editor' }]
      },
    };

    verifyUserIsNotAuthorized({ page, session });
  });

  test('user has correct permissions', () => {
    const page = {
      title: 'My Test Service Page',
      group: 'reviewers',
      secondaryGroups: ['reviewers', 'developers'],
    };

    const session = {
      user: {
        permissions: [{ group: 'reviewers', role: 'reviewers' }]
      },
    };

    verifyUserIsAuthorized({ page, session });
  });  
});

const verifyUserIsNotAuthorized = ({ page, session }) => {
  (useSession as jest.Mock).mockReturnValue({ data: session });

  render(<ServicePage page={page}/>);

  const content = screen.getByRole('heading', {
    name: /403: Not Authorized/i,
  });

  expect(content).toBeInTheDocument();
};

const verifyUserIsAuthorized = ({ page, session }) => {
  (useSession as jest.Mock).mockReturnValue({ data: session });

  render(<ServicePage page={page}/>);

  const content = screen.getByRole('heading', {
    name: /Welcome/i,
  });

  expect(content).toBeInTheDocument();
};
