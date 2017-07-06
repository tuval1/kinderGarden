<template>
    <section>
       <h3>Edit Area</h3>
       {{kid}}
    </section>       
</template>

<script>
import kinderService from '../../services/kinderService'
export default {
    
    name: 'kids-edit',
    props: ['kid'],
    data(){
        return {
            kidName: '',
            kidBirthday: '',
            file: '',
            pName: '',
            pPhone: '',
            pEmail: '',
            pAddress: ''
        }
    },
    methods: {
        
    }
}
</script>

<style>

</style>