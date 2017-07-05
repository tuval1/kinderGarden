import axios from 'axios'
import store from '../store'
const baseUrl = 'http://localhost:3003/data/kinderDB';



const query = () => {
  return axios.get(baseUrl)
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
  return axios.put(`${baseUrl}/${kid._id}`,kid)
  .then(function (response) {
    
    return response.data;
  })
}

const createNewKid = (kidName,kidBirthday) => {
  var kid = {
    name: kidName,
    birthday: kidBirthday,
    isArrived: false
  }  
  return axios.post(`${baseUrl}`,kid)
  .then(function (response){    
    return response.data;
  })
}

const deleteKid = (kid) => {  
  return axios.delete(`${baseUrl}/${kid._id}`)
  .then(function(response){
    return response.data;
  })
}


export default {
  query,
  updateKidStatus,
  createNewKid,
  deleteKid
}
