import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { authState, login } from '../redux/slicer/auth.slicer'
import { Login, type UserSchemaLogin } from '../schemas/userSchema';
import React from "react";
import { loginMutation } from "./api";
import { useMutation } from "@tanstack/react-query";

export default function useLoginAction(){
    const googleUrl = import.meta.env.VITE_API_BASE_URL + '/auth/google'
    const {isLoggedIn} = useSelector(authState)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {mutate, isPending} = useMutation({
        mutationFn: loginMutation
    })

    const {register, handleSubmit, formState: { errors }} = useForm<UserSchemaLogin>({
        resolver: zodResolver(Login),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (data: UserSchemaLogin) => {
            mutate(data, {
                onSuccess: () => {
                    dispatch(login(true))
                },
                onError: (error) => {
                    dispatch(login(false))
                    alert(error)
                }
            })
        }
    
    const onOauthLogin = () => {
        window.location.assign(googleUrl)
        dispatch(login(true))
    }

    const signup = () => {
        navigate({to: '/register'})
    }
    
    React.useEffect(() => {
            if (isLoggedIn) {
                navigate({to: '/dashboard'})
            }
        }, [isLoggedIn, navigate])

        
    return {isPending, register, handleSubmit, errors, onSubmit, onOauthLogin, signup}
}