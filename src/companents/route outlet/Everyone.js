import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from '../Menu'

function Everyone({sepet,setsearch}) {
  return (
    <>
    <Menu sepet={sepet} setsearch={setsearch}></Menu>
    <Outlet /></>
  )
}

export default Everyone