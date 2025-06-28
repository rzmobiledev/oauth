type TGoogleName = {
  givenName: string;
  familyName: string;
};

type TGoogleEmail = {
  value: string;
  verified: boolean;
};

type TGooglePhotos = {
  value: string;
};

export type TGoogleProfile = {
  id: string;
  name: TGoogleName;
  emails: TGoogleEmail[];
  photos: TGooglePhotos[];
};

export type TGoogleUser = {
  id: string;
  email: string;
  name: string;
  picture: string;
  accessToken: string;
};
