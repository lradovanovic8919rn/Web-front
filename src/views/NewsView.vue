<template>
    <div>
        <div class="News">
            <h1>
                {{this.title}}
            </h1>
            <p>
                {{this.content}}
            </p>
            <span class="spacing"  v-for="tag of tags" :key="tag.id">
                <router-link :to="{ name: 'tagview', params: {tag: tag.word } }">
                    {{tag.word}}
                </router-link>
            </span>
            <p>
                <dd>{{ this.date | dateFormatter }}</dd>       
            </p>
            <p>
                {{this.author.name}}
            </p>
        </div>

        <div class="space">
            <div class="col-sm-6 " id="comments">
                <b-form @submit="onSubmit">
                <b-form-group label="Username:" label-for="username">
                <b-form-input class="input" id="username" v-model="form.username" placeholder="Enter username" required></b-form-input>
                </b-form-group>
        
                <b-form-group label="Comment:" label-for="comment">
                <b-form-input class="input" id="comment" v-model="form.content" placeholder="Enter comment" required></b-form-input>
                </b-form-group>
        
                <b-button class="spacing" type="submit" variant="primary">SUBMIT COMMENT</b-button>
            </b-form>
            </div>
        </div>
        <div>
            <span class="spacing"  v-for="c of comments" :key="c.id">
                    {{c.author}}       :       {{c.content}}                            {{c.createdAt | dateFormatter}}    <br>
            </span>
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
      name: 'NewsView',
      
      components: {
      },
  
      data() {
        return {
          api: "http://localhost:8081/api/news/",
          title: "",    
          content: "",  
          tags:[],    
          author: "",  
          date: "",  
          comments: [],
          tn: [],
          indexes: [0,1,2],
          form: {
            username:"",
            content:"",
          }

        };
      },
      filters: {
        dateFormatter: function(val) {
            return new Date(val).toLocaleDateString("sr-Latn-RS");
        },
     },
      computed:{
            sortedArray: function() {
                    function compare(a, b) {
                    if (a.comments.length <= b.comments.length)
                        return -1;
                    if (a.comments.length > b.comments.length)
                        return 1;
                    }

                    return this.tn.sort(compare);
                }

      },
      methods: {
        onSubmit(e) {
            e.preventDefault();
            const newComment = {
                author: this.form.username,
                content: this.form.content,
            };
            this.axios
                .post(
                    this.api + this.$route.params.news + "/comments",
                    newComment
                )
                .then((response) => {
                    console.log(response);
                    this.username = "";
                    this.comment = "";
                    this.$router.go();
                });
       
                },            
            go(id) {
                this.$router.push({ name: 'newsview', params: { news: id } }).catch(err => {});
                location.reload();

            }
      },
      mounted() {
        this.axios
            .get(this.api + this.$route.params.news)
            .then((response) => {
                this.title = response.data.title;
                this.content = response.data.content;
                this.tags = response.data.tags;
                this.author = response.data.author;
                this.date = response.data.createdAt;
                this.comments = response.data.comments;
            });
            this.axios
                .get(this.api )
                .then((response) => {
                    this.tn = response.data;
                    console.log(response.data);

                }).catch((error) => {
                    console.log("Error: " + error);
            });
      }
    }
</script>
<style>
    .spacing {
        margin-top: 10px;
        margin-bottom: 10px;

        
    }
    .space{


        margin-left: 33%;
        

        
    }
</style>