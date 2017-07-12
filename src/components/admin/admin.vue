<template>
    <section v-if="this.$store.state.permissionLevel >=2">
        <div class="row">
            <md-card>
                <form @submit.prevent="validateBeforeSubmit">
                    <md-card-header>
                        <md-card-header-text>
                            <div class="md-title">Admin Area</div>
                            <div class="md-subhead">Create a new user</div>
                        </md-card-header-text>
    
                        <md-button class="md-icon-button" md-menu-trigger>
                            <a href="#" @click.prevent="closeAdminPanel">
                                <i class="fa fa-window-close-o fa-2x" aria-hidden="true"></i>
                            </a>
                        </md-button>
                    </md-card-header>
    
                    <md-input-container v-bind:class="{'md-input-invalid': errors.has('kidName')}">
                        <label>Enter kid name</label>
                        <md-input placeholder="Kid name" name="kidName" v-model="kidName" v-validate="'required'"></md-input>
                        <span v-show="errors.has('kidName')">The kid name field is required</span>
    
                    </md-input-container>
    
                    <md-input-container>
                        <label>Birthday</label>
                        <md-input placeholder="birthday" name="kidBirthday" type="date" v-model="kidBirthday"></md-input>
                    </md-input-container>
    
                    <md-input-container v-bind:class="{}">
                        <label>Image</label>
                        <md-file v-model="file" @selected="httpRequest"></md-file>                        
                    </md-input-container>
                    <md-spinner md-indeterminate v-if="loading"></md-spinner>
                    <span>{{uploadMsg}}</span>
                    <div class="parents-form">
                        <h3>Parents details</h3>
                        <form>
                            <md-input-container v-bind:class="{'md-input-invalid': errors.has('pName')}">
                                <label>Enter the parent name</label>
                                <md-input placeholder="Name" name="pName" v-model="pName" v-validate="'required|alpha'"></md-input>
                                <span v-show="errors.has('pName')">The parent's name is required</span>
                            </md-input-container>
    
                            <md-input-container v-bind:class="{'md-input-invalid': errors.has('pPhone')}">
                                <md-icon>phone</md-icon>
                                <label>Phone</label>
                                <md-input type="tel" name="pPhone" v-model="pPhone" v-validate="'required|numeric'"></md-input>
                                <span v-show="errors.has('pPhone')">The parent's phone is required</span>
                            </md-input-container>
    
                            <md-input-container>
                                <label>Enter the parent email</label>
                                <md-input placeholder="Email" name="pEmail" v-model="pEmail"></md-input>
                            </md-input-container>
    
                            <md-input-container>
                                <label>The the parent address</label>
                                <md-input placeholder="address" name="address" v-model="pAddress"></md-input>
                            </md-input-container>
    
                        </form>
                    </div>
                    <!--<md-button class="md-raised md-primary" @click.stop="createNewKid">Send</md-button>  -->
    
                    
                    <md-button class="md-raised md-primary" type="submit">Send</md-button>
    
                </form>
            </md-card>
        </div>
    </section>
    <div v-else>
    
        <md-chip class="md-warn">You are not authorized to access this area!</md-chip>
        <md-button class="md-icon-button" md-menu-trigger>
            <a href="#" @click.prevent="closeAdminPanel">
                <i class="fa fa-window-close-o fa-2x" aria-hidden="true"></i>
            </a>
        </md-button>
    </div>
</template>

<script>
import kinderService from '../../services/kinderService'
import axios from 'axios'
export default {

    name: 'kids-admin',
    props: ['kid', 'isEditMode'],
    beforeCreate() {

    },
    created() {

    },

    data() {
        return {
            kidName: null,
            kidBirthday: null,
            file: null,
            pName: null,
            pPhone: '',
            pEmail: '',
            pAddress: '',
            kidId: null,
            cloud_name: 'du3plhmuu',
            upload_preset: 'y62aynfl',
            msg: 'Simple Img Uploader Using cloudinary & axios & Vue',
            imageUrl: '',
            loading: false,
            uploadMsg: null

        }
    },
    computed: {

    },
    methods: {
        validateBeforeSubmit() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    // eslint-disable-next-line
                    this.createNewKid();
                    return;
                }

                alert('Correct them errors!');
            });


        },
        createNewKid() {
            const kidName = this.kidName;
            const kidBirthday = this.kidBirthday;
            const imgUrl = this.imageUrl;
            let kidId = null;
            const pName = this.pName;
            const pPhone = this.pPhone;
            const pEmail = this.pEmail;
            const pAddress = this.pAddress;
            //get the kid id for updating the existing kid
            if (this.kid) {
                kidId = this.kid._id;
            }

            const newKid = {
                name: kidName,
                birthday: kidBirthday,
                isArrived: false,
                img: imgUrl,
                _id: kidId,
                parents: []
            }
            const parentObj = {
                name: pName,
                phone: pPhone,
                email: pEmail,
                address: pAddress
            }
            newKid.parents.push(parentObj);

            if (this.isEditMode) {
                this.$store.dispatch({ type: 'UPDATE_KID', newKid });
            } else {
                this.$store.dispatch({ type: 'CREATE_KID', newKid });
            }

            this.kidName = '';
            this.kidBirthday = '';
            this.file = '';
            // this.closeAdminPanel();
        },
        closeAdminPanel() {
            this.$store.commit('TOGGLE_ADMIN');
            this.$emit('close');
        },
        httpRequest(req) {
            this.loading = true;
            let formData = new FormData();
            formData.append('file', req[0]);
            formData.append('upload_preset', this.upload_preset);
            
            axios({
                url: `https://api.cloudinary.com/v1_1/${this.cloud_name}/image/upload`,
                method: 'POST',
                headers: {
                    'Content-Type': undefined,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                data: formData,
            }).then((res) => {
                if (res.status === 200) {
                    console.log('upload sucsess', res);
                    this.imageUrl = res.data.url;
                    this.loading = false;
                    this.uploadMsg = "Image has been upload successfully"
                }
                else {
                    console.info('oops, something went wrong', res);
                    
                }
            }).catch((err) => {
                console.error(err);
                this.uploadMsg = "Opps...something went wrong, check your image."
                this.loading = false;
            });
        },

    },

    watch: {
        kid(kidVal) {
            this.kidName = kidVal.name;
            this.kidBirthday = kidVal.birthday;
            this.kidId = kidVal._id;
            this.pName = kidVal.parents[0].name;
            this.pPhone = kidVal.parents[0].phone;
            this.pEmail = kidVal.parents[0].email;
            this.pAddress = kidVal.parents[0].address;

        }
    }
}
</script>

<style>
.parents-form {
    border: 1px solid darkgray;
    padding: 5px;
    width: 95%;
    margin: auto;
}

.md-card {
    padding: 5px;
}

.row {
    padding: 0 10px 0 10px;
}
</style>