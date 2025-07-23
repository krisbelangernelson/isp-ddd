export type CustomerType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  createDate: Date;
  updateDate: Date;
};

export interface AccessToken {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CustomerBody extends Omit<AccessToken, 'id'> {
  id?: string;
  password?: string;
}

export interface Login extends Pick<CustomerType, 'email' | 'password'> {}

export interface LoginResponse extends AccessToken {
  accessToken: string;
}

export interface CustomerExists {
  email?: string;
  phone?: string;
}
