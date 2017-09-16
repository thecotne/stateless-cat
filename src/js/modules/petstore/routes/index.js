import { moduleName } from '../config'
import IndexPage from '../views/IndexPage'
import InnerPage from '../views/InnerPage'

export default [
  {
    exact: true,
    path: `/`,
    component: IndexPage
  },
  {
    exact: true,
    path: `/${moduleName}`,
    component: InnerPage
  },
  {
    exact: true,
    path: `/${moduleName}/:id`,
    component: InnerPage
  }
]
