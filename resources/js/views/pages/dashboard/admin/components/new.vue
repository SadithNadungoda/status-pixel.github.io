<template>
    <main class="flex-1 relative overflow-y-auto py-6 focus:outline-none" tabindex="0">
        <form @submit.prevent="saveComponent">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-5">
                <div class="md:flex md:items-center md:justify-between">
                    <div class="flex-1 min-w-0">
                        <h1 class="text-2xl font-semibold text-gray-900">{{ $t('Create component') }}</h1>
                    </div>
                </div>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mt-6 shadow sm:rounded-lg">
                    <vue-element-loading :active="loading"/>
                    <div class="bg-white md:grid md:grid-cols-3 md:gap-6 px-4 py-5 sm:p-6">
                        <div class="md:col-span-1">
                            <h3 class="text-lg font-medium leading-6 text-gray-900">{{ $t('Component details') }}</h3>
                        </div>
                        <div class="mt-5 md:mt-0 md:col-span-2">
                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3">
                                    <label class="block text-sm font-medium leading-5 text-gray-700" for="name">{{ $t('Name') }}</label>
                                    <div class="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            id="name"
                                            v-model="component.name"
                                            :placeholder="$t('Name')"
                                            class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                            required
                                        >
                                    </div>
                                </div>
                                <div class="col-span-3">
                                    <div class="flex justify-between">
                                        <label class="block text-sm font-medium leading-5 text-gray-700" for="description">{{ $t('Description') }}</label>
                                        <span id="description-optional" class="text-sm leading-5 text-gray-500">{{ $t('Optional') }}</span>
                                    </div>
                                    <div class="mt-1 relative rounded-md shadow-sm">
                                        <textarea-autosize
                                            id="description"
                                            v-model="component.description"
                                            :placeholder="$t('Description')"
                                            class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        ></textarea-autosize>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="md:col-span-3">
                            <div class="py-3">
                                <div class="border-t border-gray-200"></div>
                            </div>
                        </div>
                        <div class="md:col-span-1">
                            <h3 class="text-lg font-medium leading-6 text-gray-900">{{ $t('Display options') }}</h3>
                        </div>
                        <div class="mt-5 md:mt-0 md:col-span-2">
                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3">
                                    <label class="block text-sm font-medium leading-5 text-gray-700" for="display_uptime">{{ $t('Display uptime') }}</label>
                                    <div class="flex mt-1 items-center relative">
                                        <input
                                            id="display_uptime"
                                            v-model="component.display_uptime"
                                            class="form-checkbox h-4 w-4 text-blue-600 cursor-pointer transition duration-150 ease-in-out"
                                            type="checkbox"
                                        >
                                        <span
                                            class="ml-2 block text-sm text-gray-600 cursor-pointer"
                                            @click="component.display_uptime = !component.display_uptime"
                                        >{{ $t('Display the historical status of this component on my status page') }}.</span>
                                    </div>
                                    <p id="display_uptime-description" class="mt-2 text-sm text-gray-500">
                                        {{ $t('Enabling this option will show a representative view of this component\'s uptime for the last 90 days on your status page, and will also appear on the history page') }}.
                                    </p>
                                </div>
                                <template v-if="component.display_uptime">
                                    <div class="col-span-3">
                                        <label class="block text-sm font-medium leading-5 text-gray-700" for="start_at">{{ $t('Start date') }}</label>
                                        <div class="mt-1 relative rounded-md shadow-sm">
                                            <datetime
                                                id="start_at"
                                                v-model="component.start_at"
                                                :auto="true"
                                                :format="{ year: 'numeric', month: '2-digit', day: '2-digit'}"
                                                :phrases="{ok: this.$i18n.t('Ok'), cancel: this.$i18n.t('Cancel')}"
                                                :placeholder="$i18n.t('Select date')"
                                                :value-zone="$store.state.settings.app_timezone"
                                                :zone="$store.state.settings.app_timezone"
                                                input-class="form-input block w-full pr-10 sm:text-sm sm:leading-5 cursor-pointer"
                                                input-id="start_at"
                                            />
                                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <svg-vue class="h-5 w-5 text-gray-400" icon="calendar-alt-regular"></svg-vue>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-span-3 shadow border rounded p-2">
                                        <uptime-chart :incidences="{}"/>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-100 text-right px-4 py-3 sm:px-6">
                        <span class="inline-flex">
                            <router-link
                                class="btn btn-secondary shadow-sm rounded-md mr-4"
                                to="/dashboard/admin/components"
                            >
                                {{ $t('Cancel') }}
                            </router-link>
                            <button
                                class="btn btn-green shadow-sm rounded-md"
                                type="submit"
                            >
                                {{ $t('Create component') }}
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </form>
    </main>
</template>

<script>
import {Settings} from 'luxon';
import {Datetime} from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import UptimeChart from "@/components/charts/uptime-chart/uptime-chart";

Settings.defaultLocale = document.documentElement.lang;

export default {
    name: "new-component",
    metaInfo() {
        return {
            title: this.$i18n.t('Create component')
        }
    },
    components: {
        'datetime': Datetime,
        UptimeChart
    },
    data() {
        return {
            loading: false,
            component: {
                name: null,
                status: 1,
                description: null,
                display_uptime: true,
                start_at: null,
            },
        }
    },
    methods: {
        saveComponent() {
            const self = this;
            self.loading = true;
            axios.post('api/dashboard/admin/components', self.component).then(function (response) {
                self.loading = false;
                self.$notify({
                    title: self.$i18n.t('Success').toString(),
                    text: self.$i18n.t('Data saved correctly').toString(),
                    type: 'success'
                });
                self.$router.push('/dashboard/admin/components/' + response.data.component.id + '/edit');
            }).catch(function () {
                self.loading = false;
            });
        }
    }
}
</script>
