import PartLoading from './PartLoading.js'

export default {
    name: 'ViewManage',
    components: {
        PartLoading
    },
    data() {
        return {};
    },
    methods: {},
    template: `
<section class="section">
    <div class="container">
        <div class="main-section">
            <h1 class="title">ViewManage</h1>
            <h2 class="subtitle">Description...</h2>
          
            <PartLoading/>
          
        </div>
    </div>
</section>
`
};