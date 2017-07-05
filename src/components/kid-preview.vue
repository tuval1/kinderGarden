<template>
    <section>
       <div class="box">
            <h3>{{kid.name}}</h3>
            <span>is arrived: {{kid.isArrived}}</span><br>
            <img v-bind:src="kid.img">
            <p>birthday: {{kid.birthday}}</p>
            <br>
            <h3>Parents</h3>
            <div class="" v-for="parent in kid.parents">
                <p>Name: {{parent.name}}</p>
                <p>Phone: {{parent.phone}}</p>
                <p>email: {{parent.email}}</p>
                <p>Address: {{parent.address}}</p>
                </div>
            <button @click="updateKidStatus(kid)">Arrived</button>
        </div>
    </section>       
</template>

<script>

export default {
    
    name: 'kid-preveiw',
    props: ['kid'],
    data(){
        return {
            
        }
    },
    methods: {
        
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