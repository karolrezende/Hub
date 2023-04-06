import { useNavigate } from 'react-router-dom'
import { api } from '../../api.js'
import React, { useEffect, useState } from 'react'
import Button from '../Button/Button.jsx'
import styles from './styles.module.scss'

export default function Home() {
  const token = localStorage.getItem('token')
  const [user, setUser] = useState()
  const navigate = useNavigate();
  useEffect(()=>{
    async function get(){
      const request = await api.get('profile',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(
        res => setUser(res.data)
      )
    }
    get()
  },[])

  function logOut(){
    localStorage.clear()
    navigate('/')
  }
  console.log(user)

  return (
    <div className={styles.div}>
      <div className={styles.div_header}>
        <h1 className={styles.div_header__icon}>KenzieHub</h1>
        <div className={styles.div_div}>
          <Button color={"#212529"} click={logOut}>Sair</Button>
        </div>
      </div>
      <div className={styles.div_header}>
        <p className={styles.div_title}>Olá, {user?.name}</p>
        <p className={styles.div_course}>{user?.course_module}</p>
      </div>
    </div>
  )
}
