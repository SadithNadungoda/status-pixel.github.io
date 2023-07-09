import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthLayout from '@/views/layout/auth';
import DashboardLayout from "@/views/layout/dashboard";

import IndexStatusPage from '@/views/pages/status/index';
import HistoryStatusPage from '@/views/pages/status/historical/history';
import UptimeStatusPage from '@/views/pages/status/historical/uptime';
import IncidentDetailsStatusPage from '@/views/pages/status/incidents/details';

import AuthLoginPage from '@/views/pages/auth/login';
import AuthRegisterPage from '@/views/pages/auth/register';
import AuthRecoverPage from '@/views/pages/auth/recover';
import AuthResetPage from '@/views/pages/auth/reset';

import DashboardHomePage from "@/views/pages/dashboard/home";

import DashboardIncidentsList from "@/views/pages/dashboard/incidents/list";
import DashboardIncidentsNew from "@/views/pages/dashboard/incidents/new";
import DashboardIncidentsEdit from "@/views/pages/dashboard/incidents/edit";

import AdminDashboardComponentsList from "@/views/pages/dashboard/admin/components/list";
import AdminDashboardComponentsNew from "@/views/pages/dashboard/admin/components/new";
import AdminDashboardComponentsEdit from "@/views/pages/dashboard/admin/components/edit";

import AdminDashboardUsersList from "@/views/pages/dashboard/admin/users/list";
import AdminDashboardUsersNew from "@/views/pages/dashboard/admin/users/new";
import AdminDashboardUsersEdit from "@/views/pages/dashboard/admin/users/edit";

import AdminDashboardUserRolesList from "@/views/pages/dashboard/admin/user-roles/list";
import AdminDashboardUserRolesNew from "@/views/pages/dashboard/admin/user-roles/new";
import AdminDashboardUserRolesEdit from "@/views/pages/dashboard/admin/user-roles/edit";

import AdminDashboardSettingsIndex from "@/views/pages/dashboard/admin/settings";
import AdminDashboardSettingsGeneral from "@/views/pages/dashboard/admin/settings/general";
import AdminDashboardSettingsSEO from "@/views/pages/dashboard/admin/settings/seo";
import AdminDashboardSettingsAppearance from "@/views/pages/dashboard/admin/settings/appearance";
import AdminDashboardSettingsLocalization from "@/views/pages/dashboard/admin/settings/localization";
import AdminDashboardSettingsAuthentication from "@/views/pages/dashboard/admin/settings/authentication";
import AdminDashboardSettingsOutgoingMail from "@/views/pages/dashboard/admin/settings/outgoing-mail";
import AdminDashboardSettingsLogging from "@/views/pages/dashboard/admin/settings/logging";

import AdminDashboardLanguagesList from "@/views/pages/dashboard/admin/language/list";
import AdminDashboardLanguagesNew from "@/views/pages/dashboard/admin/language/new";
import AdminDashboardLanguagesEdit from "@/views/pages/dashboard/admin/language/edit";

import AccountPage from "@/views/pages/account/account";

import DashboardNotFoundPage from "@/views/pages/dashboard/error/not-found";
import PageNotFoundPage from "@/views/pages/error/not-found";

Vue.use(VueRouter);

let routes = [
    {path: '/', component: IndexStatusPage},
    {path: '/history', component: HistoryStatusPage},
    {path: '/uptime', component: UptimeStatusPage},
    {path: '/incidents/:uuid', component: IncidentDetailsStatusPage},
    {
        path: '/auth', component: AuthLayout, redirect: '/auth/login',
        children: [
            {path: 'login', component: AuthLoginPage, meta: {middleware: 'guest'}},
            {path: 'register', component: AuthRegisterPage, meta: {middleware: ['guest', 'register']}},
            {path: 'recover', component: AuthRecoverPage, meta: {middleware: 'guest'}},
            {path: 'reset/:token', component: AuthResetPage, meta: {middleware: 'guest'}},
        ]
    },
    {
        path: '/dashboard', component: DashboardLayout, redirect: '/dashboard/home',
        children: [
            {path: 'home', component: DashboardHomePage, meta: {middleware: 'auth'}},

            {path: 'incidents', component: DashboardIncidentsList, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.IncidentController'}},
            {path: 'incidents/new/:type', component: DashboardIncidentsNew, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.IncidentController'}},
            {path: 'incidents/:id/edit', component: DashboardIncidentsEdit, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.IncidentController'}},

            {path: 'admin/components', component: AdminDashboardComponentsList, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.ComponentController'}},
            {path: 'admin/components/new', component: AdminDashboardComponentsNew, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.ComponentController'}},
            {path: 'admin/components/:id/edit', component: AdminDashboardComponentsEdit, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.ComponentController'}},

            {path: 'admin/users', component: AdminDashboardUsersList, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.UserController'}},
            {path: 'admin/users/new', component: AdminDashboardUsersNew, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.UserController'}},
            {path: 'admin/users/:id/edit', component: AdminDashboardUsersEdit, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.UserController'}},

            {path: 'admin/user-roles', component: AdminDashboardUserRolesList, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.UserRoleController'}},
            {path: 'admin/user-roles/new', component: AdminDashboardUserRolesNew, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.UserRoleController'}},
            {path: 'admin/user-roles/:id/edit', component: AdminDashboardUserRolesEdit, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.UserRoleController'}},

            {path: 'admin/settings', component: AdminDashboardSettingsIndex, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.SettingController'}},
            {path: 'admin/settings/general', component: AdminDashboardSettingsGeneral, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.SettingController'}},
            {path: 'admin/settings/seo', component: AdminDashboardSettingsSEO, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.SettingController'}},
            {path: 'admin/settings/appearance', component: AdminDashboardSettingsAppearance, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.SettingController'}},
            {path: 'admin/settings/localization', component: AdminDashboardSettingsLocalization, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.SettingController'}},
            {path: 'admin/settings/authentication', component: AdminDashboardSettingsAuthentication, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.SettingController'}},
            {path: 'admin/settings/outgoing-mail', component: AdminDashboardSettingsOutgoingMail, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.SettingController'}},
            {path: 'admin/settings/logging', component: AdminDashboardSettingsLogging, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.SettingController'}},

            {path: 'admin/languages', component: AdminDashboardLanguagesList, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.LanguageController'}},
            {path: 'admin/languages/new', component: AdminDashboardLanguagesNew, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.LanguageController'}},
            {path: 'admin/languages/:id/edit', component: AdminDashboardLanguagesEdit, meta: {middleware: 'auth', controller: 'App.Http.Controllers.Api.Dashboard.Admin.LanguageController'}},

            {path: '*', component: DashboardNotFoundPage, meta: {middleware: 'auth'}},
        ]
    },
    {
        path: '/account', component: AccountPage, meta: {middleware: 'auth'},
    },
    {path: '*', component: PageNotFoundPage},
];

let router = new VueRouter({
    routes,
    mode: "history"
});

// Router auth middleware
router.beforeResolve((to, from, next) => {
    if (to.meta.middleware || to.meta.controller) {
        if (!localStorage.getItem('token') && to.meta.middleware.includes('auth')) {
            next('/auth/login');
        } else if (localStorage.getItem('token') && to.meta.middleware.includes('guest')) {
            next('/dashboard/home');
        } else if (!window.app.register && to.meta.middleware.includes('register')) {
            next('/auth/login');
        } else if (localStorage.getItem('token') && to.meta.middleware.includes('auth')) {
            axios.post('api/auth/check', {controller: to.meta.controller}).then(function (response) {
                response.data.access ? next() : to.meta.controller ? next('/dashboard/home') : next('/auth/login');
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
