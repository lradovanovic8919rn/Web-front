<template>
  <div id="app">
    <Header subtitle="Log In"/>

    <b-form @submit="onSubmit">
      <b-form-group label="Email:" label-for="email">
        <b-form-input id="email" v-model="form.email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" placeholder="Enter password" type="password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <p style="color:red">{{this.error}}</p>

  </div>
</template>

<script>
  import {  mapState, mapMutations } from 'vuex';


  export default {
    name: 'Login',
    
    components: {
    },

    data() {
      return {
        api: "http://localhost:8081/api/user/login",
        apiUser: "http://localhost:8081/api/user/",
        error:"",
        form: {
          email: '',
          password: ''
        }
        
      };
    },
    computed: {
      ...mapState([
        'token',
        'email',
        'name',
        'role',
        'status',
      ])
    },

    methods: {
      ...mapMutations([
        'setEmail',
        'setToken',
        'setName',
        'setRole',
        'setStatus',
      ]),
      onSubmit(e) {
        e.preventDefault();


        const userInfo = {
              email: this.form.email,
              hashedPassword: this.form.password,
        };
        this.axios
            .post(this.api, userInfo)
            .then((response) => {
                console.log(response);
                this.setToken(response.data.jwt);
                this.setEmail(this.form.email);
                this.axios
                    .get(this.apiUser + this.form.email, {
                        headers: {
                            Authorization: "Bearer " + response.data.jwt,
                        },
                    })
                    .then((r) => {
                      this.setName(r.data.name);
                      this.setRole(r.data.role);
                      this.setStatus(r.data.status);
                    })
                    .catch((error) => {
                    console.log("error: " + error);

                    });
                this.$router.push({ name: "home" });

            })
            .catch((error) => {
                this.error="An errror has occured.Please try again."
            });
      }
    }
  }
</script>