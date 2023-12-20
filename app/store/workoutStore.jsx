import React from 'react'
import { create } from 'zustand'

export const WorkoutStore = create((set) => ({
  _id: null,
  title: "",
  load: "",
  reps: "",
  err: null,
  edit: false,
  modal: false,
  isLoading: false,
  update_id: (_id) => set(() => ({_id })),
  updateTitle: (title) => set(() => ({ title })),
  updateLoad: (load) => set(() => ({ load })),
  updateReps: (reps) => set(() => ({ reps })),
  updateErr: (err) => set(() => ({ err })),
  updateEdit: (edit) => set(()=>({ edit })),
  updateModal: (modal) => set(()=>({ modal })),
  updateIsLoading: (isLoading) => set(()=>({ isLoading })),

  workouts: [
  //   {
  //   title: 'Testing', 
  // reps: 2, 
  // load: 1, 
  // _id: '6540e2c9fb253819062e9998', 
  // createdAt: '2023-10-31T11:19:37.180Z',
  // updatedAt: "2023-10-31T11:19:37.180Z",
  // __v: 0,
  // _id: "6540e2c9fb253819062e9998",},
  // {createdAt: "2023-10-31T11:24:47.832Z",
  // load: 1,
  // reps: 2,
  // title: "Another one",
  // updatedAt: "2023-10-31T11:24:47.832Z",
  // __v: 0,
  // _id: "6540e3fffb253819062e9c83",},
],
  updateWorkoutsLocally: (workouts) => set(() => ({workouts })),

addWorkoutLocally: (newWorkout) => {
    set((state) => {
       return {workouts: [newWorkout, ...state.workouts]}
    })
},

editWorkoutLocally: (id, updatedWorkout) => {
    set((state) => {
        const updatedWorkouts = state.workouts.map(Workout => {
            if (Workout._id == id) {
                Workout = {...Workout, ...updatedWorkout, updatedAt: Date.now()}
                return Workout
            }
            return Workout
        })
        return {workouts: updatedWorkouts}
    })
},

deleteWorkoutLocally: (id) =>{
  set((state)=>{
    const workouts = state.workouts.filter(Workout => Workout._id !== id)
    return {workouts: workouts}
  })
}

}))
