export interface FormData {
    title: string
    department: string
    deadline: Date
    priority: string
    description: string
  };

export interface FormRegister {
    firstName: string
    lastName: string
    email: string
    department: string
    password: string
    repPassword: string
  };

export interface FormSignin {
    email: string
    password: string
  };
  
export interface FilterOptions {
    value: string;
    label: string;
  }

export interface State {
  authenticated: boolean;
  tickets: string[];
}