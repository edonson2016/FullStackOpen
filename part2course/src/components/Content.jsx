import Part from "./Part"
import Total from "./Total"

const Content = ({parts}) => {
    console.log(parts)

    return (
      <>
        {parts.map(parts =>
            <Part part={parts.name} exercises={parts.exercises} />
        )}
        <Total parts={parts}/>
      </> 
    )
  }

export default Content