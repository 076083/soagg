import PartLoading from './PartLoading.js'

export default {
    name: 'ViewCategories',
    components: {
        PartLoading
    },
    data() {
        return {
            categories: []
        };
    },
    methods: {},
    template: `
<section class="section">
    <div class="container">
        <div class="main-section">
            <h1 class="title">Categories</h1>
            <h2 class="subtitle">Your categories...</h2>
          
            <PartLoading/>
          
        </div>
    </div>
</section>
`
};