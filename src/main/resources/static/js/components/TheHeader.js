export default {
    name: 'TheHeader',
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



        <div class="navbar-end" v-if="$store.state.auth">
            <div class="navbar-item">
                <strong class="has-text-white">Hello, {{$store.state.user}}!</strong>
            </div>
            <div class="navbar-item">
                <div class="buttons">
                <router-link to="/logout" class="button is-light is-outlined"><strong>Log out</strong></router-link>
                </div>
            </div>
        </div>
        <div class="navbar-end" v-else>
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
};