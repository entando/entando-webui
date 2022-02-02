import { ISession, useEntandoPermissions } from './useEntandoPermissions';

describe('invalid or empty session', () => {
  test('no session', () => {
    //Given
    const primaryGroup = 'administrators';
    const secondaryGroups: Array<string> = [];
    const session = undefined;
  
    //When
    const isAuthorized = useEntandoPermissions(primaryGroup, secondaryGroups, session);
  
    //Then
    expect(isAuthorized).toBeFalsy();
  });

  test('no session but group is \'free\'', () => {
    //Given
    const primaryGroup = 'free';
    const secondaryGroups: Array<string> = [];
    const session = undefined;
  
    //When
    const isAuthorized = useEntandoPermissions(primaryGroup, secondaryGroups, session);
  
    //Then
    expect(isAuthorized).toBeTruthy();
  });
});


test('empty session', () => {
  //Given
  const primaryGroup = 'administrators';
  const secondaryGroups: Array<string> = [];
  const session = {};

  //When
  const isAuthorized = useEntandoPermissions(primaryGroup, secondaryGroups, session);

  //Then
  expect(isAuthorized).toBeFalsy();
});

test('empty session but group is \'free\'', () => {
  //Given
  const primaryGroup = 'free';
  const secondaryGroups: Array<string> = [];
  const session = {};

  //When
  const isAuthorized = useEntandoPermissions(primaryGroup, secondaryGroups, session);

  //Then
  expect(isAuthorized).toBeTruthy();
});

test('undefined permissions', () => {
  //Given
  const primaryGroup = 'administrators';
  const secondaryGroups: Array<string> = [];
  const session: ISession = {
    user: {
      permissions: undefined
    }
  };

  //When
  const isAuthorized = useEntandoPermissions(primaryGroup, secondaryGroups, session);

  //Then
  expect(isAuthorized).toBeFalsy();
});

test('undefined permissions but group is \'free\'', () => {
  //Given
  const primaryGroup = 'free';
  const secondaryGroups: Array<string> = [];
  const session = {
    user: {
      permissions: undefined
    }
  };

  //When
  const isAuthorized = useEntandoPermissions(primaryGroup, secondaryGroups, session);

  //Then
  expect(isAuthorized).toBeTruthy();
});

describe('authorizes guest user on \'free\' group', () => {
  test('guest user on \'free\' main group', () => {
    //Given
    const primaryGroup = 'free';
    const secondaryGroups: Array<string> = [];
    const session = {
      user: {
        permissions: []
      }
    };
  
    //When
    const isAuthorized = useEntandoPermissions(primaryGroup, secondaryGroups, session);
  
    //Then
    expect(isAuthorized).toBeTruthy();
  });

  test('guest user on \'free\' secondary group', () => {
    //Given
    const primaryGroup = 'administrators';
    const secondaryGroups = ['free'];
    const session = {
      user: {
        permissions: []
      }
    };
  
    //When
    const isAuthorized = useEntandoPermissions(primaryGroup, secondaryGroups, session);
  
    //Then
    expect(isAuthorized).toBeTruthy();
  });
});

describe('authorizes user on given group', () => {
  test('user with correct permissions on main group', () => {
    //Given
    const primaryGroup = 'administrators';
    const secondaryGroups: Array<string> = [];
    const session = {
      user: {
        permissions: [{ group: 'administrators', role: 'admin' }]
      }
    };
  
    //When
    const isAuthorized = useEntandoPermissions(primaryGroup, secondaryGroups, session);
  
    //Then
    expect(isAuthorized).toBeTruthy();
  });

  test('user with correct permissions on secondary group', () => {
    //Given
    const primaryGroup = 'administrators';
    const secondaryGroups = ['reviewers', 'editors'];
    const session = {
      user: {
        permissions: [{ group: 'editors', role: 'editor' }]
      }
    };
  
    //When
    const isAuthorized = useEntandoPermissions(primaryGroup, secondaryGroups, session);
  
    //Then
    expect(isAuthorized).toBeTruthy();
  });

  test('denies user without correct permissions', () => {
    //Given
    const primaryGroup = 'administrators';
    const secondaryGroups = ['reviewers', 'editors'];
    const session = {
      user: {
        permissions: [{ group: 'developers', role: 'devleloper' }]
      }
    };
  
    //When
    const isAuthorized = useEntandoPermissions(primaryGroup, secondaryGroups, session);
  
    //Then
    expect(isAuthorized).toBeFalsy();
  });
});
