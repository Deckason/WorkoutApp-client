"use client"
import React, { useState } from 'react'
import { userStore } from '../store/userStore'
import { useRouter } from 'next/navigation'

const useSignUp = () => {

    const [err, setErr] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const {updateUser} = userStore()
    const {push} = useRouter()
            
    const signUp = async (username, email, password, confirmPassword)=>{
        setIsLoading(true)
        setErr(null)

        const requestOptions = {
                method: "POST",
                body: JSON.stringify({username, email, password, confirmPassword}),
                headers: {
                    "Content-type": "application/json",
                    // "Authorization":`bearer ${user.token}`
                }
            }
            try {
                const response = await fetch("http://localhost:4000/users/sign-up", requestOptions)
                const json = await response.json()
                if (!response.ok) {
                    setIsLoading(false)
                    setErr(json.error)
                }
                if (response.ok) {
                  setErr(null)
                  localStorage.setItem("user", JSON.stringify(json))
                  updateUser(json)
                  setIsLoading(false)
                  push("/")
                }
            } catch (error) {
                setErr(error.message)
                setIsLoading(false)
            }
    }
        

  return {err, isLoading, signUp}
}

export default useSignUp
