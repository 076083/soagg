import TheApp from './components/TheApp.js'
import TheBanner from './components/TheBanner.js'

const ViewRegister = {
    template: `
<section>
    REGISTER
</section>
`
};

const ViewLogin = {
    template: `
<section>
    LOGIN
</section>
`
};

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
