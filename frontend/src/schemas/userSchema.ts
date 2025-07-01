import {z} from 'zod'

type TPassword = {
    password: string;
    confirmPassword: string
}
const passwordSchema = z.string().min(5).max(200)
const emailSchema = z.string().trim().email("Wrong email format").min(3).max(200)

export const User = z.object({
    name: z.string().max(200),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    role: z.enum(['USER', 'ADMIN', 'STAFF']).default('USER')
}).refine((val: TPassword) => val.password === val.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

export const Login = z.object({
    email: z.string().max(200),
    password: passwordSchema
})

export type UserSchemaProps = z.infer<typeof User>
export type UserSchemaLogin = z.infer<typeof Login>