<template>
    <section>
        <md-input-container>
    <label>Filter for a kid</label>
    <md-input placeholder="Filter..." v-model="filterTxt"></md-input>
  </md-input-container>
       
    </section>       
</template>

<script>
export default {    
    name: 'kidFilter',    
    data(){
        return {
            filterTxt: null
        }
    },
    methods: {
        
    },
    watch: {
        filterTxt( txt ){
            
            this.$store.commit( { type: 'KID_FILTER', txt } )
        }
    }
}
</script>

<style>

</style>