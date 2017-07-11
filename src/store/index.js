import Vue from 'vue'
import Vuex from 'vuex'
import kinderService from '../services/kinderService'
import router from '../router'

Vue.use(Vuex)

const state = {
  kids: [],  
  activeUser: JSON.parse(localStorage.getItem('activeUser')),
  filterBy: {txt: '', param: null},
  showAdminPanelState: false,
  loading: true,  
  permissionLevel: JSON.parse(localStorage.getItem('permissionLevel'))
  
};

const getters = {
    kidsToShow(){  
      if (state.filterBy.txt.length > 0) {
        return state.kids.filter(function(kid){
        return kid.name.includes(state.filterBy.txt);
        });
      } else if ( state.filterBy.param==='absent') {
        return state.kids.filter(function(kid){
          return !kid.isArrived;
        })
      } else if (state.filterBy.param==='arrived') {
        return state.kids.filter(function(kid){
          return kid.isArrived;
        })
      }
      return state.kids;
      
    },
    
    permissionLevel(){
      return state.permissionLevel;
    }
}

const mutations = {
  KIDS_LOAD(state, { kids }) {    
    state.kids = kids;    
  },
  KID_DELETE(state, { kid }){    
    const idx = state.kids.findIndex( currkid => currkid._id === kid._id );
    state.kids.splice(idx,1);
    
  },
  CREATE_KID(state, { kid } ) {    
    state.kids.push( kid );    
    state.loading = false;
  },
  USER_LOGIN(state, { active }){    
    localStorage.setItem('activeUser',JSON.stringify(active.user));
    localStorage.setItem('permissionLevel',JSON.stringify(active.user.permissionLevel));
    state.activeUser = JSON.parse(localStorage.getItem('activeUser'));  
    //set permissions
    if(active.user.type==='admin') {
      state.permissionLevel = 2;
    } else if( active.user.type==='registered' ) {
      state.permissionLevel = 1;
    }    
    router.go('/admin');  
  },
  LOGOUT(){
    localStorage.removeItem('activeUser');
    localStorage.removeItem('permissionLevel');
    state.activeUser = null;
    console.log('mutation logout',state.activeUser)
  },
  KID_FILTER(state, payload) {    
    state.filterBy.txt = payload.txt;    
  },
  FILTER_BY_PARAM(state, payload){    
    state.filterBy.param = payload;
    
  },
  RESET_FILTER(){
    state.filterBy.txt   = '';
    state.filterBy.param = null;
  },
  TOGGLE_ADMIN(){
    state.showAdminPanelState = !state.showAdminPanelState;
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
    
    kinderService.createNewKid( payload.newKid )
    .then(
      kid => {
        payload.kid = kid;
        context.commit(payload);
      }
    );
  },
  UPDATE_KID(context,payload){
    
    kinderService.updateKid( payload.newKid )
    .then(
      
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
    
    kinderService.login(payload.user)
    .then(res => {
      res.user.password = '';
      
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
