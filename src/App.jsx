import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import MuscleSelection from './pages/MuscleSelection'
import MuscleExercises from './pages/MuscleExercises'

function App() {
  const [selectedMuscle, setSelectedMuscle] = useState('')
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path='/' element={
        <MuscleSelection 
        selectedMuscle={selectedMuscle} 
        setSelectedMuscle={setSelectedMuscle} 
        navigate={navigate} 
        />} 
      />
      <Route path=":muscleName" element={
        <MuscleExercises 
          navigate={navigate}  
          selectedMuscle={selectedMuscle} 
        />} 
      />
    </Routes>
  )
}

export default App
