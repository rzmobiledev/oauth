import React from "react"
import { useNavigate } from "@tanstack/react-router"
import { useForm } from 'react-hook-form'
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { userRegisterMutation } from "./api"
import type { TUserRegister } from '../schemas/userType';
import { User } from "../schemas/userSchema"

export default function RegisterAction(){

    const navigate = useNavigate()
    const [success, setSuccess] = React.useState<string>('')
    const {mutate, isPending} = useMutation({
        mutationFn: userRegisterMutation
    })

    const {register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: zodResolver(User),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'USER'
        }
    })

    const onSubmit = (data: TUserRegister) => {
        mutate(data, {
            onSuccess: () => {
                setSuccess('User created')
                reset({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
            },
            onError: (error) => {
                alert("Error registering user")
                console.log(error)
            }
        })
    }

    const backToLoginPage = () => {
        navigate({to: '/'})
    }

    return {success, isPending, register, handleSubmit, errors, onSubmit, backToLoginPage}
}