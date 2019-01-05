export default {
    name: 'ViewCategoriesAdd',
    data() {
        return {
            errors: [],

            categoryName: ""
        };
    },
    methods: {
        submitForm: function (e) {
            this.errors = [];

            if (this.categoryName) {

                this.$http.post('/api/category', {
                    categoryName: this.categoryName
                }).then(response => {
                    this.$router.push({path: '/categories'});
                }, error => {
                    this.errors.push('There was a problem with processing your request!');
                });

                return true;
            }

            if (!this.categoryName) {
                this.errors.push('Category name is required!');
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
                    <div class="level-item"><h1 class="title">Add new category</h1></div>
                </div>
                <div class="level-right">
                    <div class="level-item"><router-link to="/categories" class="button is-dark is-medium"><strong><i class="fas fa-arrow-left"></i> Go back to list</strong></router-link></div>
                </div>
            </div>
            
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
                <label class="label" for="categoryName">Category name</label>
                <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Category name" id="categoryName" v-model="categoryName" name="categoryName" required>
                <span class="icon is-small is-left">
                <i class="fas fa-align-left"></i>
                </span>
                </p>
            </div>
            
            <br>
            <div class="field">
                <p class="control">
                <button type="submit" class="button is-success is-large">Add category</button>
                </p>
            </div>
            
            </form>
          
        </div>
    </div>
</section>
`
};