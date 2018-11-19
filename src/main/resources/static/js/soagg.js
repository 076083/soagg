import TheApp from './components/TheApp.js'
import ViewBanner from './components/ViewBanner.js'
import ViewRegister from './components/ViewRegister.js'
import ViewLogin from './components/ViewLogin.js'
import ViewLogout from './components/ViewLogout.js'
import ViewWall from './components/ViewWall.js'
import ViewCategories from './components/ViewCategories.js'
import ViewManage from './components/ViewManage.js'
import ViewUser from './components/ViewUser.js'

const store = new Vuex.Store({
    state: {
        auth: undefined,
        user: null
    },
    mutations: {
        logIn(state, payload) {
            state.auth = true;
            state.user = payload.user;
        },
        logOut(state) {
            state.auth = false;
            state.user = null;
        }
    },
    getters: {
        isAuthenticated: state => {
            return state.auth === true;
        }
    }
});

async function authSetup() {
    return Vue.http.get('/api/user').then(response => {
        if (response.bodyText) {
            store.commit({
                type: 'logIn',
                user: response.bodyText
            });
        }
    }, error => {
        store.commit({
            type: 'logOut'
        });
    });
}

const router = new VueRouter({
    routes: [

        {path: '/', component: ViewBanner, meta: {requiresAuthEqualTo: false}},
        {path: '/register', component: ViewRegister, meta: {requiresAuthEqualTo: false}},
        {path: '/login', component: ViewLogin, meta: {requiresAuthEqualTo: false}},

        {path: '/logout', component: ViewLogout, meta: {requiresAuthEqualTo: true}},
        {path: '/wall', component: ViewWall, meta: {requiresAuthEqualTo: true}},
        {path: '/categories', component: ViewCategories, meta: {requiresAuthEqualTo: true}},
        {path: '/manage', component: ViewManage, meta: {requiresAuthEqualTo: true}},
        {path: '/user', component: ViewUser, meta: {requiresAuthEqualTo: true}}

    ]
});

router.beforeEach(async (to, from, next) => {
    if (store.state.auth === undefined) {
        await authSetup();
    }

    if (to.matched.some(record => record.meta.requiresAuthEqualTo !== undefined)) {
        if (to.meta.requiresAuthEqualTo !== store.getters.isAuthenticated) {
            if (to.meta.requiresAuthEqualTo) {
                next({path: '/login'});
            } else {
                next({path: '/wall'});
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

const app = new Vue({
    render: f => f(TheApp),
    store: store,
    router: router
}).$mount('#app');
