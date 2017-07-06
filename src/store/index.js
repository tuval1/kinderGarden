import Vue from 'vue'
import Vuex from 'vuex'
import kinderService from '../services/kinderService'

Vue.use(Vuex)

const state = {
  kids: [],  
  activeUser: JSON.parse(localStorage.getItem('activeUser'))
  
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
    
    state.kids.push( kid );
  },
  USER_LOGIN(state, { active }){    
    localStorage.setItem('activeUser',JSON.stringify(active.user));
    state.activeUser = JSON.parse(localStorage.getItem('activeUser'));
    
    console.log('state active user:', state.activeUser);

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
    console.log('action create kid payload: ', payload.newKid )
    kinderService.createNewKid( payload.newKid )
    .then(
      kid => {
        payload.kid = kid;
        context.commit(payload);
      }
    );
  },
  UPDATE_KID(context,payload){
    console.log('action update kid id: ',payload);
    kinderService.updateKid( payload.newKid )
    .then(
      alert('Kid has been updated')
    );
  },
  KID_DELETE(context, payload){     
    kinderService.deleteKid(payload.kid)
    .then(res => {
      payload.kid._id = res;
        
      context.commit(payload);
      
    });    
  },
  USER_LOGIN(context,payload) {
    console.log('action login',payload.user);
    kinderService.login(payload.user)
    .then(res => {
      res.user.password = '';
      console.log('login action res:', res);
      payload.active = res;
      context.commit(payload);
    })
  }
}
const Store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
  
  
})

export default Store;
