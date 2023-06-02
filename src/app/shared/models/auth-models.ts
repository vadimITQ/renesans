
export interface UserCredentials {
  connectionName: string;
  connectionPassword: string;
}

export interface UserResponse {
  auth: boolean;
  roles: string[];
  token: string;
}
