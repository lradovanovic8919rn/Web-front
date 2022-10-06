<template>

    <div class="lista">
        <h1>TRENDING NEWS</h1>

        <div  class="user" v-for="i in ind" :key="i">
            <div v-if="news[i]">
                <b-card  @click="go(news[i].id)" class="spacing " body-class="text-center" header-tag="nav">
                
                    <b-card-text>
                        Title   :   {{ news[i].title}}
                    </b-card-text>
                
                    <b-card-text>
                        Content   :   {{news[i].content   | textFormatter }}
                    </b-card-text>

                    <b-card-text>
                        Category   :   {{ news[i].category.name }}
                    </b-card-text>

                    <b-card-text>
                        Visits   :   {{ news[i].visits_num }}
                    </b-card-text>
                
                </b-card>
            </div>
        </div>


        <div class="list">
            <h4>MORE NEWS</h4>
            <div  class="content" v-for="index in indexes" :key="index">
                <b-card @click="go(tn[index].id)" class="spacing " body-class="text-center" header-tag="nav">
                
                    <b-card-text>
                    {{ tn[index].title}}
                    </b-card-text>

                
                </b-card>
            </div>
    
        </div>
    </div>
    </template>

<script>
    export default {
        name:"CmsUsers",
        data() {
            return {
                api: "http://localhost:8081/api/news/",
                news: [],
                tn: [],
                indexes: [0,1,2],
                ind: [0,1,2,3,4,5,6,7,8,9],

            };
        },
        methods:{
            go(id) {
                this.$router.push({ name: 'newsview', params: { news: id } });

            }
        },
        filters: {
            textFormatter(value) {
                     if (value.length < 50) return value;
                    return value.slice(0, 47) + "...";
                },
        },

        computed: {
            orderedUsers: function () {
                return this.news.orderBy('visits_num','asc');
            },
            sortedArray: function() {
                    function compare(a, b) {
                    if (a.comments.length <= b.comments.length)
                        return -1;
                    if (a.comments.length > b.comments.length)
                        return 1;
                    }

                    return this.tn.sort(compare);
                }

        } ,   
        mounted() {
            
            this.axios.get(this.api)
                .then((response) => {
                    console.log(response);
                    this.news = response.data;
            })
                .catch((error) => {
                    console.log("Error: " + error);
            });

            this.axios
                    .get(this.api )
                    .then((response) => {
                        this.tn = response.data;

                        console.log(response.data);

                    }).catch((error) => {
                        console.log("Error: " + error);
            });

        },
        
    }
    </script>