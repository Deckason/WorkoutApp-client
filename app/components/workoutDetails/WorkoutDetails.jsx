"use client"
import React from 'react'
import styles from "./WorkoutDetails.module.css"
import { WorkoutStore } from '@/app/store/workoutStore';
import { formatDistanceToNow } from 'date-fns'
import { userStore } from '@/app/store/userStore';

const WorkoutDetails = ({workouts}) => {
  let { updateTitle, updateLoad, updateReps, updateEdit, update_id,
      updateErr, deleteWorkoutLocally, modal, updateModal} = WorkoutStore();
      const {user} = userStore()

  const edit = (id, title, reps, load,)=>{
    updateErr(null)
      update_id(id)
      updateTitle(title)
      updateLoad(load)
      updateReps(reps)
      updateModal(true)
  }

  const deleteRequest = async(id)=>{
    if(!user){
      alert("You are not authorized to do perform this request")
      return
    }
    //------------------------DELETING WORKOUT LOCALLY IN STATE MANAGEMENT--------------------------------//
    deleteWorkoutLocally(id)

    // --------------------DELETING WORKOUT FROM DATABASE-----------------------------//
    const requestOptions = {
      method: "DELETE",
      headers: {
          "Content-type": "application/json",
          "Authorization":`bearer ${user?.token}`
      }
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts/${id}`, requestOptions)
    if (!response.ok) {
        updateErr(response.error)
    }
    if (response.ok) {
      updateErr(null)
      const json = await response.json()
    }
} catch (error) {
    updateErr(error.message)
}
    
  }



  return (
    <>
        {workouts &&
            workouts.map(workout=>(
                <div className={styles.workout_details_container} key={workout._id}>
                <p className={styles.workout_title}><strong>{workout.title}</strong></p>
                <p><strong>load (kg): </strong>{workout.reps}</p>
                <p><strong>reps: </strong>{workout.load}</p>

                <small><strong>Created update: </strong> {workout.createdAt && 
                  formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
                </small><br/>
                {workout.createdAt !== workout.updatedAt &&
                <small><strong>Last update: </strong> 
                  {formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}
                </small>}
                
                <div className={styles.buttons}>
                  <button className={styles.edit}
                    onClick={()=>{edit(workout._id, workout.title, workout.reps, workout.load),
                    updateEdit(true)}}
                  >Edit</button>
                  <button onClick={()=>deleteRequest(workout._id)} className={styles.delete}>Delete</button>
                </div>
            </div>
            ))
        }
    </>
  )
}

export default WorkoutDetails
