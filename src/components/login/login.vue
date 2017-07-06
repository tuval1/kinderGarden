<template>
    <section>
        <div class="login" v-if="!this.$store.state.activeUser">
       <input type="text" placeholder="Enter you username" name="username" v-model="username"><br>
       <input type="password" placeholder="Enter you password" name="password" v-model="password"><br>
       <button @click.stop="login">Login</button>
       </div>

       <div class="logout" v-else>
            <button @click.stop="logout">Logout</button>
           </div>
    </section>       
</template>

<script>

export default {
    
    name: 'login',
    created(){
      console.log('login user state:',this.$store.state.activeUser)
    },
    data(){
        return {
            username: null,
            password: null
        }
    },
    methods: {
        login(){
            const username = this.username;
            const password = this.password;
            const user = {
                username: username,
                password: password
            }
            
            this.$store.dispatch({ type: 'USER_LOGIN', user });
        },
        logout(){
            localStorage.removeItem('activeUser');
        }
    }
}
</script>

<style>

</style>