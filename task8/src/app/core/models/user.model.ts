export interface IUser {
  id: string;
  name: string;
  surname: string;
}

export interface IGoogleUser {
  id: string;
  name: {
    familyName: string;
    givenName: string;
  };
}
