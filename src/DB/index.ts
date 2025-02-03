import { USER_ROLE } from '../modules/users/user.constant';
import { UserModel } from '../modules/users/user.model';


const superUser = {
  name: 'Adnan Hassan',
  email: 'adnanhassan@gmail.com',
  password: 'admin123456',
  needsPasswordChange: false,
  role: USER_ROLE.admin,
  status: 'active',

};

const seedAdmin = async () => {
  const isAdminExist = await UserModel.findOne({ role: USER_ROLE.admin });
  if (!isAdminExist) {
    await UserModel.create(superUser);
  }
};

export default seedAdmin;
