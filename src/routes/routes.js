import SigninPage from "../pages/Signin.vue";
import SignupPage from "../pages/Signup.vue"
import Dashboard from "../pages/Dashboard.vue"
import Main from "../pages/dashboard/Main.vue"
import Users from "../pages/dashboard/Users.vue"
import User from "../pages/dashboard/User.vue"
import Products from "../pages/dashboard/Products.vue"
import Product from "../pages/dashboard/Product.vue"
import Cats from "../pages/dashboard/Cats.vue"
import Cat from "../pages/dashboard/Cat.vue"

const children = [
    {
      path: "/dashboard",
      name: "Main",
      component: Main
    },
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/user",
      name: "User",
      component: User
    },
    {
      path: "/products",
      name: "Products",
      component: Products
    },
    {
      path: "/product",
      name: "Product",
      component: Product
    },
    {
      path: "/cats",
      name: "Cats",
      component: Cats
    },
    {
      path: "/cat",
      name: "Cat",
      component: Cat
    }
]

const routes = [
  { path: "/", component: Dashboard, children: children, name:"Dashboard", redirect:'/dashboard'},
  { path: "/login", component: SigninPage , name: "Login"},
  { path: "/register", component: SignupPage, name: "Register"},
];

export default routes;
