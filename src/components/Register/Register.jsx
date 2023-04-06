import React, {useState } from 'react'
import styles from './styles.module.scss'
import Button from '../Button/Button'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { api } from '../../api'
import { useNavigate } from 'react-router-dom'

import {toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Register() {
  const renderPage = useNavigate()
  const schema = yup.object().shape({
    name: yup.string().required("Digite seu nome").min(3, 'Nome inválido'),
    email: yup.string().required("Digite seu email").email("Digite um email válido"),
    password: yup.string().required("Digite sua senha"),
    confPassword: yup.string().required("Confirme sua senha").oneOf([yup.ref('password')], 'As senhas não combinam'),
    bio: yup.string().max(20, "Máximo 20 caracteres"),
    tel: yup.string().required("Digite seu telefone"),
    module: yup.string().required('Selecione um módulo')
  })
  const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)})

  async function onclick(data){
    console.log(data)
    console.log(data.email)
    const apiRequest = await api.post('/users',{
      email: data.email,
      password: data.password,
      name: data.name,
      bio: data.bio,
      contact: data.tel,
      course_module: data.module,
    }).then(
      res=>{
        console.log(res)
        if(res.status === 200){
          localStorage.clear()
          //localStorage.setItem('token', res.data.token)
          renderPage('/home')
          console.log(res)
          toast.success("Criado com sucesso!",{
            position: toast.POSITION.TOP_RIGHT
          })
        }
      }).catch(   
        toast.error("Ops, algo deu errado!",{
          position: toast.POSITION.TOP_RIGHT
        })
    )
  }
  function onRedirect(){
    renderPage('/')
    console.log(renderPage)
  }
  return (
    <section className={styles.main}>
      <div className={styles.main_header}>
        <h1 className={styles.main_h1}>Kenzie Hub</h1>
        <div className={styles.main_header_div}>
          <Button color={'#212529'} click={onRedirect}>Voltar</Button> 
        </div>
      </div>
      <div className={styles.main_div}>
        <form className={styles.main_div_form} onSubmit={handleSubmit(onclick)}>
          <h2>Crie sua conta</h2>
          <h5>Rápido e fácil, vamos nessa!</h5>

          <label htmlFor="nome">Nome</label>
          <input type="text" placeholder='Digite seu nome' {...register('name')}/>
          <p>{errors.nome?.message}</p>

          <label htmlFor="Email">Email</label>
          <input type="email" placeholder='Digite seu email' {...register('email')}/>
          <p>{errors.email?.message}</p>

          <label htmlFor="password">Senha</label>
          <input type="password" placeholder='Digite sua senha' {...register('password')}/>
          <p>{errors.password?.message}</p>

          <label htmlFor="password">Confirmar senha</label>
          <input type="password" placeholder='Confirme sua senha' {...register('confPassword')}/>
          <p>{errors.confPassword?.message}</p> 

          <label htmlFor="text">Bio</label>
          <input type="text" placeholder='Fale sobre você' {...register('bio')}/>
          <p>{errors.bio?.message}</p> 

          <label htmlFor="password">Telefone</label>
          <input type="tel" placeholder='Telefone' {...register('tel')}/>
          <p>{errors.tel?.message}</p>

          <label htmlFor="select">Selecionar modulo</label>
          <select type="select" {...register('module')}>
            <option value="">Digite seu módulo</option>
            <option value="Primeiro módulo">Primeiro módulo</option>
            <option value="Segundo módulo">Segundo módulo</option>
            <option value="Terceiro módulo">Terceiro módulo</option>
            <option value="Quarto módulo">Quarto módulo</option>
          </select>
          <p>{errors.module?.message}</p>

          <div>
            <Button click={onclick} color={'#FF577F'}>Cadastre-se</Button>
            <ToastContainer/>
          </div>
        </form>
      </div>
    </section>
  )
}
