export default {
    name: 'ViewRegister',

    data() {
        return {
            errors: [],
            username: null,
            password: null,
            password2: null
        };
    },
    methods: {
        submitForm: function (e) {
            if (this.username && this.password && this.password2 && this.password === this.password2) {

                // TODO
                console.log('Form submit', this.username, this.password, this.password2);

                return true;
            }

            this.errors = [];

            if (!this.username) {
                this.errors.push('Username is required!');
            }

            if (!this.password) {
                this.errors.push('Password is required!');
            }

            if (this.password !== this.password2) {
                this.errors.push('Passwords do not match!');
            }

            e.preventDefault();
        }
    },
    template: `
<section class="section">
    <div class="container">
        <div class="main-section">
            <h1 class="title">Register</h1>
            <h2 class="subtitle">Create account and browse all your favourite social media feeds in one place!</h2>
          
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
                <p class="help">You will user this username to log in.</p>
            </div>
            
            <div class="field">
                <label class="label" for="password">Password</label>
                <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" id="password" v-model="password" name="password" required>
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
                </p>
                <p class="help">Provide strong and unique password.</p>
            </div>
            
            <div class="field">
                <label class="label" for="password2">Repeat password</label>
                <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Repeat password" id="password2" v-model="password2" name="password2" required>
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
                </p>
                <p class="help">Enter your password again.</p>
            </div>
            
            <br>
            <div class="field">
                <p class="control">
                <button type="submit" class="button is-success is-large">Register</button>
                </p>
            </div>
            
            </form>
            
        </div>
    </div>
</section>
`
};