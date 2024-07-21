const Total = ({parts}) => {
    const exerciseList = parts.map(parts => parts.exercises)
    const sum = exerciseList.reduce((acc, curr) => acc + curr, 0);
    
    return (
      <p><strong>Number of exercises {sum}</strong></p>
    )
  }

export default Total