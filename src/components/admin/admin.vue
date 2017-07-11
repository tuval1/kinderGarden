<template>
    <section v-if="this.$store.state.permissionLevel >=2">
        <div class="row">
        <md-card>            
            <md-card-header>
                <md-card-header-text>
                    <div class="md-title">Admin Area</div>
                    <div class="md-subhead">Create a new user</div>
                </md-card-header-text>    
                
                <md-button class="md-icon-button" md-menu-trigger>
                    <a href="#" @click.prevent="closeAdminPanel"><i class="fa fa-window-close-o fa-2x" aria-hidden="true"></i></a>
                </md-button>    
            </md-card-header>        
       
       <md-input-container>
            <label>Enter kid name</label>
            <md-input placeholder="Kid name"  name="kidName" v-model="kidName"></md-input>
       </md-input-container>

       <md-input-container>
            <label>Birthday</label>
            <md-input placeholder="birthday" name="kidBirthday" type="date" v-model="kidBirthday"></md-input>
       </md-input-container>

       <md-input-container>
            <label>Image</label>
            <md-file v-model="file"></md-file>
        </md-input-container>
            
               <div class="parents-form">
                   <h3>Parents details</h3>
                   <form>
                       <md-input-container>
                            <label>Enter the parent name</label>
                            <md-input placeholder="Name" name="pName" v-model="pName"></md-input>
                        </md-input-container>

                        <md-input-container>
                            <md-icon>phone</md-icon>
                            <label>Phone</label>
                            <md-input type="tel" name="pPhone" v-model="pPhone"></md-input>
                        </md-input-container>

                       <md-input-container>
                            <label>Enter the parent email</label>
                            <md-input placeholder="Email" name="pEmail" v-model="pEmail"></md-input>
                        </md-input-container>

                        <md-input-container>
                            <label>The the parent address</label>
                            <md-input placeholder="address" name="address" v-model="pAddress"></md-input>
                        </md-input-container>

                       </form>
                </div>
                <md-button class="md-raised md-primary" @click.stop="createNewKid">Send</md-button>        
        </md-card>
        </div>
    </section>       
    <div v-else>
        
        <md-chip class="md-warn">You are not authorized to access this area!</md-chip>
<md-button class="md-icon-button" md-menu-trigger>
                    <a href="#" @click.prevent="closeAdminPanel"><i class="fa fa-window-close-o fa-2x" aria-hidden="true"></i></a>
                </md-button>  
        </div>
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
            this.$store.commit('TOGGLE_LOADER');
            
            const kidName     = this.kidName;
            const kidBirthday = this.kidBirthday;
            const file        = this.file;
            let kidId         = null;
            const pName       = this.pName;
            const pPhone      = this.pPhone;
            const pEmail      = this.pEmail;
            const pAddress    = this.pAddress;
            //get the kid id for updating the existing kid
            if (this.kid) {
                kidId = this.kid._id;
            }    
            
            const newKid = {
                name: kidName, 
                birthday: kidBirthday, 
                isArrived: false,
                _id: kidId,
                parents: []
            }
            const parentObj = {
                name: pName,
                phone: pPhone,
                email: pEmail,
                address: pAddress
            }            
            newKid.parents.push(parentObj);
                          
            if ( this.isEditMode ) {
                this.$store.dispatch({ type: 'UPDATE_KID', newKid });   
            } else {
                this.$store.dispatch({ type: 'CREATE_KID', newKid });   
            }
            
            this.kidName = '';
            this.kidBirthday = '';
            this.file = '';
            this.closeAdminPanel();
        },
        closeAdminPanel(){
            this.$store.commit('TOGGLE_ADMIN');
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
.parents-form {
    border:1px solid darkgray;
    padding: 5px;
    width:95%;
    margin:auto;
}
.md-card {
    padding:5px;
}

.row {
    padding: 0 10px 0 10px;
}
</style>