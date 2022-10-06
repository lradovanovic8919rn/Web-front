import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue';
import Home from '../views/Home.vue'
import CmsCategories from '@/views/CmsCategories.vue';
import CmsCategoryEdit from '@/views/CmsCategoryEdit.vue';
import CmsCategoryAdd from '@/views/CmsCategoryAdd.vue';
import CmsUsers from '@/views/CmsUsers.vue';
import CmsUserEdit from '@/views/CmsUserEdit.vue';
import CmsUserAdd from '@/views/CmsUserAdd.vue';
import CmsNews from '@/views/CmsNews.vue';
import CmsNewsAdd from '@/views/CmsNewsAdd.vue';
import CmsNewsEdit from '@/views/CmsNewsEdit.vue';
import CategoryResult from '@/views/CategoryResult.vue';
import NewsView from '@/views/NewsView.vue';
import TagResult from '@/views/TagResult.vue';
import SearchResult from '@/views/SearchResult.vue';
import TrendingNews from '@/views/TrendingNews.vue';



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },  {
    path: '/login',
    name: 'login',
    component: Login
  },  {
    path: '/categories',
    name: 'cmscategories',
    component: CmsCategories
  },  {
    path: '/categories/:category',
    name: 'cmscategoryedit',
    component: CmsCategoryEdit
  },  {
    path: '/categories/add',
    name: 'cmscategoryadd',
    component: CmsCategoryAdd
  },  {
    path: '/users',
    name: 'cmsusers',
    component: CmsUsers
  },  {
    path: '/users/:email',
    name: 'cmsuseredit',
    component: CmsUserEdit
  },  {
    path: '/users/add',
    name: 'cmsuseradd',
    component: CmsUserAdd
  },  {
    path: '/news',
    name: 'cmsnews',
    component: CmsNews
  },  {
    path: '/news/add',
    name: 'cmsnewsadd',
    component: CmsNewsAdd
  },  {
    path: '/news/edit/:id',
    name: 'cmsnewsedit',
    component: CmsNewsEdit
  },  {
    path: '/result/category/:category',
    name: 'categoryresult',
    component: CategoryResult
  },  {
    path: '/news/:news',
    name: 'newsview',
    component: NewsView
  },
  {
    path: '/tag/:tag',
    name: 'tagview',
    component: TagResult
  },
  {
    path: '/search/',
    name: 'searchresult',
    component: SearchResult
  },
  {
    path: '/trending/',
    name: 'trendingnews',
    component: TrendingNews
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
