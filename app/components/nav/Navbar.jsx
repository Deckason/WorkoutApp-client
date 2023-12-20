"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from "./Navbar.module.css"
import { WorkoutStore } from '@/app/store/workoutStore'
import Image from 'next/image'
import mobile_logo from "../../../public/logo.png"
import { userStore } from "@/app/store/userStore"

const Navbar = () => {
  const {updateModal, modal, update_id, updateTitle, updateLoad, updateReps, updateErr, updateEdit,
          updateWorkoutsLocally} = WorkoutStore()
const {updateUser, user} = userStore()

useEffect(()=>{
  const localUser = JSON.parse(localStorage.getItem("user"))

  if (localUser) {
    updateUser(localUser)
  }
},[])

  const switchModal = () =>{
    updateErr(null)
    updateModal(!modal)
    if (!modal) {
      update_id("")
      updateTitle("")
      updateLoad("")
      updateReps("")
      updateEdit(false)
    }
  }

  const logout = ()=>{
    localStorage.removeItem("user")
    updateWorkoutsLocally("")
    updateUser(null)
  }
  return (
    <nav className={styles.nav}>
        <div className={styles.logo}>
            <Link href={"/"}>
            <Image 
              src={mobile_logo}
              alt="Logo"
              width={700}
              height={200}
            />
            </Link>
        </div>
        <div className={styles.navProfile}>
          {user && <div className={styles.profile}>
            <small>{user?.email}</small>
            <div className={styles.profileBtns}>
              <button className={styles.addTask} onClick={switchModal}>{!modal ? "Add Task" : "View Task"}</button>
              <button className={styles.logout} onClick={logout}>Log out</button>
            </div>
          </div>}
          {!user && <div className={styles.navAccess}>
            <Link href={"/login"}>Login</Link>
            <Link href={"/sign-up"}>Sign up</Link>
          </div>}
        </div>
    </nav>
  )
}

export default Navbar
