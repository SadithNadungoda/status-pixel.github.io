<template>
    <div>
        <div class="my-3 mx-4 uppercase text-gray-300 text-xs">
            {{ $t('General') }}
        </div>
        <menu-item
            :label="$t('Dashboard')"
            :mobile="mobile"
            icon="tachometer-alt-regular"
            to="/dashboard/home"
        ></menu-item>
        <menu-item
            v-if="$store.state.permissions && $store.state.permissions['App.Http.Controllers.Api.Dashboard.IncidentController']"
            :label="$t('Incidents')"
            :mobile="mobile"
            icon="exclamation-square-regular"
            to="/dashboard/incidents"
        ></menu-item>
        <div
            v-if="$store.state.permissions && (
                $store.state.permissions['App.Http.Controllers.Api.Dashboard.Admin.ComponentController'] ||
                $store.state.permissions['App.Http.Controllers.Api.Dashboard.Admin.UserController'] ||
                $store.state.permissions['App.Http.Controllers.Api.Dashboard.Admin.UserRoleController'] ||
                $store.state.permissions['App.Http.Controllers.Api.Dashboard.Admin.SettingController'] ||
                $store.state.permissions['App.Http.Controllers.Api.Dashboard.Admin.LanguageController']
            )"
            class="my-3 mx-4 uppercase text-gray-300 text-xs"
        >
            {{ $t('Administration') }}
        </div>
        <menu-item
            v-if="$store.state.permissions && $store.state.permissions['App.Http.Controllers.Api.Dashboard.Admin.ComponentController']"
            :label="$t('Components')"
            :mobile="mobile"
            icon="shapes-regular"
            to="/dashboard/admin/components"
        ></menu-item>
        <menu-item
            v-if="$store.state.permissions && $store.state.permissions['App.Http.Controllers.Api.Dashboard.Admin.UserController']"
            :label="$t('Users')"
            :mobile="mobile"
            icon="users-regular"
            to="/dashboard/admin/users"
        ></menu-item>
        <menu-item
            v-if="$store.state.permissions && $store.state.permissions['App.Http.Controllers.Api.Dashboard.Admin.UserRoleController']"
            :label="$t('User roles')"
            :mobile="mobile"
            icon="id-card-regular"
            to="/dashboard/admin/user-roles"
        ></menu-item>
        <menu-item
            v-if="$store.state.permissions && $store.state.permissions['App.Http.Controllers.Api.Dashboard.Admin.SettingController']"
            :label="$t('Settings')"
            :mobile="mobile"
            icon="cog-regular"
            to="/dashboard/admin/settings"
        ></menu-item>
        <menu-item
            v-if="$store.state.permissions && $store.state.permissions['App.Http.Controllers.Api.Dashboard.Admin.LanguageController']"
            :label="$t('Translations')"
            :mobile="mobile"
            icon="language-regular"
            to="/dashboard/admin/languages"
        ></menu-item>
    </div>
</template>

<script>
import MenuItem from "@/components/layout/dashboard/menu/menu-item";

export default {
    name: "menu-list",
    components: {MenuItem},
    props: {
        mobile: {
            type: Boolean,
            required: false
        }
    }
}
</script>
