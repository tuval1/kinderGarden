<template>
    <section>
        <a href="" @click.prevent="closeAdminPanel">X</a>
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
       <div class="parents-form">
            <h4>Parents</h4>
            <form>
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
            </label><br>
            
            <label>Address:
            <input type="text" name="address" v-model="pAddress">
            </label><br>
            </form>
       </div>
        <button @click.stop="createNewKid">Send</button><br>
        
    </section>       
</template>

<script>
import kinderService from '../../services/kinderService'
export default {
    
    name: 'kids-admin',
    props: ['kid','isEditMode'],
    beforeCreate(){
        
    },
    created(){
       console.log('created kid: ',this.kid);
    },
    
    data(){
        return {            
            kidName: null,
            kidBirthday: null,
            file: null,
            pName: '',
            pPhone: '',
            pEmail: '',
            pAddress: '',
            kidId: null
            
        }
    },
    computed: {
        
    },
    methods: {
        createNewKid(){
            const kidName     = this.kidName;
            const kidBirthday = this.kidBirthday;
            const file        = this.file;
            let kidId         = null;
            //get the kid id for updating the existing kid
            if (this.kid) {
                kidId = this.kid._id;
            }          
            const newKid = {
                name: kidName, 
                birthday: kidBirthday, 
                isArrived: false,
                _id: kidId
            }
            
              console.log('iseditmode: ',this.isEditMode);
            
            if ( this.isEditMode ) {
                this.$store.dispatch({ type: 'UPDATE_KID', newKid });   
            } else {
                this.$store.dispatch({ type: 'CREATE_KID', newKid });   
            }
            
            this.kidName = '';
            this.kidBirthday = '';
            this.file = '';
        },
        closeAdminPanel(){
            this.$emit('close');
        }
    },
    
    watch: {
        kid(kidVal){
            this.kidName     = kidVal.name;
            this.kidBirthday = kidVal.birthday;
            this.kidId       = kidVal._id;

        }
    }
}
</script>

<style>

</style>