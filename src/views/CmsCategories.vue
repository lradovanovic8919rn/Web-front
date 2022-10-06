<template>
    <div>
        <div v-if="token">
                    <div v-if="status==1">
                        <h1>Your account is inactive</h1>
                    </div>
                <div v-else>
                <div class="l">

                    <b-button class="spacing"  @click="createCategory" variant="primary">ADD CATEGORY</b-button>

                    <div class="category" v-for="c in categories" :key="c.name">
                    <b-card title="Category"  @click="go(c.name)" class="spacing" body-class="text-center" header-tag="nav">

                        <b-card-text>
                            {{ c.name }}
                        </b-card-text>

                        <b-card-text>
                            {{ c.description }}
                        </b-card-text>

                        <b-button class="btn btn-space" @click="editCategory(c.name)" variant="primary">EDIT</b-button>
                        
                        
                        <b-button class="btn btn-space" @click="deleteCategory(c.name)" variant="primary">DELETE</b-button>

                        
                    </b-card>

                    </div>
                    <p style="color:red">{{this.error}}</p>

                </div>
            </div>
        </div>
        <div v-else>
            <h1>You have to log in</h1>
        </div>
    </div>

</template>

<script>
import {  mapState, mapMutations } from 'vuex';

export default {
    name:"CmsCategories",
    data() {
        return {
            api: "http://localhost:8081/api/category/",
            categories: [],
            error:"",
        };
    },
    computed:{
        ...mapState([
                'token',
                'email',
                'role',
                'status',

            ]),
    }
    ,
    methods:{


        createCategory() {
            this.$router.push({ name: "cmscategoryadd" });
        },

        editCategory(id) {
            this.$router.push({
                name: "cmscategoryedit",
                params: { category: id },
            });
        },

        deleteCategory(id) {
            this.axios.delete(this.api + id,{
                        headers: {
                            Authorization: "Bearer " + localStorage.token,
                        },
                    })
                .then((response) => {
                    console.log(response);
                    console.log(id);
                    this.$router.push({name: "cmscategories"});
                })
                .catch((error) => {
                    this.error="An errror has occured.Please try again."

              });
        },
        go(name){
            this.$router.push({name: "categoryresult",params: { category: name },});
        }
    },

    mounted() {
        this.axios.get(this.api)
            .then((response) => {
                this.categories = response.data;
                console.log(this.categories);
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