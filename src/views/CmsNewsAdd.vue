<template>
    <div>
      <div v-if="token">
        <div v-if="status==1">
          <h1>Your account is inactive</h1>
        </div>
        <div v-else>
            <div id="app">
              <Header subtitle=""/>
          
              <b-form @submit="onSubmit">
                <b-form-group label="Title:" label-for="title">
                  <b-form-input id="title" v-model="form.title" placeholder="Enter title" required></b-form-input>
                </b-form-group>
          
                <b-form-group label="Content:" label-for="content">
                  <b-form-input id="content" v-model="form.content" placeholder="Enter content" required></b-form-input>
                </b-form-group>
                <b-form-group label="Category:" label-for="category">
                    <b-form-select v-model="form.category" :options="options"></b-form-select>
                </b-form-group>
                <b-form @submit.prevent="onSubmitNested(tag)">
                
                <p>{{form.tags}}</p>

                <b-form-group label="Tag:" label-for="tag">
                  <b-form-input id="tag" v-model="tag" placeholder="Enter tag" required></b-form-input>
                </b-form-group>

                <b-button class="spacing" type="submit" variant="primary">ADD TAG</b-button>

                </b-form>

          
                <b-button class="spacing" type="submit" variant="primary">ADD</b-button>
              </b-form>
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
    
        data() {
          return {
            api: "http://localhost:8081/api/news/",
            apiCategory: "http://localhost:8081/api/category/",
            options: [],
            tag:'',
            tagObj:[],
            cat:"",
            a:"",
            form: {
                title: "",
                content: "",
                category: "",
                tags: [],

            }
            
          };
        },
        computed:{
          ...mapState([
                'token',
                'email',
                'status',

            ]),
        },
        methods:{
            onSubmit(e) {
                e.preventDefault();
                this.form.tags.forEach(t => {
                  this.tagObj.push({word : t})
                });
                this.cat=({name:this.form.category});
                this.a=({email:localStorage.email});
                const news = {
                    title: this.form.title,
                    content: this.form.content,
                    category: this.cat,
                    author:this.a,
                    tags: this.tagObj,
                }  ;
                this.axios
                    .post(this.api, news,{
                        headers: {
                            Authorization: "Bearer " + localStorage.token,
                        },
                    })
                    .then((response) => {
                      console.log(response);
                      console.log(this.tag);
                      this.$router.push({ name: "cmsnews" });
                    })
                    .catch((error) => {
                        console.log("error: " + error.response.data+"---------");
                        console.log("error: " + error.response.status+"---------");
                        console.log("error: " + error.response.header);
                        console.log(news);
                    });
       
                },onSubmitNested(t) {
                    this.form.tags.push(t);

            }




    
    },
    mounted() {
        this.axios.get(this.apiCategory).then((response) => {
            let array = response.data;
            array.forEach((element) => {
                this.options.push(element.name);
            });
        });
    }
}
</script>
<style>
    .spacing {
        margin-top: 5px;
        
    }
</style>