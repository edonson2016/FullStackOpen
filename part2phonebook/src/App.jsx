import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import axios from 'axios'
import personServices from './services/personServices'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [addMessage, setAddMessage] = useState(null)

  useEffect(() => {
    console.log("effect")
    personServices.getAll()
      .then(response => {
        console.log("Promise Fulfilled")
        setPersons(response)
      })
  }, [])

  const onChangeFilter = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const onChangeName = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const onChangeNumber = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nameList = persons.map(person => person.name)
    const newPerson = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 1100).toString()
    }
    console.log(nameList.includes(newName))
    if (nameList.includes(newName) === false) {
      personServices.addPerson(newPerson)
        .then(response => {
          console.log("POST successful")
          setPersons(persons.concat(response))
          setNewName("")
          setNewNumber("")
          setAddMessage(
            `'${response.name}' added`
          )
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        })
    } else {
      const dupID = persons.find(person => person.name === newName).id
      if (window.confirm(`${newName} is already in the phonebook, would you like to change their number to a new number?`)) {
        personServices.updateNumber(dupID, newPerson).then(data => {
          if (data === "404") {
            setNewName("")
          setNewNumber("")
          setAddMessage(
            `'${newName}' is removed from the server`
          )
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
          } else {
            const newList = persons.filter((person) => person.name != newName)
          setPersons(newList.concat(data))
          setNewName("")
          setNewNumber("")
          setAddMessage(
            `'${data.name}' updated`
          )
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
          }
          
        }) 
      } else {
        setNewName("")
        setNewNumber("")
      }
    }
  }

  const onDelete = (id) => {
    console.log(id)
    const deletedPerson = persons.find((person) => person.id == id)
    console.log(deletedPerson)
    if (window.confirm(`Delete ${deletedPerson.name}`)) {
          personServices.deletePerson(id).then(deletedPerson =>
      { 
        console.log(deletedPerson)
        const newPersons = persons.filter(person => person.id != deletedPerson.id)
        setPersons(newPersons)
      }
    )
    }

  }

  const nameList = persons.filter((person) => person.name.includes(filterName))

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={addMessage}/>
        <Filter value = {filterName} onChange = {onChangeFilter}/>
      <h2>add a new</h2>
        <PersonForm nameVal={newName} numVal={newNumber} onChangeName={onChangeName} onChangeNum={onChangeNumber} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
        <Persons nameList={nameList} onDelete={onDelete} />
    </div>
  )
}

export default App