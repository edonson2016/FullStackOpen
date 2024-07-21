const Persons = ({ nameList, onDelete }) => {
    return (
        <div>
            {nameList.map(person => {
                return (
                <div key={person.id}>
                    {person.name} {person.number}
                    <button onClick = {() => onDelete(person.id)}>delete</button>
                </div>
                )
                
            })}
        </div>
    )
}

export default Persons

