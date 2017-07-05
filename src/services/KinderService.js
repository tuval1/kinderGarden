import axios from 'axios'
const baseUrl = 'http://localhost:3003/data';



const query = () => {
  return axios.get('http://localhost:3003/data/kinderDB')
    .then(function (response) {
      console.log('server response: ',response);
      return response.data;

    })
    .catch(function (error) {
      console.log(error);
    });
}



export default {
  query
}
