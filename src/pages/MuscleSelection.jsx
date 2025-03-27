import { muscles, fixName, getImgUrl } from "../utils"

export default function MuscleSelection({ setSelectedMuscle, navigate }) {
  return (
    <>
      <p className="page-title">Select muscle</p>
      <div className="muscle-cards-grid">
        {muscles.map((muscle, muscleIndex) => {
          return (
            <button 
              onClick={() => {
                setSelectedMuscle(muscle)
                navigate(muscle)
              }} 
              key={muscleIndex} 
              className="muscle-card"
            >
              <img src={getImgUrl(muscle)} alt={muscle} />
              <p className="muscle-name">{fixName(muscle)}</p>
            </button>
        )})}
      </div>
      
    </>
  )
}