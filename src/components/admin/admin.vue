<template>
    <section>
        {{kidName}}<br>
        {{kid}}
       <h3>Admin area</h3>
       <label>Kid Name:
       <input type="text" name="kidName" v-model="kidName">
       </label>
       <br>
       <label>Birthday:
       <input type="date" name="kidBirthday" v-model="kidBirthday">
       </label>
       <br>
       <label>Image:
       <input type="file" name="file">
       </label>

       <br><h4>Parents</h4>
       <label>name:
       <input type="text" name="pName" v-model="pName">
       </label>
       <br>
       <label>phone:
       <input type="tel" name="pPhone" v-model="pPhone">
       </label>

       <br>
       <label>email:
       <input type="email" name="pEmail" v-model="pEmail">
       </label>

       <br>
       <label>Address:
       <input type="text" name="address" v-model="pAddress">
       </label><br>
        <button @click.stop="createNewKid">Send</button>
    </section>       
</template>

<script>
import kinderService from '../../services/kinderService'
export default {
    
    name: 'kids-admin',
    props: ['kid'],
    created(){
       
    },
    
    data(){
        return {            
            kidName: this.kid.name,
            kidBirthday: 'this.kid.birthday',
            file: 'this.kid.file',
            pName: '',
            pPhone: '',
            pEmail: '',
            pAddress: ''
        }
    },
    computed: {
        
    },
    methods: {
        createNewKid(){
            const kidName     = this.kidName;
            const kidBirthday = this.kidBirthday;
            const file        = this.file;
            // kinderService.createNewKid(kidName,kidBirthday);
            this.$store.dispatch({ type: 'CREATE_KID',kidName,kidBirthday });   

            this.kidName = '';
            this.kidBirthday = '';
            this.file = '';
        },
    },
    watch: {
        kid(kidVal){
            this.kidName = kidVal.name;
        }
    }
}
</script>

<style>

</style>