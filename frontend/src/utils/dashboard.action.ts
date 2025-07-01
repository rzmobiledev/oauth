import React, { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useDispatch, useSelector } from "react-redux"
import { authState, login } from "../redux/slicer/auth.slicer"
import { logoutMutation } from "./api"
import { persistor } from "../redux/store/store"

export default function DashboardAction(){

    const dispatch = useDispatch()
    const {isLoggedIn} = useSelector(authState)
    const navigate = useNavigate()

    const {mutate} = useMutation({
        mutationFn: logoutMutation
    })

    const [isDarkBody, setIsDarkBody] = React.useState<boolean>(false)
    const [isMenuToggled, setIsMenuToggled] = React.useState<boolean>(false)

    useEffect(() => {
        if(isDarkBody){
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    },[isDarkBody])

    useEffect(() => {
        if(!isLoggedIn){
            navigate({to: '/'})
        }
    },[navigate, isLoggedIn])


    const signOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        mutate(undefined, {
            onSuccess: () => {
                dispatch(login(false))
                persistor.purge()
            },
            onError: (error) => {
                alert(error)
                persistor.purge()
            }
        })
    }

    const toggleDarkBody = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDarkBody(!isDarkBody);
      };
      
    const toggleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsMenuToggled(!isMenuToggled)
    }

    return {isMenuToggled, signOut, toggleDarkBody, toggleMenu}
}