import Vue from 'vue'
import Vuex from 'vuex'

import todoService from '../services/kinderService'

Vue.use(Vuex)

const state = {
  kids: [],  
};


const myStore = new Vuex.Store({
  state
  
})

export default myStore;
