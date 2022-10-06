<template>
    <div>
      <div v-if="token">
        <div v-if="role==2">
            <div id="app">
              <Header subtitle="Edit"/>
          
              <b-form @submit="onSubmit">
                <b-form-group label="Name:" label-for="name">
                  <b-form-input id="name" v-model="form.name" placeholder="Enter name" required></b-form-input>
                </b-form-group>
          
                <b-form-group label="Surname:" label-for="surname">
                  <b-form-input id="surname" v-model="form.surname" placeholder="Enter surname" required></b-form-input>
                </b-form-group>

                <b-form-group label="Email:" label-for="email">
                <b-form-input id="email" v-model="form.email" placeholder="Enter email" required></b-form-input>
              </b-form-group>

              <b-form-group label="role">
                <b-form-radio v-model="form.role" name="myChoice" value="2" required>Admin</b-form-radio>
                <b-form-radio v-model="form.role" name="myChoice" value="1" required>Content creator</b-form-radio>

              </b-form-group>
          
                <b-button type="submit" variant="primary">Update</b-button>
              </b-form>
            </div>
          </div>
          <div v-else>
                    <h1>Only admin has access</h1>
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
        api: "http://localhost:8081/api/user/",
        form: {
          name: '',
          surname:'',
          email: '',
          role:'',
          
        }
        
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
        onSubmit(e) {
            e.preventDefault();
            const user = {
                    email: this.form.email,
                    name: this.form.name,
                    surname: this.form.surname,
                    role: this.form.role,
                    hashedPassword: "ista",

                 };
            this.axios
                .put(this.api + this.$route.params.email, user, {
                    headers: {
                        Authorization: "Bearer " + localStorage.token,
                    },
                })
                .then((response) => {
                    console.log(response);
                    this.$router.push({ name: "cmsusers" });
                })
                .catch((error) => {
                    console.log(user);
                    console.log("error: " + error);

                });
        }
    }
    ,
    mounted() {
        this.axios
            .get(this.api + this.$route.params.email, {
                headers: {
                    Authorization: "Bearer " + localStorage.token,
                },
            })
            .then((response) => {
                this.form.name = response.data.name;
                this.form.surname = response.data.surname;
                this.form.email = response.data.email;
                this.form.role = response.data.role;

            });
    },

}
</script>