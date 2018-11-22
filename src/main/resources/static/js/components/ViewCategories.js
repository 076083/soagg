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
            <h1 class="title">Your categories</h1>
            <h2 class="subtitle">Work in progress...</h2>
          
            <PartLoading/>
          
        </div>
    </div>
</section>
`
};