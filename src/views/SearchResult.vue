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
      id="my-table"
      class="table table-hover"
      :items="filteredNews"
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
            name:"SerachResult",
            data() {
                return {
                    perPage: 10,
                    currentPage: 1,
                    api: "http://localhost:8081/api/news/",
                    news: [],
                    show:[],
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
                filteredNews() {
                    return this.news
                        .filter((n) => {
                            console.log(localStorage.search);
                            console.log(n.title);
                        return (n.title.includes(localStorage.search) || n.content.includes(localStorage.search));
                        })
                    },
    
            } ,   
            mounted() {
                
                this.axios.get(this.api)
                .then((response) => {
                    console.log("123")
                    this.news = response.data;

                 });

                 
            },
            
        }
</script>
<style>
    .spacing {
        margin-top: 5px;        
    }
    .spacinginput {
        margin-left: 5px;  
        width:100px;      
    }
</style>