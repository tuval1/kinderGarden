<template>
    <section>
        <md-layout md-gutter class="space-around">
  <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
<md-input-container>
    <label>Filter for a kid</label>
    <md-input placeholder="Filter..." v-model="filterTxt"></md-input>
</md-input-container>
  </md-layout>

    <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">

<md-button-toggle md-single class="bg-white">
    <md-button @click="resetFilter">All</md-button>
    <md-button @click="filterByPrm('absent')">Absent</md-button>
    <md-button @click="filterByPrm('arrived')">arrived</md-button>  
</md-button-toggle>
    </md-layout>
    
    <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
        <md-button-toggle md-single>
            <md-button class="md-toggle" @click="toggleView"><i class="fa fa-list" aria-hidden="true"></i>
            </md-button>
            <md-button @click="toggleView"><i class="fa fa-bars" aria-hidden="true"></i>
            </md-button> 
        </md-button-toggle>
    </md-layout>
    </md-layout>
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
        filterByPrm( prm ){
            this.$store.commit('FILTER_BY_PARAM', prm);
        },
        resetFilter(){
            this.$store.commit('RESET_FILTER');
        },
        toggleView(){
            this.$emit('toggleView');
        }
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