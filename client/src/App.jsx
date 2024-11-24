import { useState } from 'react'
import { AuthProvider } from './context/AuthContext';
import viteLogo from '/vite.svg'
import './App.css'
import { AppRouter } from "./routes/Routes";

function App() {


  return (

    <AuthProvider>
      <AppRouter />
    </AuthProvider>


  )
}

export default App
