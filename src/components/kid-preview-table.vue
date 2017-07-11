<template>
    <md-table-card>
  

  <md-table>
    <md-table-header>
    <md-table-row>
      <md-table-head md-sort-by="dessert">Name</md-table-head>
      <md-table-head md-sort-by="calories" md-numeric md-tooltip="">
          Status</md-table-head>
      <md-table-head md-sort-by="fat" md-numeric>Parent name</md-table-head>
      <md-table-head md-sort-by="carbs" md-numeric>Parent phone</md-table-head>
      <md-table-head md-sort-by="carbs" md-numeric>Actions</md-table-head>
      
    </md-table-row>
  </md-table-header>

    <md-table-body>
      <md-table-row v-for="(row, rowIndex) in this.$store.getters.kidsToShow" :key="rowIndex" 
      :md-item="row" md-auto-select>
        <md-table-cell>{{row.name}}</md-table-cell>
        <md-table-cell>
            <md-button class="md-raised md-icon-button" @click="updateKidStatus(row)" 
                v-if="permission >= 1"
                v-bind:class="[row.isArrived ? 'md-accent' : '']">

                <i class="fa fa-check-circle" aria-hidden="true"></i>

                
                </md-button>
            </md-table-cell>
        <md-table-cell>{{row.parents[0].name}}</md-table-cell>
        <md-table-cell>{{row.parents[0].phone}}</md-table-cell>
        <md-table-cell>
            
                <md-button class="md-raised md-icon-button md-warn" @click="deleteKid(row)" v-if="permission >= 2">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </md-button>

                <md-button class="md-raised md-raised md-icon-button" @click="editKid(row)" 
                v-if="permission >= 2">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </md-button>

                <md-button class="md-raised md-primary md-icon-button" v-bind:href="'tel:' + row.parents[0].phone">                    
                        <i class="fa fa-phone" aria-hidden="true"></i>
                    
                </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table-body>
  </md-table>

  <md-table-pagination
    md-size="5"
    md-total="10"
    md-page="1"
    md-label="Rows"
    md-separator="of"
    :md-page-options="[5, 10, 25, 50]"
    @pagination="onPagination"></md-table-pagination>
</md-table-card>
</template>

<script>
export default {    
    name: 'kid-preview-table',
    props: ['permission'],
    data(){
        return {
            
        }
    },
    created(){
        
    },
    methods: {
        updateKidStatus(kid){            
            this.$emit('updateStatus',kid);
        },
        deleteKid(kid){
            this.$emit('openDialog','dialog5',kid);
            //this.$emit('deleteKid', kid);
        },
        editKid(kid){
            
            this.$emit('edit', kid);
        }
    }
}
</script>

<style>
</style>