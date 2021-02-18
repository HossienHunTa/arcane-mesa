import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import SigninPage from "@/pages/Signin.vue";
import SignupPage from "@/pages/Signup.vue"

const children = [
    {
      path: "/dashboard",
      name: "داشبورد",
      component:Dashboard
    },
    {
        path: "user",
        name: "پروفایل",
        component: UserProfile
      },
      {
        path: "table",
        name: "محصولات",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
  ]

const routes = [
  { path: "/", component: DashboardLayout, children: children, name:"MainPage", redirect:'/dashboard'},
  { path: "/login", component: SigninPage ,name: "Login"},
  { path: "/register", component: SignupPage ,name: "Register"},
];

export default routes;
