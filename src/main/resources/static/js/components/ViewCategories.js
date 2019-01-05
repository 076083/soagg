import PartLoading from './PartLoading.js'

export default {
    name: 'ViewCategories',
    components: {
        PartLoading
    },
    data() {
        return {
            feedCategories: undefined
        };
    },
    computed: {
        isLoading: function () {
            return this.feedCategories === undefined
        }
    },
    beforeMount: function () {
        this.reloadPage();
    },
    methods: {
        reloadPage: function () {
            this.feedCategories = undefined;

            this.$http.get('/api/category').then(response => {
                this.feedCategories = response.data;
            }, error => {
            });
        },
        doDelete: function (id) {
            this.$http.delete('/api/category/' + id).then(response => {
                this.reloadPage();
            }, error => {
            });
        },
        doView: function (id) {
            this.$router.push({path: '/wall', query: {c: id}});
        }
    },
    template: `
<section class="section">
    <div class="container">
        
        <div class="main-section">
        
            <div class="level">
                <div class="level-left">
                    <div class="level-item"><h1 class="title">Your categories</h1></div>
                </div>
                <div class="level-right">
                    <div class="level-item"><router-link to="/categories/add" class="button is-link is-medium"><strong><i class="fas fa-plus"></i> Add new category</strong></router-link></div>
                </div>
            </div>
            
            <PartLoading v-if="isLoading"/>
            <div v-else-if="!feedCategories.length">
                <p class="subtitle has-text-centered">You do not have any categories. Use button above to add a category.</p>
            </div>
            
            <div v-else>
            
                <table class="table is-bordered is-striped is-hoverable is-full-width">
                    <thead>
                        <tr>
                            <th>Feed category</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                  <tbody>
                  
                    <tr v-for="category in feedCategories">
                        <td><i class="fas fa-boxes"></i>  {{ category.categoryName }}</td>
                        <td><a v-on:click="doView(category.id)" class="button is-success is-medium">View</a></td>
                        <td><a v-on:click="doDelete(category.id)" class="delete is-medium"></a></td>
                    </tr>
                    
                  </tbody>
                </table>
                                
            </div>
          
        </div>
        
    </div>
</section>
`
};