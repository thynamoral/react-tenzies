
const Die = (props) => {
    const {value, isHeld, heldDie, dieIndex} = props;
  return (
      <div
          className={`die ${isHeld ? "isHeld" : ""}`}
          onClick={() => heldDie(dieIndex)}
      >
          {value}
    </div>
  )
}

export default Die