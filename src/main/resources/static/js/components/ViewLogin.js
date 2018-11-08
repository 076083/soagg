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
            if (this.username && this.password) {

                // TODO
                console.log('Form submit', this.username, this.password);

                return true;
            }

            this.errors = [];

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