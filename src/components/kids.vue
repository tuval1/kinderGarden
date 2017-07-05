<template>
<section>
    <div class="list-container">
        
        <div class="box" v-for="kid in kids">
            <h3>{{kid.name}}</h3>
            <span></span>
            <button>Arrived</button>
        </div>
            
    </div>
    <button @click="getKidsList">get list</button>
</section>
</template>

<script>
import kinderService from '../services/kinderService'
export default {
    data(){
        return {
            kids: null
        }
    },
    methods: {
        getKidsList(){
            const kidsQuery = kinderService.query();
            kidsQuery.then(res => {
                this.kids = res;
            });
            
        }
    }
}
</script>

<style>
.box {
    border: 1px solid;
    width: 250px;

}
.list-container {
    display: flex;
    flex-direction: row;
}
</style>