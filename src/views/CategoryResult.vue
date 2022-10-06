<template>
    <div>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        class="spacing2"
      ></b-pagination>

      <b-table
      class="table table-hover"
      id="my-table"
      :items="news"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="column"
      small
      @row-clicked="rowClicked"

    >
    </b-table>
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
            name:"CategoryResult",
            data() {
                return {
                    perPage: 10,
                    currentPage: 1,
                    api: "http://localhost:8081/api/news/category/",
                    apiNews: "http://localhost:8081/api/news/",
                    news: [],
                    tn: [],
                    indexes: [0,1,2],
                    column: [
                    {
                        key: "title",
                        label: "Title"
                    },{
                        key: "content",
                        label: "Content",
                        formatter:"textFormatter"
                    },{
                        key: "createdAt",
                        label: "Date",
                        formatter:"dateFormatter"
                    }]
    
                };
            },
            methods:{
                dateFormatter(value) {
                    return new Date(value).toLocaleDateString("sr-Latn-RS");
                },
                textFormatter(value) {
                     if (value.length < 50) return value;
                    return value.slice(0, 47) + "...";
                },
                rowClicked(record, index) {
                    console.log(this.news);
                    console.log(record.id);
                    this.$router.push({ name: 'newsview', params: { news: record.id } });
                },
            },
    
            computed: {
                rows() {
                    return this.news.length;
                },
                sliced: function() {
                    return this.news.slice(
                        (this.currentPage - 1) * this.perPage,
                        this.currentPage * this.perPage,
                );
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
                
                this.axios
                    .get(this.api + this.$route.params.category)
                    .then((response) => {
                        this.news = response.data;
                        console.log(response.data);

                    }).catch((error) => {
                        console.log("Error: " + error);
                    });
                    this.axios
                    .get(this.apiNews )
                    .then((response) => {
                        this.tn = response.data;

                        console.log(response.data);

                    }).catch((error) => {
                        console.log("Error: " + error);
                    });
    
            },
            
        }
        </script>
        <style>
        .spacing {
            margin-top: 5px;
            
        }
        </style>