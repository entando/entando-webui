
export interface IPermission {
  group: string
}

export interface ISession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    permissions?: Array<IPermission>
  }
}

export const useEntandoPermissions = (primaryGroup: string, secondaryGroups: Array<string>, session?: ISession) => {
  if (primaryGroup == 'free' || secondaryGroups.some((group: string) => group === 'free')) {
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
