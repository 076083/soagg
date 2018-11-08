import TheApp from './components/TheApp.js'
import TheBanner from './components/TheBanner.js'
import ViewRegister from './components/ViewRegister.js'
import ViewLogin from './components/ViewLogin.js'

const routes = [
    {path: '/', component: TheBanner},
    {path: '/register', component: ViewRegister},
    {path: '/login', component: ViewLogin}
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    render: f => f(TheApp),
    router: router
}).$mount('#app');
