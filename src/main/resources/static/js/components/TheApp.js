import TheHeader from './TheHeader.js'
import TheFooter from './TheFooter.js'

export default {
    name: 'TheApp',
    components: {
        TheHeader,
        TheFooter
    },
    template: `
<div>
    <TheHeader></TheHeader>
    <router-view></router-view>
    <TheFooter></TheFooter>
</div>
`
};