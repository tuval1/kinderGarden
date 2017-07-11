<template>
    <section>
        <md-layout md-gutter>
          <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="50">
        <md-card>
        <div class="login " v-if="!this.$store.state.activeUser">
            <md-input-container>
                <label>Enter you username</label>
                <md-input placeholder="Enter you username"
                name="username" v-model="username"></md-input>
            </md-input-container>

            <md-input-container md-has-password>
                <label>Enter your password</label>
                <md-input type="password" placeholder="Enter you password" name="password" 
                v-model="password"></md-input>
            </md-input-container>
       
       <md-button class="md-raised" @click.stop="login">Login</md-button>
       </div>

       <div class="logout md-flex-xsmall-100 md-flex-small-50 md-flex-medium-50" v-else>
           <p>Hi {{this.$store.state.activeUser.name}}</p>
            
            <md-button class="md-raised" @click.stop="logout">Logout</md-button>
           </div>
        </md-card>
          </md-layout>
        </md-layout>
    </section>       
</template>

<script>
import Router from 'vue-router'
import kinderService from '../../services/kinderService'
export default {
    
    name: 'login',
    created(){
      
    },
    data(){
        return {
            username: null,
            password: null
        }
    },
    computed: {
        activeUser: function(){
            return this.$store.state.activeUser;
        }
    },
    methods: {
        login(){
            // this.$store.commit('TOGGLE_LOADER');
            const username = this.username;
            const password = this.password;
            const user = {
                username: username,
                password: password
            }            
            this.$store.dispatch({ type: 'USER_LOGIN', user });
            this.$router.push('/');

        },
        logout(){
            // this.$store.commit('TOGGLE_LOADER');
            this.$store.commit('LOGOUT');
            
            kinderService.logout()
            .then(                
                this.$router.push('/')
            );
        }
    }
}
</script>

<style>

</style>