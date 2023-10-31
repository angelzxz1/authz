import { User } from "@prisma/client"
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'




const sessionExpired = (user:User)=>{
    const cookie = cookies()
    const session = cookie.get(`token-${user.id}`)
    if(!session) return null
    const {exp} = jwt.decode(session.value) as {exp:number}
    return Date.now() >= exp * 1000
}
