export default {
    name: 'ViewLogout',
    created: function () {
        this.$store.commit({
            type: 'logOut'
        });

        this.$http.get('/api/logout').then(response => {
            this.$router.push({path: '/'});
        }, error => {
            this.$router.push({path: '/'});
        });
    }
};