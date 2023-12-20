"use client"
import React, { useState } from 'react'
import styles from "./WorkoutForm.module.css"
import axios from 'axios'
import { WorkoutStore } from '@/app/store/workoutStore'
import { userStore } from '@/app/store/userStore'

const WorkoutForm = () => {
  const [error, setError] = useState("")
    const { title, updateTitle, updateLoad, load, updateReps, reps, updateModal, updateIsLoading, isLoading,
            updateErr, err, edit, updateEdit, editWorkoutLocally, addWorkoutLocally, _id} = WorkoutStore()

            const {user} = userStore()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!user){
          // updateErr("You must be logged in")
          return
        }
        updateIsLoading(true)
        if (!load || !reps || !title){
          updateIsLoading(false)
            updateErr("All fields are required")
            return
        }
        if (!edit) {
          const workout = {title, load, reps}
          //----------------------ADDING WORKOUT LOCALLY WITH STATE MANAGEMENT-----------------------------//
          //_id: Date.now(), used it to generate local Id for local workout
            // addWorkoutLocally({...workout, _id: Date.now()})
            // updateTitle("")
            // updateLoad("")
            // updateReps("")
            // updateErr(null)
            // updateIsLoading(false)


          //-------------------------ADDING WORKOUT TO DATABASE PROPERLY-------------------------------//
            const requestOptions = {
              method: "POST",
              body: JSON.stringify(workout),
              headers: {
                  "Content-type": "application/json",
                  "Authorization":`bearer ${user?.token}`
              }
          }
          try {
              const response = await fetch("http://localhost:4000/workouts", requestOptions)
              const json = await response.json()
              if (!response.ok) {
                  updateErr(json.error)
                  updateIsLoading(false)
              }
              if (response.ok) {
                updateErr(null)
                updateTitle("")
                updateLoad("")
                updateReps("")
                updateErr(null)
                addWorkoutLocally(json)
                updateIsLoading(false)
              }
          } catch (error) {
              updateErr(error.message)
              updateIsLoading(false)
          }
        }

        if(edit){
          const updatedPost = {title, load, reps}
          //----------------------EDITING WORKOUT LOCALLY WITH STATE MANAGEMENT-----------------------------//
          editWorkoutLocally(_id, updatedPost)
          updateTitle("")
          updateLoad("")
          updateReps("")
          updateErr(null)
          updateEdit(false)
          updateModal(false)
          updateIsLoading(false)


        //-------------------------EDITING WORKOUT IN DATABASE PROPERLY-------------------------------//
          const requestOptions = {
            method: "PATCH",
            body: JSON.stringify(updatedPost),
            headers: {
                "Content-type": "application/json",
                "Authorization":`bearer ${user?.token}`
            }
        }

        try {
          const response = await fetch(`http://localhost:4000/workouts/${_id}`, requestOptions)
          if (!response.ok) {
              updateErr(response.error)
              updateIsLoading(false)
          }
          if (response.ok) {
            updateErr(null)
            const json = await response.json()
            updateTitle("")
            updateLoad("")
            updateReps("")
            updateErr(null)
            updateEdit(false)
            updateIsLoading(false)
          }
        } catch (error) {
          updateErr(error.message)
          updateIsLoading(false)
      }
        }

        
      }
      const exitEdit = ()=>{
        updateModal(false)
        updateEdit(false)
        updateTitle("")
        updateLoad("")
        updateReps("")
        updateErr(null)
      }

  return (
    <div className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSubmit}>
      {edit ? <h3>Edit workout</h3> : <h3>New workout</h3>}
      {isLoading && <h5>Loading...</h5>}
        <label className={styles.label} htmlFor="title">Title:
            <input type="text" value={title} onChange={(e)=>updateTitle(e.target.value)}/>
        </label>
        <label className={styles.label} htmlFor="load">Load:
            <input type="number" value={load} onChange={(e)=>updateLoad(e.target.value)}/>
        </label>
        <label className={styles.label} htmlFor="reps">Reps:
            <input type="number" value={reps} onChange={(e)=>updateReps(e.target.value)}/>
        </label>
        {err && <small className={styles.err}>{err}</small>}
        <button>{edit ? "Edit post" : "Add post"}</button>
        {edit && <button className={styles.exitModal} onClick={()=>{exitEdit()}}>Exit</button>}
      </form>
    </div>
  )
}

export default WorkoutForm
