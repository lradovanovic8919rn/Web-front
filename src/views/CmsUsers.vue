<template>
    <div>
        <div v-if="token">
            <div v-if="role!=2">
                        <h1>Only admin has access</h1>
                    </div>
                <div v-else>
                <div class="user-i">
                
                    <b-button class="spacing" @click="addUser" variant="primary">ADD USER</b-button>
                
                    <div  class="user" v-for="user in users" :key="user.email">
                    <b-card class="spacing" title="User" body-class="text-center" header-tag="nav">
                    
                        <b-card-text>
                            Name   :   {{ user.name }}
                        </b-card-text>
                    
                        <b-card-text>
                            Surname   :   {{ user.surname }}
                        </b-card-text>

                        <b-card-text>
                            Email   :   {{ user.email }}
                        </b-card-text>

                        <b-card-text v-if="user.role==1">
                            Role   :   Content creator
                        </b-card-text>

                        <b-card-text v-else>
                            Role   :   Admin
                        </b-card-text>


                        <b-card-text>
                            <b-nav-item style="color:green;" v-if="!user.status">Active</b-nav-item>
                            <b-nav-item style="color:red;" v-else >Inactive</b-nav-item>
                        </b-card-text>
                    
                        <b-button class="btn btn-space" @click="editUser(user.email)" variant="primary">EDIT</b-button>
                        

                        <b-button v-if="user.role==1" class="btn btn-space" @click="changeStatus(user.email,user.email)" variant="primary">CHANGE STATUS</b-button>
                    
                    </b-card>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h1>You have to log in</h1>
        </div>
    </div>
</template>

<script>
    import {  mapState} from 'vuex';

    export default {
        name:"CmsUsers",
        data() {
            return {
                api: "http://localhost:8081/api/user/",
                users: [],
                complex: null,
            };
        },
        computed:{
            ...mapState([
                'token',
                'email',
                'role',
            ]),
        },
        methods:{
            addUser() {
                this.$router.push({ name: "cmsuseradd" });
            },
            changeStatus(e, s) {
                console.log("change status: " + e);
                this.axios
                    .put(this.api + "status/" + e, s, {
                        headers: {
                            Authorization: "Bearer " + localStorage.token,
                        },
                    })
                    .then((response) => {
                        console.log(response);
                        this.$router.go();
                    })
                    .catch((error) => {
                        console.log("error: " + error);

                    });
            },

            editUser(email) {
                this.$router.push({
                    name: "cmsuseredit",
                    params: { email: email },
                });
            },
    
        },
    
        mounted() {
        this.axios
            .get(this.api, {
                headers: {
                    Authorization: "Bearer " + localStorage.token,
                },
            })
            .then((response) => {
                this.users = response.data;
            })
            .catch((error) => {
                console.log(localStorage.token);
                console.log("error: " + error);

            });
    },
    }
    </script>

    <style>
    .btn-space {
        margin-right: 5px;
    }
    .spacing {
        margin-top: 5px;
        
    }
    </style>