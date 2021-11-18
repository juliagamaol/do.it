import React from 'react'
import { Toaster } from 'react-hot-toast'
import Routes from './routes'
import GlobalStyles from "./styles/global"
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Routes />
      <Toaster />
    </>
  )
}
