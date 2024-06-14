"use client"
import React, { useState } from 'react'
import { userStore } from '../store/userStore'
import { useRouter } from 'next/navigation'

const useLogin = () => {
    const [err, setErr] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {updateUser} = userStore()

    const {push} = useRouter()

    const login = async(email, password)=>{
            setErr(null)
            setIsLoading(true)
            const requestOptions = {
                    method: "POST",
                    body: JSON.stringify({email, password}),
                    headers: {
                        "Content-type": "application/json",
                    }
                }
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, requestOptions)
                    const json = await response.json()
                    if (!response.ok) {
                        setErr(json.error)
                        setIsLoading(false)
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

  return {login, isLoading, err}
}

export default useLogin
