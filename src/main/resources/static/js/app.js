Vue.component('the-header', {
    template: `
<nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
            <h4 class="title is-4 has-text-white"><i class="fas fa-poll-h"></i> soagg</h4>
        </router-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
           data-target="navbarMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-start">
            <router-link to="/" class="navbar-item"><strong>Home</strong></router-link>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                <router-link to="/register" class="button is-link"><strong>Create account</strong></router-link>
                <router-link to="/login" class="button is-light"><strong>Log in</strong></router-link>
                </div>
            </div>
        </div>
    </div>
</nav>
`
});

Vue.component('the-footer', {
    template: `
<footer class="footer has-background-no">
    <div class="content has-text-centered has-text-white-bis">
        <p>&copy; Social Media Aggregator</p>
    </div>
</footer>
`
});


const ViewBanner = {
    template: `
<div>
    </br>
    </br>
    </br>
    <section class="hero is-medium is-info is-bold">
        <div class="hero-body">
            <div class="container">
                <p class="title">
                    Welcome to the Social Media Aggregator!
                </p>
                <p class="subtitle">
                    Browse all your favourite social media feeds in one place!
                </p>
                <div class="buttons">
                <router-link to="/register" class="button is-link is-large"><strong>Create account</strong></router-link>
                <router-link to="/login" class="button is-light is-large"><strong>Log in</strong></router-link>
            </div>
        </div>
    </section>
</div>
`
};

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
    {path: '/', component: ViewBanner},
    {path: '/register', component: ViewRegister},
    {path: '/login', component: ViewLogin}
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    router
}).$mount('#app');

/*
const app = new Vue({
    el: '#app'
});
*/