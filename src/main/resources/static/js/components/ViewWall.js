import PartLoading from './PartLoading.js'

export default {
    name: 'ViewWall',
    components: {
        PartLoading
    },
    data() {
        return {
            feedTypes: undefined,
            feedCategories: undefined, // TODO: Category
            feeds: undefined,
            posts: undefined
        };
    },
    computed: {
        isLoading: function () {
            return this.feedTypes === undefined || this.feeds === undefined || this.posts === undefined; // || this.feedCategories === undefined // TODO: Category
        }
    },
    beforeMount: function () {
        this.reloadPage();
    },
    methods: {
        reloadPage: function () {
            this.feedTypes = undefined;
            this.feedCategories = undefined; // TODO: Category
            this.feeds = undefined;
            this.posts = undefined;

            this.$http.get('/api/feed/types').then(response => {
                this.feedTypes = response.data;
            }, error => {
            });
            this.$http.get('/api/feed').then(response => {
                this.feeds = response.data;
            }, error => {
            });
            this.$http.get('/api/post').then(response => {
                this.posts = response.data;
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
        }
    },
    template: `
<section class="section">
    <div class="container">
        <div class="main-section" v-if="isLoading">
            <PartLoading/>
        </div>
        <div class="main-section" v-else>
        
            <div class="columns">
            
                    <div class="column is-7">
                        <div>
                            <p class="heading">You are currently subscribed to {{ feeds.length }} feed(s).</p>
                            <p class="title">Your wall</p>
                        </div>
                    </div>
            
                    <div class="column is-5">
                        <div class="buttons is-pulled-right">
                            <button v-on:click="reloadPage()" class="button is-dark is-medium is-outlined"><strong><i class="fas fa-sync-alt"></i></strong></button>
                            <router-link to="/manage/add" class="button is-link is-medium"><strong><i class="fas fa-plus"></i> Add new feed</strong></router-link>
                        </div>
                    </div>
                    
            </div>
        
        
        
            <div v-if="!feeds.length">
                <p class="subtitle has-text-centered">You are not subscribed to any feeds. Use button above to add a feed.</p>
            </div>
            <div v-else-if="!posts.length">
                <p class="subtitle has-text-centered">There are no posts to show.</p>
            </div>
            
            <div v-else>
                        
                <div class="card media-entry" v-for="post in posts">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-48x48">
                          <img class="is-rounded" v-bind:src="post.account.imageUrl">
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="title is-4">{{ post.account.displayName }}</p>
                        <p class="subtitle is-6">@{{ post.account.username }}</p> <!--TODO: Add URL to profile AND feedType info image etc.!-->
                      </div>
                    </div>
                
                    <div class="content">
                      {{ post.text }}
                      <br>
                      <strong><time>{{ post.dateTime }}</time></strong> <!--TODO: Format datetime AND add URL-->
                    </div>
                  </div>
                  <div class="card-image" v-if="post.imageUrl">
                    <figure class="image is-3by1 media-image" v-bind:style="{ backgroundImage: 'url(' + post.imageUrl + ')' }">
                    </figure>
                  </div>
                </div>
            
            </div>
        </div>
    </div>
</section>
`
};