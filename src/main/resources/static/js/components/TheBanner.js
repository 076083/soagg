export default {
    name: 'TheBanner',
    template: `
<div>
    <br/>
    <br/>
    <br/>
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
                    <router-link to="/register" class="button is-link is-large"><strong>Create account</strong>
                    </router-link>
                    <router-link to="/login" class="button is-light is-large"><strong>Log in</strong></router-link>
                </div>
            </div>
    </section>
</div>
`
};