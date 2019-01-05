import PartLoading from './PartLoading.js'

export default {
    name: 'ViewManage',
    components: {
        PartLoading
    },
    data() {
        return {
            feedTypes: undefined,
            feedCategories: undefined,
            feeds: undefined
        };
    },
    computed: {
        isLoading: function () {
            return this.feedTypes === undefined || this.feeds === undefined || this.feedCategories === undefined;
        }
    },
    beforeMount: function () {
        this.reloadPage();
    },
    methods: {
        reloadPage: function () {
            this.feedTypes = undefined;
            this.feedCategories = undefined;
            this.feeds = undefined;

            this.$http.get('/api/feed/types').then(response => {
                this.feedTypes = response.data;
            }, error => {
            });
            this.$http.get('/api/feed').then(response => {
                this.feeds = response.data;
            }, error => {
            });
            this.$http.get('/api/category').then(response => {
                this.feedCategories = response.data;
            }, error => {
            });
        },
        feedTypeOf: function (feedType) {
            const list = this.feedTypes.filter(item => item.id === feedType);
            if (list && list.length) {
                return list[0];
            } else {
                return {};
            }
        },
        doDelete: function (id) {
            this.$http.delete('/api/feed/' + id).then(response => {
                this.reloadPage();
            }, error => {
            });
        },
        saveCategory: function (feedId, categoryId) {
            if (categoryId) {
                categoryId = categoryId.id;
            } else {
                categoryId = '-1';
            }
            this.$http.put('/api/category/' + feedId + '/' + categoryId).then(response => {
                this.reloadPage();
            }, error => {
            });
        }
    },
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
            <div v-else-if="!feeds.length">
                <p class="subtitle has-text-centered">You are not subscribed to any feeds. Use button above to add a feed.</p>
            </div>
            
            <div v-else>
            
                <table class="table is-bordered is-striped is-hoverable is-full-width">
                    <thead>
                        <tr>
                            <th>Feed type</th>
                            <th>Feed username</th>
                            <th>Feed link</th>
                            <th>Category</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                  <tbody>
                  
                    <tr v-for="feed in feeds">
                        <td><i v-bind:class="feedTypeOf(feed.feedType).icon"></i> {{ feedTypeOf(feed.feedType).title }}</td>
                        <td>{{ feed.feedHandle }}</td>
                        <td><a target="_blank" rel="noopener noreferrer" v-bind:href="feedTypeOf(feed.feedType).url + feed.feedHandle">{{ feedTypeOf(feed.feedType).url + feed.feedHandle }}</a></td>
                        
                        <td>

                            <div class="field">
                                <div class="control has-icons-left">
                                    <div class="select is-full-width">
                                        <select @change="saveCategory(feed.id, feed.relatedFeedCategory)" class="is-full-width" v-model="feed.relatedFeedCategory" id="relatedFeedCategory" name="relatedFeedCategory">
                                            <option :value="null" selected>No category</option>
                                            <option v-for="option in feedCategories" v-bind:value="option">
                                                {{ option.categoryName }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="icon is-small is-left">
                                      <i class="fas fa-boxes"></i>
                                    </div>
                                </div>
                            </div>
                        
                        </td>
                        
                        <td><a v-on:click="doDelete(feed.id)" class="delete is-medium"></a></td>
                    </tr>
                    
                  </tbody>
                </table>
                                
            </div>
          
        </div>
    </div>
</section>
`
};