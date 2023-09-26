import { IUser } from '../index-db-interfaces/user.interface';

export class User implements IUser {
  id = 0;
  user_type_id = 0;
  user_type_name = '';
  user_role_id = 0;
  user_role_name = '';
  parent_user_id?: string;
  user_name_company_name?: string;
  first_name = '';
  last_name = '';
  gender = '';
  cnic = '';
  cnic_expiry = '';
  dob = '';
  email = '';
  password = '';
  phone_code = '';
  phone = '';
  status = '';
  active_status = '';
  address: string | null = null;
}
