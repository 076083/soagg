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
            posts: undefined,
            searchText: this.$route.query.s
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
            this.searchText = this.$route.query.s;
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
            this.$http.get('/api/post' + ((this.$route.query.s) ? ('?s=' + this.$route.query.s) : '')).then(response => {
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
        },
        searchClear: function () {
            if (this.searchText) {
                this.searchText = "";
                this.$router.push({path: '/wall'});
                this.reloadPage();
            }
        },
        search: function () {
            if (this.searchText) {
                this.$router.push({path: '/wall', query: {s: this.searchText}});
                this.reloadPage();
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
            
                    <div class="column">
                        <div>
                            <p class="heading">You are currently subscribed to {{ feeds.length }} feed(s).</p>
                            <p class="title">Your wall</p>
                        </div>
                    </div>
            
                    <div class="column">
                        <div class="field has-addons">
                          <div class="control">
                            <input v-model="searchText" @keyup.enter="search()" class="input is-medium" type="text" placeholder="Find something...">
                          </div>
                          <div class="control" v-if="$route.query.s">
                            <button class="button is-medium is-primary" v-on:click="searchClear()">
                              <i class="fas fa-times"></i>
                            </button>
                          </div>
                          <div class="control">
                            <button class="button is-medium is-info" v-on:click="search()">
                              <i class="fas fa-search"></i>
                            </button>
                          </div>
                        </div>
                    </div>
                    
                    <div class="column">
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
            
            <div class="feed-wall" v-else>
            
            <div class="card media-entry" v-for="post in posts">
            
                <div class="columns is-vcentered">
                  <div class="column">
                      <div class="card-content">
                        <div class="media">
                          <div class="media-left">
                            <figure class="image is-48x48">
                              <img class="is-rounded" v-bind:src="post.account.imageUrl">
                            </figure>
                          </div>
                          <div class="media-content">
                            <p class="title is-4">{{ post.account.displayName }}</p>
                            <p class="subtitle is-6"><a target="_blank" rel="noopener noreferrer" v-bind:href="post.account.profileUrl">@{{ post.account.username }}</a></p>
                          </div>
                          <div class="media-right">
                            <i v-bind:class="feedTypeOf(post.account.feedType).icon"></i> {{ feedTypeOf(post.account.feedType).title }}
                          </div>
                        </div>
                    
                        <div class="content">
                          {{ post.text }}
                          <br>
                          <a target="_blank" rel="noopener noreferrer" v-bind:href="post.postUrl"><i><time>{{ post.dateTime }}</time></i></a>
                        </div>
                      </div>
                  </div>
                  <div class="column" v-if="post.imageUrl">
                      <div class="card-image">
                        <a target="_blank" rel="noopener noreferrer" v-bind:href="post.postUrl"><figure class="image is-3by2 media-image" v-bind:style="{ backgroundImage: 'url(' + post.imageUrl + ')' }">
                        </figure></a>
                      </div>
                  </div>
                </div>
            
            </div>
            
            </div>
        </div>
    </div>
</section>
`
};