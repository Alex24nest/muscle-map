import { useEffect, useState } from "react"
import { getImgUrl, fixName } from "../utils"
import { useParams } from "react-router"
import Modal from "./Modal"

export default function MuscleExercises({ selectedMuscle, navigate }) {
  const [data, setData] = useState(null)
  const [description, setDescription] = useState(null)
  const [loading, setLoading] = useState(false)
  const { muscleName } = useParams()

  const { difficulty, equipment, instructions, name } = description || {}
  const muscle = selectedMuscle || muscleName

  useEffect(() => {
    if (loading || !localStorage) return

    let cache = {}
    if (localStorage.getItem('exercises')) {
      cache = JSON.parse(localStorage.getItem('exercises'))
    }

    if (muscle in cache) {
      setData(cache[muscle])
      console.log('Exercises found in cache')
      return
    }

    async function fetchData() {
      setLoading(true)

      try {
        const baseUrl = 'https://api.api-ninjas.com/v1/'
        const suffix = 'exercises?muscle=' + muscle
        const finalUrl = baseUrl + suffix

        const res = await fetch(
          finalUrl,
          { headers: { 'X-Api-Key': import.meta.env.VITE_API_KEY } }
        )

        const backData = await res.json()
        setData(backData)

        console.log('Fetched exercises data')

        cache[muscle] = backData
        localStorage.setItem('exercises', JSON.stringify(cache))

      } catch (err) {
        console.log(err.message)

      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [muscle])

  if (!data) {
    return (
      <p>Loading...</p> 
    )
  }

  return (
    <>
      {description && <Modal
        handleCloseModal={() => setDescription(null)}
        className='modal-content'
      >
        <p className="modal-label">{fixName(name)}</p>
        <div className="modal-info-row">
          <p className="modal-label">Difficulty:</p>
          <p className="modal-data">{difficulty}</p>
        </div>
        <div className="vertical-line" style={{
            background:
              (difficulty === 'beginner' ?
              '#008000' : difficulty === 'intermediate' ?
              '#FF0000' :
              '#800080')
          }} 
        />
        <div className="modal-info-row">
          <p className="modal-label">Equipment:</p>
          <p className="modal-data">{fixName(equipment)}</p>
        </div>
        <div className="scrollable-instructions">
          <p className="modal-label">Instructions:</p>
          <p className="modal-data-scroll">{instructions}</p>
        </div>
      </Modal>}
      
      <div className="muscle-header">
        <img className="foto-title" src={getImgUrl(muscle)} alt={selectedMuscle} />
        <p className="page-title">{fixName(selectedMuscle || muscleName)}</p>
      </div>
      <div className="exercise-list">
        {data.map((exercise, exerciseIndex) => {
          return (
            <button onClick={() => setDescription(exercise)} 
              className="exercise-button" 
              key={exerciseIndex}
            >
              {exercise.name}
            </button>
          )
        })}
      </div>
      <button onClick={() => navigate(`/`)} className="back-button">
        Back
      </button>
    </>
  )
}