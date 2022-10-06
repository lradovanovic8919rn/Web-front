<template>
  <div id="app">
    <div class="social">
      <div>

          <b-navbar toggleable="sm" type="dark" variant="info">
          
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-navbar-nav>
            <b-nav-item class="b" to="/">Home</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav>
            <b-nav-item class="b" to="/trending">TrendingNews</b-nav-item>
          </b-navbar-nav>



          <b-nav-item-dropdown class="b" C  text="Categories">
              <b-dropdown-item
                v-for="c in categories"
                :key="c.name"
                @click="go(c.name)"
                >
                {{ c.name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>



            
          <b-nav-item-dropdown class="b" v-if="token" text="CMS" right>
            <b-dropdown-item to="/users">Users</b-dropdown-item>
            <b-dropdown-item to="/news">News</b-dropdown-item>
            <b-dropdown-item to="/categories">Categories</b-dropdown-item>
         </b-nav-item-dropdown>




          <b-navbar-nav class="b">
            <b-nav-item v-if="!token" @click="login()">LogIn</b-nav-item>
            <b-nav-item v-else @click="logout()">LogOut</b-nav-item>
          </b-navbar-nav>



          <b-navbar-nav>
              <b-nav-text v-if="email">{{name}}</b-nav-text>
          </b-navbar-nav>

            <b-input id="search" class="spacing2" v-model="srch" placeholder="Search" ></b-input>
            <b-button @click="onSubmit" class="b" type="submit">Search</b-button>


        </b-navbar>

        </div>

    </div>

    <router-view/>
  </div>
</template>

<script>
    import {  mapState, mapMutations } from 'vuex';


  export default {
    name: 'App', 
    data() {
        return {
            api: "http://localhost:8081/api/category/",
            categories: [],
            srch:"",
            
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

    mounted() {   
      this.axios.get(this.api)
            .then((response) => {
                this.categories = response.data;
                console.log(this.categories);
        });
      if (localStorage.token) {
        this.setToken(localStorage.token);
      }   
      if (localStorage.email) {
        this.setEmail(localStorage.email);
      }
      if (localStorage.name) {
        this.setName(localStorage.name);
      }
      if (localStorage.role) {
        this.setRole(localStorage.role);
      }
      if (localStorage.status) {
        this.setStatus(localStorage.status);
      }
    },

    methods: {
      ...mapMutations([
        'removeToken',
        'setToken',
        'removeEmail',
        'setEmail',
        'removeName',
        'setName',
        'removeRole',
        'setRole',
        'removeStatus',
        'setStatus',
      ]),

      logout() {
        this.removeToken();
        this.removeEmail();
        this.removeName();
        this.removeRole();
        this.removeStatus();

        this.$router.push({ name: 'home' }).catch(()=>{});;

        },
        login(){
          this.$router.push({ name: 'login' }).catch(()=>{});;

        },
        onSubmit(){
          localStorage.search=this.srch;
          this.$router.push({ name: 'searchresult'}).catch(()=>{});
          location.reload();


        },
        go(category) {
            this.$router.push({name: "categoryresult",params: { category: category },});
            location.reload();
        }
    }
     
  }



</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}
.b{
    	margin-left: 15px;
    	margin-right: 15px;
  }


.social {
  font-weight: bold;
  color: #ebeff3;
  
}

.spacing {
        margin-right: 5px;       
    }
nav a {
  font-weight: bold;
  color: #ebeff3;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
