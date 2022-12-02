import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = (name, number) => {
  const newContact = {name: name, number: number}
  const request = axios.post(baseUrl, newContact)
  return request.then(response => response.data)
}

const delete_ = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)
}

const update = (id, attributes) => {
  return axios
    .patch(`${baseUrl}/${id}`, attributes)
    .then(response => response.data)
}

export default {
  create: create,
  delete: delete_,
  getAll: getAll,
  update: update
}