import { UserRole } from '../modules/users/user.constant';
import { UserModel } from '../modules/users/user.model';

const superUser = {
  name: 'Adnan Hassan',
  email: 'adnanhassan@gmail.com',
  password: 'admin123456',
  needsPasswordChange: false,
  role: UserRole.ADMIN,
  status: 'active',
};

const seedAdmin = async () => {
  const isAdminExist = await UserModel.findOne({ role: UserRole.ADMIN });
  if (!isAdminExist) {
    await UserModel.create(superUser);
  }
};

export default seedAdmin;
