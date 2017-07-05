import Vue from 'vue'
import Vuex from 'vuex'
import kinderService from '../services/kinderService'

Vue.use(Vuex)

const state = {
  kids: [],  
  
};

const getters = {  
    kidsToShow(){
      console.log('getter kids:',state.kids);
      return state.kids;
    }
}

const mutations = {
  KIDS_LOAD(state, { kids }) {    
    state.kids = kids;
    
  }
}

const actions = {

  KIDS_LOAD(context, payload) {    
    kinderService.query()
      .then(kids => {        
        payload.kids = kids;
        context.commit(payload)
      });
  },
}
const Store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
  
  
})

export default Store;
