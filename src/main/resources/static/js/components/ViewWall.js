import PartLoading from './PartLoading.js'

export default {
    name: 'ViewWall',
    components: {
        PartLoading
    },
    data() {
        return {
            feeds: undefined,
            posts: undefined
        };
    },
    beforeMount: function () {
        this.feeds = [1, 2, 3];
        this.posts = [1, 2, 3];
    },
    methods: {},
    template: `
<section class="section">
    <div class="container">
        <div class="main-section" v-if="feeds === undefined || posts === undefined">
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
                            <button class="button is-dark is-medium is-outlined"><strong><i class="fas fa-sync-alt"></i></strong></button>
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
            
            
<div class="media-frame">
<article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
        <br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-reply"></i></span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-retweet"></i></span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-heart"></i></span>
        </a>
      </div>
    </nav>
  </div>
  <div class="media-right">
    <button class="delete"></button>
  </div>
</article>
</div>

            
            
<div class="media-frame">
<article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
        <br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-reply"></i></span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-retweet"></i></span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-heart"></i></span>
        </a>
      </div>
    </nav>
  </div>
  <div class="media-right">
    <button class="delete"></button>
  </div>
</article>
</div>


            
            
<div class="media-frame">
<article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
        <br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-reply"></i></span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-retweet"></i></span>
        </a>
        <a class="level-item">
          <span class="icon is-small"><i class="fas fa-heart"></i></span>
        </a>
      </div>
    </nav>
  </div>
  <div class="media-right">
    <button class="delete"></button>
  </div>
</article>
</div>

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            <div class="card">
  <div class="card-image">
    <figure class="image is-3by1">
      <img src="https://bulma.io/images/placeholders/720x240.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            </div>
        
        


            
            
            

          
          
        </div>
    </div>
</section>
`
};