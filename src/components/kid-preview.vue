<template>
    
  <md-layout md-row-large md-row-medium md-row-small md-gutter >
      <div>
       <md-card>
        <md-card-media v-bind:class="{'gray-scale': !kid.isArrived}" @click="updateKidStatus(kid)">
            <div @click="updateKidStatus(kid)">
                <img :src="kid.img">
            </div>
        </md-card-media>          

        <md-card-header>
            <div class="md-title">{{kid.name}}</div>
            <md-chip class="md-accent" v-if="kid.isArrived">Arrived</md-chip>
            <md-chip v-else>Not Arrived</md-chip>
            <div class="float-right">                
                <md-button class="md-fab md-primary" v-bind:href="'tel:' + kid.parents[0].phone">                    
                        <md-icon>phone</md-icon>                        
                </md-button>
            </div>
        </md-card-header>
            
            
        <md-card-expand>
            <md-card-actions>  
                <md-button class="md-raised" @click="updateKidStatus(kid)" 
                v-if="this.$store.state.permissionLevel >= 1"
                v-bind:class="[kid.isArrived ? 'md-accent' : '']">
                <i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>
                <span class="menu-label">Arrived</span></md-button>

                <md-button class="md-raised md-warn" @click="deleteKid(kid)" v-if="this.$store.state.permissionLevel >= 2">
                    <i class="fa fa-trash fa-2x" aria-hidden="true"></i>
                </md-button>

                <md-button class="md-raised" @click="editKid(kid)" v-if="this.$store.state.permissionLevel >= 2">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </md-button>   
                    <span style="flex: 1"></span>
                    <md-button class="md-icon-button" md-expand-trigger>
                        <md-icon>keyboard_arrow_down</md-icon>
                    </md-button>
           </md-card-actions>

            <md-card-content>
                <p v-if="kid.birthday"><i class="fa fa-birthday-cake fa-2x" aria-hidden="true"></i> {{kid.birthday}}</p>
                <br>
                <h3>Parents</h3>
                <div class="" v-for="parent in kid.parents">
                    <md-list>
                        <md-list-item>
                            <md-icon>Name</md-icon> <span>{{parent.name}}</span>
                        </md-list-item>

                        <md-list-item>
                            <md-icon class="md-primary">phone</md-icon><span>{{parent.phone}}</span>
                        </md-list-item>

                        <md-list-item v-if="parent.email">
                            <md-icon class="md-primary">email</md-icon><span>{{parent.email}}</span>
                        </md-list-item>

                        <md-list-item>
                            <md-icon><i class="fa fa-map-marker" aria-hidden="true"></i></md-icon><span>{{parent.address}}</span>
                        </md-list-item>
                    </md-list>
                    </div>
                    
            </md-card-content>
        </md-card-expand>
       </md-card>
      </div>
       </md-layout>  
         
</template>

<script>

export default {
    
    name: 'kid-preveiw',
    props: ['kid'],
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

.md-card {
    border:1px solid lightgray;
    box-shadow: 0 2px 5px gray;
    margin:0 2px 10px 2px;
    min-width: 300px;
}

.gray-scale {
    filter: grayscale(100%);
}


</style>