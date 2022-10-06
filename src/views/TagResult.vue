<template>
    <div>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <b-table
      id="my-table"
      class="table table-hover"
      :items="news"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="column"
      small
      @row-clicked="rowClicked"

      
    >
    <template v-slot:cell(edit)="data">
    </template>
    </b-table>

    </div>
  </template>
  
  <script>
    export default {
        name:"CmsUsers",
        data() {
            return {
                perPage: 10,
                currentPage: 1,
                api: "http://localhost:8081/api/news/tag/",
                news: [],
                column: [
                {
                    key: "id",
                    label: "ID"
                },{
                    key: "title",
                    label: "Title"
                },
            ]

            };
        },
        methods:{
            rowClicked(record, index) {
                    console.log(this.news);
                    console.log(record.id);
                    this.$router.push({ name: 'newsview', params: { news: record.id } });
                 }
        },

        computed: {
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
            
            this.axios.get(this.api + this.$route.params.tag)
            .then((response) => {
                this.news = response.data;
             });

        },
        
    }
    </script>
    <style>
    .spacing {
        margin-top: 5px;
        
    }
    </style>