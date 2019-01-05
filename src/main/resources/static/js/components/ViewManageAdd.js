import PartLoading from './PartLoading.js'

export default {
    name: 'ViewManageAdd',
    components: {
        PartLoading
    },
    data() {
        return {
            errors: [],

            feedTypes: undefined,

            feedType: null,
            feedHandle: "",
            relatedFeedCategory: null
        };
    },
    computed: {
        isLoading: function () {
            return this.feedTypes === undefined;
        }
    },
    beforeMount: function () {
        this.$http.get('/api/feed/types').then(response => {
            this.feedTypes = response.data;
        }, error => {
        });
    },
    methods: {
        submitForm: function (e) {
            this.errors = [];

            if (this.feedType && this.feedHandle) {

                this.$http.post('/api/feed', {
                    feedType: this.feedType,
                    feedHandle: this.feedHandle,
                    relatedFeedCategory: this.relatedFeedCategory
                }).then(response => {
                    this.$router.push({path: '/manage'});
                }, error => {
                    if (error.status === 400) {
                        this.errors.push("You've already added this feed!");
                    } else {
                        this.errors.push('There was a problem with processing your request!');
                    }
                });

                return true;
            }

            if (!this.feedType) {
                this.errors.push('Feed type is required!');
            }

            if (!this.feedHandle) {
                this.errors.push('Username is required!');
            }

            e.preventDefault();
        }
    },
    template: `
<section class="section">
    <div class="container">
        <div class="main-section">
        
            <div class="level">
                <div class="level-left">
                    <div class="level-item"><h1 class="title">Add new feed</h1></div>
                </div>
                <div class="level-right">
                    <div class="level-item"><router-link to="/manage" class="button is-dark is-medium"><strong><i class="fas fa-arrow-left"></i> Go back to list</strong></router-link></div>
                </div>
            </div>
            
            <PartLoading v-if="isLoading"/>
            
            <form @submit.prevent="submitForm" v-else>

            <article class="message is-danger" v-if="errors.length">
                <div class="message-header">
                    <p>Please correct the following issues</p>
                </div>
                <div class="message-body">
                    <ul><li v-for="error in errors">{{ error }}</li></ul>
                </div>
            </article>

            <div class="field">
                <label class="label" for="feedType">Feed type</label>
                <div class="control has-icons-left">
                    <div class="select is-full-width">
                        <select class="is-full-width" v-model="feedType" id="feedType" name="feedType" required>
                            <option :value="null" disabled selected>Select feed type...</option>
                            <option v-for="option in feedTypes" v-bind:value="option.id">
                                {{ option.title }}
                            </option>
                        </select>
                    </div>
                    <div class="icon is-small is-left">
                      <i class="fas fa-globe"></i>
                    </div>
                </div>
            </div>

            <div class="field">
                <label class="label" for="feedHandle">Username</label>
                <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Username" id="feedHandle" v-model="feedHandle" name="feedHandle" required>
                <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
                </span>
                </p>
            </div>
            
            <br>
            <div class="field">
                <p class="control">
                <button type="submit" class="button is-success is-large">Add feed</button>
                </p>
            </div>
            
            </form>
          
        </div>
    </div>
</section>
`
};