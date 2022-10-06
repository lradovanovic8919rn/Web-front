<template>
    <div>
            <div v-if="token">
                    <div v-if="status==1">
                        <h1>Your account is inactive</h1>
                    </div>
                <div v-else>
                    <b-button class="spacing" @click="addNews" variant="primary">ADD NEWS</b-button> <br>
                    
                    <b-input type="text" v-model="search" placeholder="Search" /> <br> 
                    <b-button @click="filteredProducts(search)" class="b" type="submit">Search</b-button>


                    <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
                        class="spacing2"
                    ></b-pagination>

                    <b-table
                    id="my-table"
                    :items="show"
                    :per-page="perPage"
                    :current-page="currentPage"
                    :fields="column"
                    small
                    @row-clicked="rowClicked"

                    >
                    <template v-slot:cell(edit)="data">
                    <span><b-btn @click="editNews(data.item)">EDIT</b-btn></span>
                    </template>

                    <template v-slot:cell(delete)="data">
                    <span><b-btn @click="deleteNews(data.item)">DELETE</b-btn></span>
                    </template>


                    </b-table>
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
                perPage: 10,
                currentPage: 1,
                api: "http://localhost:8081/api/news/",
                news: [],
                show: [],
                search: "",
                column: [
                {
                    key: "id",
                    label: "ID"
                },{
                    key: "title",
                    label: "Title"
                },
                {
                    key: "edit",
                    label: "Edit"
                },{
                    key: "delete",
                    label: "Delete"
                }]

            };
        },
        methods:{
            addNews() {
                this.$router.push({ name: "cmsnewsadd" });
            },
            rowClicked(record, index) {
                console.log(this.news);
                console.log(record.id);
                this.$router.push({ name: 'newsview', params: { news: record.id } });
            },
            filteredProducts(s) {
                this.show=[]
                this.news.forEach(n => {
                    if(n.title.includes(s) || n.content.includes(s)){
                        this.show.push(n);

                    }
                    
                });
            },
            deleteNews(n) {
                this.axios
                .delete(this.api + n.id,{
                        headers: {
                            Authorization: "Bearer " + localStorage.token,
                        },
                    })
                .then((response) => {
                    console.log(response);
                    this.$router.go();
                });
            },
            editNews(n) {
                this.$router.push({ name: "cmsnewsedit", params: { id: n.id } });

            }

            
        },
        
        computed: {
            ...mapState([
                'token',
                'email',
                 'role',
                 'status',

            ]),
            sortedItems: function() {
                return this.news.sort((a, b) => new Date(a.date) - new Date(b.date));
            },
            rows() {
                return this.news.length;
            },
            sliced: function() {
                return this.news.slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage,
            );
            },


        } ,   
        mounted() {
            
            this.axios.get(this.api)
                .then((response) => {
                    console.log(response);
                    this.news = response.data;
                    this.show = response.data;
            })
                .catch((error) => {
                    console.log("Error: " + error);
            });

        },
        
    }
    </script>
    <style>
    .spacing {
        margin-top: 5px;
        
    }
    .spacing2 {
        margin-top: 5px;
        margin-left: 45.5%;
        
    }
    </style>