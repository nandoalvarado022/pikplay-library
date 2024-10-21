// 'use client'

import React, { useState } from 'react'
import cookieCutter from '@boiseitguru/cookie-cutter'
import { useRouter } from 'next/router'
import { loginSrv } from './services/login.service.ts'
import { toast } from 'react-toastify'
import LoginInterfaceExample from './LoginInterfaceExample.jsx'

function Login(props) {
  // const { env, setStoreValue } = useSystemStore()
  const DEFAULT_NUMBER_PHONE = '3187414972'
  const {
    env,
    isDevelop = false,
    LoginInterface = LoginInterfaceExample,
  } = props
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isHuman, setIsHuman] = useState(isDevelop)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [phone, setPhone] = useState(isDevelop ? DEFAULT_NUMBER_PHONE : null)
  const [name, setName] = useState(null)
  const [buttonText, setButtonText] = useState('Enviar código')

  const numberValidated = phone => phone.length === 10

  const handleTengoCodigo = () => {
    if (!phone || !numberValidated(phone)) {
      alert('Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso')
      setButtonText('Enviar código')
      return
    }
    setButtonText('Ingresar')
    setIsCodeSent(true)
  }

  const validateLogin = async (code, callBackLogIn) => {
    // Numero de telefono y codigo son necesarios
    const contryCode = '57'
    const fullPhone = contryCode + phone
    try {
      const req = await loginSrv(null, fullPhone, parseInt(code, 10))
      const { data } = req
      if (data) {
        const { token, uid } = data
        // setStoreValue("userLogged", data)
        handleCloseDialog()
        // cookieCutter.set('X-Auth-Token', token)
        // cookieCutter.set('User-ID', uid)
        callBackLogIn(data)
        router.push('?login=true')
      } else {
        document.getElementById('verificationCode').value = ''
        toast('Código no valido')
        setButtonText('Validar')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEnviarCodigo = async () => {
    setButtonText('Enviando...')
    if (!phone || !numberValidated(phone)) {
      toast('Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso')
      setButtonText('Enviar código')
      return false
    }
    const contryCode = '57'
    const fullPhone = contryCode + phone
    await loginSrv(null, fullPhone, null, name)
    setButtonText('Validar')
    setIsCodeSent(true)
  }

  const handleCloseDialog = () => {
    setIsHuman(false)
    setIsCodeSent(false)
    setIsOpen(false)
  }

  const handleFixPhone = () => {
    setIsCodeSent(false)
  }

  const handleClickOpen = () => {
    setIsOpen(true)
  }

  const handleKeyUp = async (e, callBackLogIn) => {
    const code = e.target.value
    debugger;
    const verificationCode = document.getElementById('verificationCode').value
    if (verificationCode) Number(verificationCode)
    if (verificationCode < 999) return
    setButtonText('Validando...')
    validateLogin(code, callBackLogIn)
  }

  const onChangeReCaptcha = value => {
    value = !!value
    setIsHuman(value)
  }

  return (<LoginInterface
    {...{
      buttonText,
      env,
      isCodeSent,
      isHuman,
      isOpen,
      handleClickOpen,
      handleEnviarCodigo,
      handleKeyUp,
      handleCloseDialog,
      handleFixPhone,
      handleTengoCodigo,
      onChangeReCaptcha,
      phone,
      setIsCodeSent,
      setPhone,
      setName
    }}
  />)
}

export default Login
