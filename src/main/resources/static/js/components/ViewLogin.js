export default {
    name: 'ViewLogin',

    data() {
        return {
            errors: [],
            username: null,
            password: null
        };
    },
    methods: {
        submitForm: function (e) {
            this.errors = [];

            if (this.username && this.password) {
                const headers = {authorization: "Basic " + btoa(this.username + ":" + this.password)};

                this.$http.get('/api/user', {headers: headers}).then(response => {
                    if (response.bodyText) {
                        this.$store.commit({
                            type: 'logIn',
                            user: response.bodyText
                        });
                        this.$router.push({path: '/'});
                    } else {
                        this.errors.push('The credentials you supplied were not correct!');
                    }
                }, error => {
                    this.errors.push('The credentials you supplied were not correct!');
                });

                return true;
            }

            if (!this.username) {
                this.errors.push('Username is required!');
            }

            if (!this.password) {
                this.errors.push('Password is required!');
            }

            e.preventDefault();
        }
    },
    template: `
<section class="section">
    <div class="container">
        <div class="main-section">
            <div class="notification is-success" v-if="this.$route.query.from === 'register'">You can now log in :)</div>
            
            <h1 class="title">Log in</h1>
            <h2 class="subtitle">Log in and browse all your favourite social media feeds in one place!</h2>
          
            <form @submit.prevent="submitForm">

            <article class="message is-danger" v-if="errors.length">
                <div class="message-header">
                    <p>Please correct the following issues</p>
                </div>
                <div class="message-body">
                    <ul><li v-for="error in errors">{{ error }}</li></ul>
                </div>
            </article>

            <div class="field">
                <label class="label" for="username">Username</label>
                <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Username" id="username" v-model="username" name="username" required>
                <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
                </span>
                </p>
            </div>
            
            <div class="field">
                <label class="label" for="password">Password</label>
                <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" id="password" v-model="password" name="password" required>
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
                </p>
            </div>
            
            <br>
            <div class="field">
                <p class="control">
                <button type="submit" class="button is-success is-large">Log in</button>
                </p>
            </div>
            
            </form>
            
        </div>
    </div>
</section>
`
};