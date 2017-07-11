<template>
  <div id="app">
    <!--<div class="loader" v-if="this.$store.state.loading">
      <md-spinner :md-size="150" md-indeterminate></md-spinner>
    </div>-->

    
<md-toolbar class="relative">
  <md-button class="md-icon-button">
    <md-icon>menu</md-icon>
  </md-button>

  
  <h2 class="md-title menu-label" style="flex: 1"><router-link to="/">Kinder App</router-link></h2>

  
    <router-link to="login" class="md-button"><i class="fa fa-sign-in fa-2x" aria-hidden="true"></i> 
    <span class="menu-label"> login</span></router-link>
  
  <md-button @click.stop="showAdmin" 
  v-if="this.$store.state.permissionLevel >= 2"><i class="fa fa-user-plus fa-2x" aria-hidden="true"></i>
<span class="menu-label"> Create</span></md-button>

  <md-button class="md-icon-button" @click="toggleFilter">
      <md-icon>search</md-icon>
    </md-button>
    <div class="box-filter" v-if="showFilter"><kid-Filter></kid-Filter></div>
    <p v-if="this.$store.state.activeUser" class="menu-label">Hi {{this.$store.state.activeUser.name}}</p>
</md-toolbar>


    <div class="phone-viewport">  
  <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
  </md-sidenav>
  </md-sidenav>
</div>


    <main>      
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import kidFilter from './components/filter'
export default {
  name: 'app',
  components: {
    kidFilter
  },
  created() {
    
  },
  data(){
    return {
      showFilter: false
    }
  },
  computed: {
    loader: function(){
      return this.$store.getters.loader;
    }
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    toggleRightSidenav() {
      this.$refs.rightSidenav.toggle();
    },
    closeRightSidenav() {
      this.$refs.rightSidenav.close();
    },
    open(ref) {
      console.log('Opened: ' + ref);
    },
    close(ref) {
      console.log('Closed: ' + ref);
    },
    showAdmin(){
      this.$store.commit('TOGGLE_ADMIN')
      
    },
    toggleFilter(){
      this.showFilter = !this.showFilter;
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
.loader {
  position: absolute;
  width: 100%;
  height:100%;
  background:rgba(255,255,255,0.8);
  z-index:9;
  display: flex;
  justify-content: center;
  padding-top:27%;
}
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;*/
}
.relative {
  position:relative;
}
.green {
  color: lightgreen;
}

main {
  text-align: center;
  margin-top: 40px;
}
.md-layout {
  justify-content: center;
}
.float-right {
  float: right;
}
.space-around {
  margin:5px 15px;
}
.md-fab a {
  color: #fff;
}
.box-filter {
  position: absolute;
  top:10px;
  right:110px;
  background: rgba(0,0,0,0.8);
  padding:10px;
}
@media screen and (max-width: 480px) {
  .menu-label {
  display: none;  
  }
}
.full-width {
  width: 100%;
}
.bg-white {
  background: white;
}
</style>
