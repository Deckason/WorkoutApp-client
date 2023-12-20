"use client"
import React, { useEffect, useState } from 'react'
import styles from "./signup.module.css"
import useSignUp from '../hooks/useSignUp'
import { useRouter } from 'next/navigation'
import { userStore } from "@/app/store/userStore"

const SignUp = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const {err, isLoading, signUp} = useSignUp()
    const {push} = useRouter()
    const {user} = userStore()

    useEffect(()=>{
        if(user){
          push("/")
        }
    },[])
            
    const handleSubmit = async (e)=>{
        e.preventDefault()
        await signUp(username, email, password, confirmPassword)
        }
        return (
    <div className={styles.form_container}>
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label className={styles.label} htmlFor="Username">Username:
                <input type="text" value={username} onChange={e=>setUsername(e.target.value.trim())} />
            </label>
            <label className={styles.label} htmlFor="Email">Email:
                <input type="email" value={email} onChange={e=>setEmail(e.target.value.trim())} />
            </label>
            <label className={styles.label} htmlFor="Password">Password:
                <input type="password" autoComplete='new-password' value={password} onChange={e=>setPassword(e.target.value.trim())} />
            </label>
            <label className={styles.label} htmlFor="Confirm-Password">Confirm Password:
                <input type="password" autoComplete='new-password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value.trim())} />
            </label>
            {err && <small className={styles.err}>{err}</small>}
            <button disabled={isLoading}>{isLoading ? "Loading...": "Sign Up"}</button>
    </form>
    </div>
  )
}

export default SignUp