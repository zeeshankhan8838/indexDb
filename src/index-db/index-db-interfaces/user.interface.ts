export interface IUser {
  id: number;
  user_type_id: number;
  user_type_name: string;
  user_role_id: number;
  user_role_name: string;
  parent_user_id?: string;
  user_name_company_name?: string;
  first_name: string;
  last_name: string;
  gender: string;
  cnic: string;
  cnic_expiry: string;
  dob: string;
  email: string;
  password: string;
  phone_code: string;
  phone: string;
  status: string;
  active_status: string;
  address: string | null;
}
