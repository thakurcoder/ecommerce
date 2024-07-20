import {create} from 'zustand'

export const useStore = create((set)=>({
    name:"",
    email:"",
    addEmail:(email:string)=>{
        set((state:any)=>({
            email:email
        }))
    },
    removeEmail:(()=>{
        set(()=>({
            email:""
        }))
    }),
    addName:(name:string)=>{
        set((state:any)=>({
            name:name
        }))
    },
    removeName:(()=>{
        set(()=>({
            name:""
        }))
    })

}))