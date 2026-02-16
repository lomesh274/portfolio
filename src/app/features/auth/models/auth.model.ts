export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  displayName?: string;
}

export enum AuthStatus {
  INITIALIZING = 'INITIALIZING',
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  ERROR = 'ERROR'
}
