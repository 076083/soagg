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
    
    
    
        <div class="navbar-start" v-if="$store.getters.isAuthenticated">
            <router-link to="/wall" class="navbar-item"><strong><i class="fas fa-bars"></i> Wall</strong></router-link>
            <router-link to="/categories" class="navbar-item"><strong><i class="fas fa-boxes"></i> Categories</strong></router-link>
            <router-link to="/manage" class="navbar-item"><strong><i class="fas fa-cog"></i> Manage feeds</strong></router-link>
        </div>
        <div class="navbar-start" v-else>
            <router-link to="/" class="navbar-item"><strong><i class="fas fa-bars"></i> Home</strong></router-link>
        </div>



        <div class="navbar-end" v-if="$store.getters.isAuthenticated">
            <p class="navbar-item"><strong class="header-color"><i class="fas fa-user"></i> Hello, {{$store.state.user}}!</strong></p>
            <router-link to="/logout" class="navbar-item"><strong><i class="fas fa-sign-out-alt"></i> Log out</strong></router-link>
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