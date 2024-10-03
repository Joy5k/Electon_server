import { USER_ROLE } from "../../shared/type";
import config from "../config";
import { Users } from "../modules/users/user.model";

const superUser = {
    id: "0001",
    email: "mmehedihasanjoyv@gmail.com",
    password: config.super_admin_password,
    needsPasswordChange: false,
    role:USER_ROLE.SUPER_ADMIN,
    status: 'in-progress',
    isDeleted: false,
}
const seedSuperAdmin = async () => {
    const isSuperAdminExists = await Users.findOne({ role: USER_ROLE.SUPER_ADMIN })
    if (!isSuperAdminExists) {
        await Users.create(superUser)
    }
}
export default seedSuperAdmin;