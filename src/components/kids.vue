<template>
<section>
    <a href="" @click.prevent="showCreatePanel">Create new kid</a>
    <div class="edit-area">
        <admin :kid="selectedKid" :isEditMode="isEditMode" v-show="showAdminPanel"
        @close="closeAdminPanel"></admin>
        </div>
    <div class="list-container">
        <kid-preview v-for="currKid in kids" :kid="currKid" @updateStatus="updateKidStatus"
        @deleteKid="deleteKid" @edit="editKid"></kid-preview>            
    </div>
    
</section>
</template>

<script>
import kinderService from '../services/kinderService'
import kidPreview from './kid-preview'

import admin from './admin/admin'
export default {
    data(){
        return {
            isEditMode: false,
            showAdminPanel: false,
            selectedKid: null
        }
    },
    created(){        
        this.$store.dispatch({ type: 'KIDS_LOAD' });      
        
    },
    computed: {
        kids(){            
            return this.$store.getters.kidsToShow;
        }
    },
    components: {
        kidPreview,        
        admin
    },
    methods: {       
        updateKidStatus(kid){
            kinderService.updateKidStatus(kid);
        },
        deleteKid(kid){
            console.log('request delete',kid);
            this.$store.dispatch({ type: 'KID_DELETE', kid }); 
        },
        editKid(kid){
            this.selectedKid = kid;
            this.isEditMode = true;            
            this.showAdminPanel = true;
        },
        closeAdminPanel(){
            this.showAdminPanel = false;
            this.isEditMode     = false;
            this.selectedKid    = null;
        },
        showCreatePanel(){
            this.showAdminPanel = true;
        }
    }
}
</script>

<style>
</style>