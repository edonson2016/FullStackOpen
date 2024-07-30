import axios from "axios"
const baseURL = "/api/persons"

const getAll = () => {
    const promise = axios.get(baseURL)
    return promise.then(response => response.data)
}

const addPerson = (newPerson) => {
    const promise = axios.post(baseURL, newPerson)
    return promise.then(response => response.data)
}

const deletePerson = (id) => {
    const promise = axios.delete(`${baseURL}/${id}`)
    return promise.then(response => response.data)
}

const updateNumber = (id, changedPerson) => {
    const promise = axios.put(`${baseURL}/${id}`, changedPerson).catch((err) => {
        return {"data":"404"}
    })
    return promise.then(response => response.data)
}

export default { getAll, addPerson, deletePerson, updateNumber }