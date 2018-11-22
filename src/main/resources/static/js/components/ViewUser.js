import PartLoading from './PartLoading.js'

export default {
    name: 'ViewUser',
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
            <h1 class="title">Your account</h1>
            <h2 class="subtitle">Work in progress...</h2>
          
            <PartLoading/>
          
        </div>
    </div>
</section>
`
};