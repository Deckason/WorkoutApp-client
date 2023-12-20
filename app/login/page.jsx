"use client"
import React, { useEffect, useState } from 'react'
import styles from "./login.module.css"
import { userStore } from "@/app/store/userStore"
import useLogin from '../hooks/useLogin'
import { useRouter } from 'next/navigation'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {login, isLoading, err} = useLogin()
    const {user} = userStore()
    const {push} = useRouter()

    useEffect(()=>{
        if(user){
          push("/")
        }
    },[])

    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        await login(email, password)
    }


  return (
    <div className={styles.form_container}>
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label className={styles.label} htmlFor="Email">Email:
                <input type="email" value={email} onChange={e=>setEmail(e.target.value.trim())} />
            </label>
            <label className={styles.label} htmlFor="Password">Password:
                <input type="password" autoComplete='new-password' value={password} onChange={e=>setPassword(e.target.value.trim())} />
            </label>
            {err && <small className={styles.err}>{err}</small>}
            <button disabled={isLoading}>{isLoading ? "Loading...":"Login"}</button>
    </form>
    </div>
  )
}

export default Login
