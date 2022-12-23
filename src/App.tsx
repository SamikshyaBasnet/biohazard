import React, { Component } from 'react'
import BiologicalHazard from './components/BiologicalHazardTable'
import Header from './components/Header'
import './styles/main.scss'

const App = () => {
  return (
    <div>
      <Header />
      <BiologicalHazard />
    </div>
  )
}

export default App
