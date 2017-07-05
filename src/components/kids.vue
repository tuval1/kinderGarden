<template>
<section>
    <div class="list-container">
        <kid-preview v-for="currKid in kids" :kid="currKid" @updateStatus="updateKidStatus"></kid-preview>            
    </div>
    
</section>
</template>

<script>
import kinderService from '../services/kinderService'
import kidPreview from './kid-preview'
export default {
    data(){
        return {
            kids: null
        }
    },
    created(){
        kinderService.query().then(res => { this.kids = res });            
    },
    components: {
        kidPreview
    },
    methods: {       
        updateKidStatus(kid){
            kinderService.updateKidStatus(kid);
        }
    }
}
</script>

<style>
</style>