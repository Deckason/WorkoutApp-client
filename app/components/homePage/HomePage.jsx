"use client"
import React, { useEffect } from 'react'
import styles from "./HomePage.module.css"
import WorkoutDetails from '../workoutDetails/WorkoutDetails'
import WorkoutForm from '../workoutForm/WorkoutForm'
import { useRouter } from 'next/navigation'
import { WorkoutStore } from '@/app/store/workoutStore'
import { userStore } from "@/app/store/userStore"

// const fetchWorkouts = async ()=>{

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {cache: "no-cache", next: {revalidate: 10}})
//     const workout = await res.json()
//     return workout;
  
// }

const HomePage = () => {
  const {workouts, updateWorkoutsLocally, modal} = WorkoutStore()
  const {user} = userStore()
  const {push} = useRouter()

  const fetchWorkouts = ()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts`, {
      headers:{
        "Authorization":`bearer ${user?.token}`
      }
    })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    // Handle the JSON data
    updateWorkoutsLocally(data);
    
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });
  }
  useEffect(()=>{
    user ? fetchWorkouts() : push("/login")
    
  },[user])

  // const workouts = await fetchWorkouts()
  return (
    <div className={`${styles.HomePage_container} ${modal && styles.modal}`}>
      
      <div className={styles.contents}>
        {workouts.length < 1 ? <h1>No workout available</h1> : 
          <div className={`${styles.workouts} ${modal && styles.disable}`}>
          <WorkoutDetails workouts={workouts}/>
        </div>}
        <div className={`${styles.add_workout} ${modal && styles.isModal}`}>
          <WorkoutForm />
        </div>
      </div>
    </div>
  )
}

export default HomePage
