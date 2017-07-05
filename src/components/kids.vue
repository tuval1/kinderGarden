<template>
<section>
    <div class="edit-area">
        <kid-edit></kid-edit>
        </div>
    <div class="list-container">
        <kid-preview v-for="currKid in kids" :kid="currKid" @updateStatus="updateKidStatus"
        @deleteKid="deleteKid"></kid-preview>            
    </div>
    
</section>
</template>

<script>
import kinderService from '../services/kinderService'
import kidPreview from './kid-preview'
import kidEdit from './admin/kid-edit'
export default {
    data(){
        return {
            
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
        kidEdit
    },
    methods: {       
        updateKidStatus(kid){
            kinderService.updateKidStatus(kid);
        },
        deleteKid(kid){
            console.log('request delete',kid);
            this.$store.dispatch({ type: 'KID_DELETE', kid }); 
        }
    }
}
</script>

<style>
</style>