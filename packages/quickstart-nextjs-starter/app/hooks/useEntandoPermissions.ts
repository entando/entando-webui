
export const useEntandoPermissions = (primaryGroup, secondaryGroups, session) => {
  if (primaryGroup == 'free' || secondaryGroups.some(group => group === 'free')) {
    return true;
  }

  if (!session || !session.user || !session.user.permissions) {
    return false;
  }

  const permissions = session.user.permissions.map(auth => auth.group);
  const authorizedGroups = [primaryGroup, ...secondaryGroups];

  return permissions.some((permission) => 
    authorizedGroups.some(group => permission === group));
};
