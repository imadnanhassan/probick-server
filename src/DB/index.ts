import { USER_ROLE } from '../modules/users/user.constant';
import { User } from '../modules/users/user.model';

const superUser = {
  id: '0001',
  email: 'adnanhassan@gmail.com',
  password: 'admin123456',
  needsPasswordChange: false,
  role: USER_ROLE.admin,
  status: 'active',
  isDeleted: false,
};

const seedAdmin = async () => {
  const isAdminExist = await User.findOne({ role: USER_ROLE.admin });
  if (!isAdminExist) {
    await User.create(superUser);
  }
};

export default seedAdmin;
