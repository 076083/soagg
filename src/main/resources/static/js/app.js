Vue.component('the-header', {
    template: `
<nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/">
            <h4 class="title is-4 has-text-white"><i class="fab fa-slack-hash"></i> soagg</h4>
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
           data-target="navbarMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item">
                Home
            </a>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-link">
                        <strong>Create account</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </div>
        </div>
    </div>
</nav>
`
});

Vue.component('the-banner', {
    template: `
<div>
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
                    <a class="button is-link is-large">
                        <strong>Create account</strong>
                    </a>
                    <a class="button is-light is-large">
                        Log in
                    </a>
                </div>
            </div>
        </div>
    </section>
</div>
`
});

Vue.component('the-footer', {
    template: `
<footer class="footer has-background-white">
    <div class="content has-text-centered">
        <p>&copy; Social Media Aggregator</p>
    </div>
</footer>
`
});

const app = new Vue({
    el: '#app'
});
