import Vue from 'vue'
import Vuex from 'vuex'
import kinderService from '../services/kinderService'

Vue.use(Vuex)

const state = {
  kids: [],  
  
};

const getters = {  
    kidsToShow(){      
      return state.kids;
    }
}

const mutations = {
  KIDS_LOAD(state, { kids }) {    
    state.kids = kids;    
  },
  KID_DELETE(state, { kid }){    
    const idx = state.kids.findIndex( currkid => currkid._id === kid._id );
    state.kids.splice(idx,1);
    alert('kid delete successfully');
  },
  CREATE_KID(state, { kid } ) {
    console.log('mutation kid:',kid);
    state.kids.push( kid );
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
  CREATE_KID(context, payload){
    console.log('action create kid payload: ',payload.kidName,payload.kidBirthday )
    kinderService.createNewKid(payload.kidName,payload.kidBirthday)
    .then(
      kid => {
        payload.kid = kid;
        context.commit(payload);
      }
    );
  },
  UPDATE_KID(context,payload){
    console.log('action update kid id: ',payload);
    kinderService.updateKid( payload.updatedKidObj )
    .then(
      alert('Kid has been updated')
    );
  },
  KID_DELETE(context, payload){     
    kinderService.deleteKid(payload.kid)
    .then(res => {
      payload.kid._id = res;
      console.log('delete action payload',payload.kid._id);      
      context.commit(payload);
      
    });    
  }
}
const Store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
  
  
})

export default Store;
