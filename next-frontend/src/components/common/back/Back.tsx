"use client"
import { useRouter } from "next/router"
import React from "react"

interface BackProps {
  title: string
}

const Back: React.FC<BackProps> = ({ title }) => {
  const router = useRouter()
  const pathname = router.pathname.split("/")[1] // Equivalent to location.pathname

  return (
    <>
      <section className='back'>
        <h2>Home / {pathname}</h2>
        <h1>{title}</h1>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Back
