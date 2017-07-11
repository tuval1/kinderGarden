<template>
<section>      
    <md-dialog-confirm
  :md-title="confirm.title"
  :md-content-html="confirm.contentHtml + ' ' + '<b>' + 'JSON.stringify(this.selectedKid.name)' + '</b>' + ' from the list'"
  :md-ok-text="confirm.ok"
  :md-cancel-text="confirm.cancel"
  @open="onOpen"
  @close="onClose"
  ref="dialog5">
</md-dialog-confirm>
    
    <div class="edit-area">
        <admin :kid="selectedKid" :isEditMode="isEditMode" v-show="showAdmin"
        @close="closeAdminPanel"></admin>
    </div>

    <div class="list-container">
        <md-layout md-gutter>
        <kid-preview v-for="currKid in kids" :kid="currKid" @updateStatus="updateKidStatus"
        @deleteKid="deleteKid" @edit="editKid" v-if="!showAdmin" @openDialog="openDialog"></kid-preview>     
        </md-layout>       
    </div>
    
   
</section>
</template>

<script>
import kinderService from '../services/kinderService'
import kidPreview from './kid-preview'
import kidFilter from './filter'
import admin from './admin/admin'
import confirm from './confirm'


export default {
    data(){
        return {
            isEditMode: false,            
            selectedKid: null,
            confirm: {
                title: 'Are you sure?',
                contentHtml: 'You are about to delete',
                ok: 'OK',
                cancel: 'Cancel'
            }              
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
        kidFilter
        
    },
    methods: {       
        updateKidStatus(kid){
            kinderService.updateKidStatus(kid);
        },
        deleteKid(){    
            console.log('delete kid',this.selectedKid);
            let kid = this.selectedKid;
            this.$store.dispatch({ type: 'KID_DELETE', kid }); 
        },
        editKid(kid){
            this.selectedKid = kid;
            this.isEditMode = true;            
            this.$store.commit('TOGGLE_ADMIN');
        },
        closeAdminPanel(){
            this.showAdminPanel = false;
            this.isEditMode     = false;
            this.selectedKid    = null;
        },        
        openDialog(ref,kid) {            
            this.selectedKid = kid;            
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