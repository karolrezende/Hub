import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Button from '../Button/Button'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import { api } from '../../api'
import { redirect, useNavigate } from 'react-router-dom'

export default function Login() {
  const renderPage = useNavigate()
  const [error, setError] = useState('')

  const schema = yup.object().shape({
    email: yup.string().required("Digite seu email"),
    password: yup.string().required("Digite sua senha")
  })
  const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)})

  async function onclick(data){
    const apiRequest = await api.post('/sessions',{
      email: data.email,
      password: data.password
    }).then(
      res=>{
        console.log(res)
        if(res.status === 200){
          localStorage.clear()
          localStorage.setItem('token', res.data.token)
          renderPage('/home')
          setError('')
        }
      }).catch(    
        setError('Ops.. Algo deu erro, tente novamente!')
    )
  }
  function onRedirect(){
    renderPage('/register')
  }
  return (
    <section className={styles.main}>
      <h1 className={styles.main_h1}>Kenzie Hub</h1>
      <div className={styles.main_div}>
        <form className={styles.main_div_form} onSubmit={handleSubmit(onclick)}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Digite seu email' {...register('email')}/>
          <p>{errors.email?.message}</p>
          <label htmlFor="password">Senha</label>
          <input type="password" placeholder='Digite sua senha' {...register('password')}/>
          <p>{errors.password?.message}</p>
          <div>
            <Button click={onclick} color={'#FF577F'}>Entrar</Button>
          </div>
        </form>
        <p>{error}</p>
        <p>Ainda não possui conta?</p>
        <div className={styles.main_button}>
          <Button click={onRedirect} color={'#868E96'}>Cadastre-se</Button>
        </div>
      </div>
    </section>
  )
}
