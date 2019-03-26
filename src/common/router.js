import Loadable from 'react-loadable'
import Loading from './../components/Loading'

const BasicLayout = Loadable({
  loader: () => import(/* webpackChunkName: "BasicLayout" */ '@/layouts/BasicLayout'),
  loading: Loading
})
const IndexLayout = Loadable({
  loader: () => import(/* webpackChunkName: "IndexLayout" */ '@/layouts/IndexLayout'),
  loading: Loading
})
const Login = Loadable({ loader: () => import(/* webpackChunkName: "Login" */ '@/routes/Login/'), loading: Loading })
const PictureDetails = Loadable({
  loader: () => import(/* webpackChunkName: "PictureDetails" */ '@/routes/Index/PictureDetails'),
  loading: Loading
})
const PictureModel = Loadable({
  loader: () => import(/* webpackChunkName: "PictureModel" */ '@/routes/Index/PictureModel'),
  loading: Loading
})
const PageNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "PageNotFound" */ '@/components/PageNotFound/'),
  loading: Loading
})

const routes = [
  {
    component: BasicLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Login
      },
      {
        path: '/index',
        component: IndexLayout,
        routes: [
          {
            name: '模特图',
            path: '/index/PictureModel/',
            component: PictureModel
          },
          {
            name: '细节图',
            path: '/index/PictureDetails/',
            component: PictureDetails
          }
        ]
      },
      {
        path: '*',
        component: PageNotFound
      }
    ]
  }
]

export default routes
