export type TUser = {
  id: string;
  name: string;
};

export type TUserId = TUser['id'];

export type TCreateUser = Pick<TUser, 'name'>;

export type TEditUser = Pick<TUser, 'id'> & Partial<Pick<TUser, 'name'>>;
