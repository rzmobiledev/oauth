import type { TRole } from "../schemas/userType";

export const Roles = {
    ADMIN: 'ADMIN' as TRole,
    USER: 'USER' as TRole,
    STAFF: 'STAFF' as TRole
};

export type TRolesVal = {
    value: TRole;
    label: string
}

export const TRolesOption: TRolesVal[] = [
    {value: Roles.ADMIN, label: 'Admin'},
    {value: Roles.USER, label: 'User'},
    {value: Roles.STAFF, label: 'Staff'}
]