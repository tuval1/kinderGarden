import axios from 'axios'
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
  console.log('service kid obj',kid);
  // return axios.put(`${baseUrl}`,kid)
  // .then(function (response) {
  //   console.log('update kid status res',response);
  //   return response.data;
  // })
}


export default {
  query,
  updateKidStatus
}
