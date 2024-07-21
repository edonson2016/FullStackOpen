import axios from "axios"

const getAll = () => {
    const promise = axios.get("http://localhost:3001/persons")
    return promise.then(response => response.data)
}

const addPerson = (newPerson) => {
    const promise = axios.post("http://localhost:3001/persons", newPerson)
    return promise.then(response => response.data)
}

const deletePerson = (id) => {
    const promise = axios.delete(`http://localhost:3001/persons/${id}`)
    return promise.then(response => response.data)
}

const updateNumber = (id, changedPerson) => {
    const promise = axios.put(`http://localhost:3001/persons/${id}`, changedPerson).catch((err) => {
        return {"data":"404"}
    })
    return promise.then(response => response.data)
}

export default { getAll, addPerson, deletePerson, updateNumber }