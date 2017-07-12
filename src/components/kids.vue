<template>
<section>      
    <md-dialog-confirm
  :md-title="confirm.title"
  :md-content-html="confirm.contentHtml + ' ' + '<b>' + kidName + '</b>' + ' from the list'"
  :md-ok-text="confirm.ok"
  :md-cancel-text="confirm.cancel"
  @open="onOpen"
  @close="onClose"
  ref="dialog5">
</md-dialog-confirm>
    
    <div class="edit-area">
        <admin :kid="selectedKid" :isEditMode="isEditMode" v-show="showAdmin1"
        @close="closeAdminPanel"></admin>
    </div>

    <kidFilter @toggleView="toggleListView"></kidFilter>
    

    <div class="list-container">
        <kid-preview-table :permission="this.$store.state.permissionLevel"
        @updateStatus="updateKidStatus" @deleteKid="deleteKid" 
        @edit="editKid" v-if="listView" @openDialog="openDialog">
        </kid-preview-table>

        <md-layout md-gutter>
            <p v-if="kids.length===0">There are not kid</p>
            <kid-preview v-for="currKid in kids" :kid="currKid" @updateStatus="updateKidStatus"
            @deleteKid="deleteKid" @edit="editKid" v-if="!listView"
             @openDialog="openDialog" >
            </kid-preview>     
        </md-layout>  

        
    </div>
    
   
</section>
</template>

<script>
import kinderService from '../services/kinderService'
import kidPreview from './kid-preview'
import kidPreviewTable from './kid-preview-table'
import kidFilter from './filter'
import admin from './admin/admin'
import confirm from './confirm'
import router from '../router'

export default {
    data(){
        return {
            isEditMode: false,            
            selectedKid: null,
            kidName: '',
            confirm: {
                title: 'Are you sure?',
                contentHtml: 'You are about to delete',
                ok: 'OK',
                cancel: 'Cancel'
            },
            listView: false,
            showAdmin1: false
        }
    },
    created(){        
        this.$store.dispatch({ type: 'KIDS_LOAD' });
    },
    computed: {
        kids(){            
            return this.$store.getters.kidsToShow;
        },
        showAdmin(){
            return this.$store.state.showAdminPanelState;
        }
    },
    components: {
        kidPreview,        
        admin,
        kidFilter,
        kidPreviewTable        
    },
    methods: {       
        updateKidStatus(kid){
            kinderService.updateKidStatus(kid);
        },
        deleteKid(){                
            let kid = this.selectedKid;
            this.$store.dispatch({ type: 'KID_DELETE', kid }); 
            this.clearSelectedKid();
            
        },
        editKid(kid){
            // this.$store.selectedKid = kid;
            // this.showAdmin1 = true;
            this.selectedKid = kid;
            // this.isEditMode = true;     
            router.push('/admin');
            // this.$store.commit('UPDATE_KID');
            // this.$store.commit('TOGGLE_ADMIN');
        },
        closeAdminPanel(){
            this.showAdminPanel = false;
            this.isEditMode     = false;
            this.showAdmin1     = false;
            
            this.clearSelectedKid();
        },
        clearSelectedKid(){
            this.selectedKid = null;
        },
        toggleListView(){
            this.listView = !this.listView;
        },
        openDialog(ref,kid) {            
            this.selectedKid = kid;
            this.kidName     = this.selectedKid.name;
            this.$refs[ref].open();
        },
        closeDialog(ref) {
        this.$refs[ref].close();
        },
        onOpen(kid) {
        console.log('Opened',kid);
        },
        onClose(type) {
        console.log('Closed', type);
        if(type==='ok'){
            console.log('confirmed');
            this.deleteKid();
        }
    }
        
    },
    // mounted(){
    //     if (this.$store.state.loading)
    //         this.$store.commit('TOGGLE_LOADER');            
    //     }
    
}
</script>

<style>
.list-container {
    
}
</style>