import { USER_ROLE } from "../../shared/type";
import config from "../config";
import { Users } from "../modules/users/user.model";

const superUser = {
    id: "0001",
    firstName: "Mehedi Hasan",
    lastName: "Joy",
    email: "mmehedihasanjoyv@gmail.com",
    password: config.super_admin_password,
    needsPasswordChange: false,
    role: USER_ROLE.SUPER_ADMIN,
    status: "active",
    isDeleted: false,
};

const seedSuperAdmin = async () => {
    // Check if a super admin exists (even if deleted)
    const existingSuperAdmin = await Users.findOne({ email: superUser.email });

    if (existingSuperAdmin) {
        // If found but marked as deleted, reactivate it
        if (existingSuperAdmin.isDeleted) {
            existingSuperAdmin.isDeleted = false;
            existingSuperAdmin.status = "active";
            await existingSuperAdmin.save();
            console.log("Super admin reactivated!");
        } else {
            console.log("Super admin already exists and is active.");
        }
    } else {
        // Create new super admin if not found
        await Users.create(superUser);
        console.log("Super admin created!");
    }
};

export default seedSuperAdmin;
