import PartLoading from './PartLoading.js'

export default {
    name: 'ViewManage',
    components: {
        PartLoading
    },
    data() {
        return {
            feedTypes: undefined,
            feedCategories: undefined, // TODO: Category
            feeds: undefined
        };
    },
    computed: {
        isLoading: function () {
            return this.feedTypes === undefined || this.feeds === undefined; // || this.feedCategories === undefined // TODO: Category
        }
    },
    beforeMount: function () {
        this.$http.get('/api/feed/types').then(response => {
            this.feedTypes = response.data;
        }, error => {
        });
        this.$http.get('/api/feed').then(response => {
            this.feeds = response.data;
        }, error => {
        });
    },
    methods: {},
    template: `
<section class="section">
    <div class="container">
        <div class="main-section">
        
            <div class="level">
                <div class="level-left">
                    <div class="level-item"><h1 class="title">Your subscribed feeds</h1></div>
                </div>
                <div class="level-right">
                    <div class="level-item"><router-link to="/manage/add" class="button is-link is-medium"><strong><i class="fas fa-plus"></i> Add new feed</strong></router-link></div>
                </div>
            </div>
            
            <PartLoading v-if="isLoading"/>
            
            <div v-else>
            
                <table class="table is-bordered is-striped is-hoverable is-full-width">
                    <thead>
                        <tr>
                            <th>Feed type</th>
                            <th>Feed username</th>
                            <th>Feed link</th>
                            <!--TODO: Category-->
                            <th>Delete</th>
                        </tr>
                    </thead>
                  <tbody>
                    <tr>
                      <td><i class="fab fa-twitter"></i> Twitter</td>
                      <td>elonmusk</td>
                      <td><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/elonmusk">https://twitter.com/elonmusk</a></td>
                      <td><a class="delete is-medium"></a></td>
                    </tr>
                    <tr>
                      <td><i class="fab fa-instagram"></i> Instagram</td>
                      <td>elonmusk</td>
                      <td><a target="_blank" rel="noopener noreferrer" href="https://instagram.com/elonmusk">https://instagram.com/elonmusk</a></td>
                      <td><a class="delete is-medium"></a></td>
                    </tr>
                  </tbody>
                </table>
                                
            </div>
          
        </div>
    </div>
</section>
`
};