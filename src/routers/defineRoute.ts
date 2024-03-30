//page
import Home from '../pages/Home/Home.tsx'
import Payroll from '../pages/Payroll/Payroll.tsx'
import Profile from '../pages/Profile/Profile.tsx'
import Login from '../pages/Auth/Login.tsx'
import Register from '../pages/Auth/Register.tsx'

//layout
import MainLayout from '../layouts/MainLayout/MainLayout.tsx'
import ContentLayout from '../layouts/ContentLayout/ContentLayout.tsx'

//interface
import {IRoute} from '../interfaces/common-interface.ts'


export const publicRouters:IRoute[] = [
    {path:"/login", element:Login, layout:ContentLayout},
    {path:"/register", element:Register, layout:ContentLayout},
]

export const privateRouters:IRoute[] = [
    {path:"/", element:Home, layout: MainLayout},
    {path:"/payroll", element:Payroll, layout: MainLayout},
    {path:"/profile", element:Profile, layout: MainLayout},
]