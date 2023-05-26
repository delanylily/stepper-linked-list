export interface User {
  userDetails?: {
    displayName: string,
    language: string,
    profileImg: string;
  };
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  firstName?: string;
  lastName?: string;
  books?: any;
  profileImg?: any;

}
