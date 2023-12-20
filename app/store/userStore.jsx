import React from 'react'
import { create } from 'zustand'

export const userStore = create((set) => ({
  user:null,
  updateUser: (user) => set(() => ({user })),
  
}))
