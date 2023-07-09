<template>
    <main class="flex-1 relative overflow-y-auto py-6 focus:outline-none" tabindex="0">
        <form @submit.prevent="saveComponent">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-5">
                <div class="md:flex md:items-center md:justify-between">
                    <div class="flex-1 min-w-0">
                        <h1 class="text-2xl font-semibold text-gray-900">{{ $t('Edit component') }}</h1>
                    </div>
                    <div class="mt-4 flex md:mt-0 md:ml-4">
                        <button
                            class="btn btn-red shadow-sm rounded-md"
                            type="button"
                            @click="deleteComponentModal = true"
                        >
                            {{ $t('Delete component') }}
                        </button>
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
                                    <label class="block text-sm font-medium leading-5 text-gray-700" for="status">{{ $t('Status') }}</label>
                                    <div class="mt-1 relative rounded-md shadow-sm">
                                        <component-status-selector id="status" v-model="component.status"></component-status-selector>
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
                                                :format="{ year: 'numeric', month: '2-digit', day: '2-digit'}"
                                                :phrases="{ok: this.$i18n.t('Ok'), cancel: this.$i18n.t('Cancel')}"
                                                :placeholder="$i18n.t('Select date')"
                                                :value-zone="$store.state.settings.app_timezone"
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
                                {{ $t('Close') }}
                            </router-link>
                            <button
                                class="btn btn-green shadow-sm rounded-md"
                                type="submit"
                            >
                                {{ $t('Edit component') }}
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </form>
        <div v-show="deleteComponentModal" class="fixed z-20 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <transition
                    duration="300"
                    enter-active-class="ease-out duration-300"
                    enter-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-show="deleteComponentModal" class="fixed inset-0 transition-opacity">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                </transition>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                <transition
                    enter-active-class="ease-out duration-300"
                    enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        v-show="deleteComponentModal"
                        aria-labelledby="modal-headline"
                        aria-modal="true"
                        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        role="dialog"
                    >
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg-vue class="h-6 w-6 pb-1 text-red-600" icon="exclamation-triangle-light"></svg-vue>
                                </div>
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 id="modal-headline" class="text-lg leading-6 font-medium text-gray-900">
                                        {{ $t('Delete component') }}
                                    </h3>
                                    <div class="mt-2">
                                        <p class="text-sm leading-5 text-gray-500">
                                            {{ $t('Are you sure you want to delete the component?') }}
                                            {{ $t('All associated data will be deleted as well') }}.
                                            {{ $t('This action cannot be undone') }}.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                class="btn btn-red mr-2 sm:mr-0"
                                type="button"
                                @click="deleteComponent"
                            >
                                {{ $t('Delete component') }}
                            </button>
                            <button
                                class="btn btn-white mr-0 sm:mr-2"
                                type="button"
                                @click="deleteComponentModal = false"
                            >
                                {{ $t('Cancel') }}
                            </button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </main>
</template>

<script>
import {Settings} from 'luxon';
import {Datetime} from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import UptimeChart from "@/components/charts/uptime-chart/uptime-chart";
import ComponentStatusSelector from "@/components/elements/component/component-status-selector";

Settings.defaultLocale = document.documentElement.lang;

export default {
    name: "edit-component",
    metaInfo() {
        return {
            title: this.$i18n.t('Edit component')
        }
    },
    components: {
        ComponentStatusSelector,
        'datetime': Datetime,
        UptimeChart
    },
    data() {
        return {
            loading: true,
            deleteComponentModal: false,
            component: {
                name: null,
                status: 1,
                description: null,
                display_uptime: true,
                start_at: null,
            }
        }
    },
    mounted() {
        this.getComponent();
    },
    methods: {
        saveComponent() {
            const self = this;
            self.loading = true;
            axios.put('api/dashboard/admin/components/' + self.$route.params.id, self.component).then(function (response) {
                self.loading = false;
                self.$notify({
                    title: self.$i18n.t('Success').toString(),
                    text: self.$i18n.t('Data updated correctly').toString(),
                    type: 'success'
                });
            }).catch(function () {
                self.loading = false;
            });
        },
        getComponent() {
            const self = this;
            self.loading = true;
            axios.get('api/dashboard/admin/components/' + self.$route.params.id).then(function (response) {
                self.component = response.data;
                self.loading = false;
            }).catch(function () {
                self.loading = false;
                self.$router.push('/dashboard/admin/components');
            });
        },
        deleteComponent() {
            const self = this;
            axios.delete('api/dashboard/admin/components/' + self.$route.params.id).then(function () {
                self.$notify({
                    title: self.$i18n.t('Success').toString(),
                    text: self.$i18n.t('Data deleted successfully').toString(),
                    type: 'success'
                });
                self.$router.push('/dashboard/admin/components');
            }).catch(function () {
                self.loading = false;
                self.deleteUserModal = false;
            });
        },
    }
}
</script>
