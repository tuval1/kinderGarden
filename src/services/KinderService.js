import axios from 'axios'
import store from '../store'
const crudUrl = 'http://localhost:3003/data/kinderDB';
const baseUrl = 'http://localhost:3003';



const query = () => {
  return axios.get(crudUrl)
    .then(function (response) {
      console.log('server response: ',response);
      return response.data;

    })
    .catch(function (error) {
      console.log(error);
    });
}


const updateKidStatus = kid => {  
  //console.log('service kid obj',store.state.kids);
  kid.isArrived = !kid.isArrived;
  return axios.put(`${crudUrl}/${kid._id}`,kid)
  .then(function (response) {
    
    return response.data;
  })
}

const createNewKid = ( kid ) => {  
  return axios.post(`${crudUrl}`,kid)
  .then(function (response){    
    return response.data;
  })
}

const deleteKid = (kid) => {  
  return axios.delete(`${crudUrl}/${kid._id}`)
  .then(function(response){
    return response.data;
  })
}

const updateKid = (kid) => {  
  return axios.put(`${crudUrl}/${kid._id}`, kid)
  .then(function (response){
    return response.data;
  })
}

const login = ( user ) => {  
  return axios.post(`${baseUrl}/login`, user)
  .then( function(response) {
    
    return response.data;
  })
}

const logout = () => {
  return axios.get(`${baseUrl}/logout`)
  .then( function(response){
    
  })
}


export default {
  query,
  updateKidStatus,
  createNewKid,
  deleteKid,
  updateKid,
  login,
  logout
}
