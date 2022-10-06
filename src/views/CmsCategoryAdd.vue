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
            <b-form-group label="Category name:" label-for="category-name">
              <b-form-input id="category-name" v-model="form.name" placeholder="Enter category name" required></b-form-input>
            </b-form-group>
      
            <b-form-group label="Category description:" label-for="category-description">
              <b-form-input id="category-description" v-model="form.description" placeholder="Enter category description" required></b-form-input>
            </b-form-group>
      
            <b-button type="submit" variant="primary">ADD</b-button>
            <p style="color:red">{{this.error}}</p>

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
    name: 'CmsCategoryAdd',
    
    components: {
    },

    data() {
      return {
        api: "http://localhost:8081/api/category/",
        error:"",
        form: {
          name: '',
          description: ''
        }
        
      };
    },

    computed:{
        ...mapState([
                'token',
                'email',
                'role',
                'status',

            ]),
    },
    methods: {

      onSubmit(e) {
        e.preventDefault();


        const category = {
              name: this.form.name,
              description: this.form.description,
        };
        this.axios
              .post(this.api, category,{
                        headers: {
                            Authorization: "Bearer " +localStorage.token,
                        },
                    })
              .then((response) => {
                  console.log(response);
                  console.log(category);
                  this.$router.push({ name: "cmscategories" }).catch(()=>{});;
              })
              .catch((error) => {
                this.error="An errror has occured.Please try again."

              });
    }
  }
}
</script>