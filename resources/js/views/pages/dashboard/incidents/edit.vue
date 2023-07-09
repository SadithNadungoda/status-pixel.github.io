<template>
    <main class="flex-1 relative overflow-y-auto py-6 focus:outline-none" tabindex="0">
        <form @submit.prevent="saveIncident">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-5">
                <div class="md:flex md:items-center md:justify-between">
                    <div class="flex-1 min-w-0">
                        <h1 v-if="incident.type === 1" class="text-2xl font-semibold text-gray-900">{{ $t('Manage incident') }}</h1>
                        <h1 v-if="incident.type === 2" class="text-2xl font-semibold text-gray-900">{{ $t('Manage scheduled maintenance') }}</h1>
                    </div>
                    <div class="mt-4 flex md:mt-0 md:ml-4">
                        <button
                            class="btn btn-red shadow-sm rounded-md"
                            type="button"
                            @click="deleteIncidentModal = true"
                        >
                            <span v-if="incident.type === 1">{{ $t('Delete incident') }}</span>
                            <span v-if="incident.type === 2">{{ $t('Delete scheduled maintenance') }}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mt-6 shadow sm:rounded-lg">
                    <vue-element-loading :active="loading"/>
                    <div>
                        <div>
                            <div class="sm:hidden">
                                <select
                                    v-model="tab"
                                    aria-label="Selected tab"
                                    class="mt-1 form-select rounded-none border-0 border-b block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                >
                                    <option :value="1">{{ $t('Details') }}</option>
                                    <option :value="2">{{ $t('History') }}</option>
                                </select>
                            </div>
                            <div class="hidden sm:block">
                                <div class="border-b border-gray-200">
                                    <nav class="-mb-px flex">
                                        <button
                                            :class="tab === 1 ? 'border-blue-500 text-blue-600 hover:border-blue-600 hover:text-blue-700' : null"
                                            class="whitespace-no-wrap py-4 px-8 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none"
                                            type="button"
                                            @click="tab = 1"
                                        >
                                            {{ $t('Details') }}
                                        </button>
                                        <button
                                            :class="tab === 2 ? 'border-blue-500 text-blue-600 hover:border-blue-600 hover:text-blue-700' : null"
                                            class="whitespace-no-wrap py-4 px-8 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none"
                                            type="button"
                                            @click="tab = 2"
                                        >
                                            {{ $t('History') }}
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="bg-white md:grid md:grid-cols-3 md:gap-6 px-4 py-5 sm:p-6">
                                <template v-if="tab === 1">
                                    <div class="md:col-span-1">
                                        <h3 v-if="incident.type === 1" class="text-lg font-medium leading-6 text-gray-900">{{ $t('Incident details') }}</h3>
                                        <h3 v-if="incident.type === 2" class="text-lg font-medium leading-6 text-gray-900">{{ $t('Maintenance details') }}</h3>
                                    </div>
                                    <div class="mt-5 md:mt-0 md:col-span-2">
                                        <div class="grid grid-cols-3 gap-6">
                                            <div class="col-span-3">
                                                <label class="block text-sm font-medium leading-5 text-gray-700" for="name">{{ $t('Name') }}</label>
                                                <div class="mt-1 relative rounded-md shadow-sm">
                                                    <input
                                                        id="name"
                                                        v-model="incident.name"
                                                        :placeholder="$t('Name')"
                                                        class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                                        required
                                                    >
                                                </div>
                                            </div>
                                            <div v-if="incident.type === 1" class="col-span-3">
                                                <label class="block text-sm font-medium leading-5 text-gray-700" for="impact">{{ $t('Impact') }}</label>
                                                <div class="mt-1 relative rounded-md shadow-sm">
                                                    <incident-impact-selector id="impact" v-model="incident.impact"></incident-impact-selector>
                                                </div>
                                            </div>
                                            <div v-if="incident.type === 2" class="col-span-3">
                                                <div class="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <label class="block text-sm font-medium leading-5 text-gray-700" for="start_at">{{ $t('Start at') }}</label>
                                                        <div class="mt-1 relative rounded-md shadow-sm">
                                                            <datetime
                                                                id="start_at"
                                                                v-model="incident.start_at"
                                                                :auto="true"
                                                                :format="{ year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit'}"
                                                                :minute-step="15"
                                                                :phrases="{ok: this.$i18n.t('Ok'), cancel: this.$i18n.t('Cancel')}"
                                                                :placeholder="$i18n.t('Select date & time')"
                                                                :value-zone="$store.state.settings.app_timezone"
                                                                :zone="$store.state.settings.app_timezone"
                                                                input-class="form-input block w-full pr-10 sm:text-sm sm:leading-5 cursor-pointer"
                                                                input-id="start_at"
                                                                type="datetime"
                                                            />
                                                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                                <svg-vue class="h-5 w-5 text-gray-400" icon="calendar-alt-regular"></svg-vue>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label class="block text-sm font-medium leading-5 text-gray-700" for="end_at">{{ $t('End at') }}</label>
                                                        <div class="mt-1 relative rounded-md shadow-sm">
                                                            <datetime
                                                                id="end_at"
                                                                v-model="incident.end_at"
                                                                :auto="true"
                                                                :format="{ year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit'}"
                                                                :minute-step="15"
                                                                :phrases="{ok: this.$i18n.t('Ok'), cancel: this.$i18n.t('Cancel')}"
                                                                :placeholder="$i18n.t('Select date & time')"
                                                                :value-zone="$store.state.settings.app_timezone"
                                                                :zone="$store.state.settings.app_timezone"
                                                                input-class="form-input block w-full pr-10 sm:text-sm sm:leading-5 cursor-pointer"
                                                                input-id="end_at"
                                                                type="datetime"
                                                            />
                                                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                                <svg-vue class="h-5 w-5 text-gray-400" icon="calendar-alt-regular"></svg-vue>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                        <h3 class="text-lg font-medium leading-6 text-gray-900">{{ $t('Components affected') }}</h3>
                                    </div>
                                    <div class="mt-5 md:mt-0 md:col-span-2">
                                        <div class="grid grid-cols-3 gap-6">
                                            <div class="col-span-3">
                                                <template v-if="components.length > 0">
                                                    <div v-for="(component, index) in components" :class="index === 0 ? 'mb-3' : (index + 1) === components.length ? 'mt-3' : 'my-3'">
                                                        <div class="flex lg:flex-row flex-col flex-wrap justify-between">
                                                            <div class="self-center flex-1 w-full lg:w-2/3">
                                                                <label :for="'select_component_' + component.id" class="inline-block align-middle">
                                                                    <input
                                                                        :id="'select_component_' + component.id"
                                                                        v-model="incident.components"
                                                                        :value="component.id"
                                                                        class="form-checkbox h-4 w-4 text-blue-600 mb-1 mr-2"
                                                                        type="checkbox"
                                                                    >
                                                                    {{ component.name }}
                                                                </label>
                                                            </div>
                                                            <div class="self-center flex-1 w-full mt-1 lg:w-1/3 lg:mt-0 h-10">
                                                                <template v-if="incident.components.includes(component.id)">
                                                                    <component-status-selector v-model="component.status"></component-status-selector>
                                                                </template>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-else-if="! loading">
                                                    <div class="h-full flex">
                                                        <div class="m-auto">
                                                            <div class="h-full w-full text-center items-center p-6">
                                                                <svg-vue class="h-full md:h-64 mb-6" icon="browsing"></svg-vue>
                                                                <div class="w-full font-semibold text-2xl">{{ $t('No records found') }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <template v-if="true">
                                        <div class="md:col-span-3">
                                            <div class="py-3">
                                                <div class="border-t border-gray-200"></div>
                                            </div>
                                        </div>
                                        <div class="md:col-span-1">
                                            <h3 class="text-lg font-medium leading-6 text-gray-900">{{ $t('Update history') }}</h3>
                                        </div>
                                        <div class="mt-5 md:mt-0 md:col-span-2">
                                            <div class="grid grid-cols-3 gap-6">
                                                <div v-if="incident.type === 1" class="col-span-3">
                                                    <label class="block text-sm font-medium leading-5 text-gray-700">{{ $t('Status') }}</label>
                                                    <div class="shadow border rounded mt-1 p-2">
                                                        <div class="w-full mb-3 bg-gray-300">
                                                            <div
                                                                :style="{width: incident_history.status === 1 ? '25%' : incident_history.status === 2 ? '50%' : incident_history.status === 3 ? '75%' : '100%'}"
                                                                class="bg-blue-600 py-1"
                                                            />
                                                        </div>
                                                        <div class="lg:flex justify-around text-gray-700">
                                                            <div
                                                                :class="incident_history.status === 1 ? 'text-blue-700' : null"
                                                                class="cursor-pointer my-2 lg:my-0"
                                                                @click="incident_history.status = 1"
                                                            >
                                                                {{ $t('Investigating') }}
                                                            </div>
                                                            <div
                                                                :class="incident_history.status === 2 ? 'text-blue-700' : null"
                                                                class="cursor-pointer my-2 lg:my-0"
                                                                @click="incident_history.status = 2"
                                                            >
                                                                {{ $t('Identified') }}
                                                            </div>
                                                            <div
                                                                :class="incident_history.status === 3 ? 'text-blue-700' : null"
                                                                class="cursor-pointer my-2 lg:my-0"
                                                                @click="incident_history.status = 3"
                                                            >
                                                                {{ $t('Monitoring') }}
                                                            </div>
                                                            <div
                                                                :class="incident_history.status === 4 ? 'text-blue-700' : null"
                                                                class="cursor-pointer my-2 lg:my-0"
                                                                @click="incident_history.status = 4"
                                                            >
                                                                {{ $t('Resolved') }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-span-3">
                                                    <label class="block text-sm font-medium leading-5 text-gray-700" for="name">{{ $t('Message') }}</label>
                                                    <div class="mt-1 relative rounded-md shadow-sm">
                                                        <textarea-autosize
                                                            id="description"
                                                            v-model="incident_history.message"
                                                            :placeholder="getIncidentMessagePlaceholder"
                                                            class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                                        ></textarea-autosize>
                                                    </div>
                                                </div>
                                                <div v-if="incident.type === 1 && incident_history.status === 4" class="col-span-3">
                                                    <label class="block text-sm font-medium leading-5 text-gray-700" for="close_incident">{{ $t('Reset component status to operational') }}</label>
                                                    <div class="flex mt-1 items-center relative">
                                                        <input
                                                            id="close_incident"
                                                            v-model="incident_history.close_incident"
                                                            class="form-checkbox h-4 w-4 text-blue-600 cursor-pointer transition duration-150 ease-in-out"
                                                            type="checkbox"
                                                        >
                                                        <span
                                                            class="ml-2 block text-sm text-gray-600 cursor-pointer"
                                                            @click="incident_history.close_incident = !incident_history.close_incident"
                                                        >{{ $t('Mark all affected components again as operational and close the incident.') }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </template>
                                <template v-if="tab === 2">
                                    <div class="md:col-span-1">
                                        <h3 v-if="incident.type === 1" class="text-lg font-medium leading-6 text-gray-900">{{ $t('Incident history') }}</h3>
                                        <h3 v-if="incident.type === 2" class="text-lg font-medium leading-6 text-gray-900">{{ $t('Maintenance history') }}</h3>
                                    </div>
                                    <div class="mt-5 md:mt-0 md:col-span-2">
                                        <div class="grid grid-cols-3 gap-6">
                                            <div class="col-span-3">
                                                <template v-if="incident.histories.length > 0">
                                                    <div v-for="history in incident.histories" class="py-4">
                                                        <div>
                                                            <span v-if="history.status === 1" class="font-semibold">{{ $t('Investigating') }}</span>
                                                            <span v-else-if="history.status === 2" class="font-semibold">{{ $t('Identified') }}</span>
                                                            <span v-else-if="history.status === 3" class="font-semibold">{{ $t('Monitoring') }}</span>
                                                            <span v-else-if="history.status === 4" class="font-semibold">{{ $t('Resolved') }}</span>
                                                            <span v-else class="font-semibold">{{ $t('Update') }}</span>
                                                            - {{ history.message }}
                                                        </div>
                                                        <div class="text-gray-500 text-sm">
                                                            {{ history.created_at | momentFormatDateTime }}
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="h-full flex">
                                                        <div class="m-auto">
                                                            <div class="h-full w-full text-center items-center p-6">
                                                                <svg-vue class="h-full md:h-64 mb-6" icon="browsing"></svg-vue>
                                                                <div class="w-full font-semibold text-2xl">{{ $t('No records found') }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="bg-gray-100 text-right px-4 py-3 sm:px-6">
                        <span class="inline-flex">
                            <router-link
                                class="btn btn-secondary shadow-sm rounded-md mr-4"
                                to="/dashboard/incidents"
                            >
                                {{ $t('Cancel') }}
                            </router-link>
                            <button
                                class="btn btn-green shadow-sm rounded-md"
                                type="submit"
                            >
                                <span v-if="incident.type === 1">{{ $t('Edit incident') }}</span>
                                <span v-if="incident.type === 2">{{ $t('Edit maintenance') }}</span>
                            </button>
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div v-show="deleteIncidentModal" class="fixed z-20 inset-0 overflow-y-auto">
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
                    <div v-show="deleteIncidentModal" class="fixed inset-0 transition-opacity">
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
                        v-show="deleteIncidentModal"
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
                                        <span v-if="incident.type === 1">{{ $t('Delete incident') }}</span>
                                        <span v-if="incident.type === 2">{{ $t('Delete scheduled maintenance') }}</span>
                                    </h3>
                                    <div class="mt-2">
                                        <p v-if="incident.type === 1" class="text-sm leading-5 text-gray-500">
                                            {{ $t('Are you sure you want to delete the incident?') }}
                                            {{ $t('It is cleared from the history and will not be displayed on the past incident page') }}.
                                            {{ $t('This action cannot be undone') }}.
                                        </p>
                                        <p v-if="incident.type === 2" class="text-sm leading-5 text-gray-500">
                                            {{ $t('Are you sure you want to delete the scheduled maintenance') }}
                                            {{ $t('It is cleared from the history and will not be displayed on the past scheduled maintenance page') }}.
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
                                @click="deleteIncident"
                            >
                                <span v-if="incident.type === 1">{{ $t('Delete incident') }}</span>
                                <span v-if="incident.type === 2">{{ $t('Delete scheduled maintenance') }}</span>
                            </button>
                            <button
                                class="btn btn-white mr-0 sm:mr-2"
                                type="button"
                                @click="deleteIncidentModal = false"
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
import ComponentStatusSelector from "@/components/elements/component/component-status-selector";
import IncidentImpactSelector from "@/components/elements/incident/incident-impact-selector";

Settings.defaultLocale = document.documentElement.lang;

export default {
    name: "edit-incident",
    metaInfo() {
        return {
            title: this.$i18n.t('Edit incident')
        }
    },
    components: {
        IncidentImpactSelector,
        ComponentStatusSelector,
        'datetime': Datetime
    },
    data() {
        return {
            loading: true,
            deleteIncidentModal: false,
            tab: 1,
            incident: {
                name: null,
                type: 1,
                impact: 1,
                start_at: null,
                end_at: null,
                components: [],
                histories: [],
            },
            incident_history: {
                message: null,
                status: null,
                close_incident: true,
            },
            components: [],
        }
    },
    mounted() {
        this.getComponents();
    },
    filters: {
        momentFormatDateTime: function (value) {
            return moment(value).locale(window.app.app_date_locale).format(window.app.app_date_format + ' HH:mm');
        },
    },
    computed: {
        getIncidentMessagePlaceholder() {
            if (this.incident.type === 1) {
                switch (this.incident_history.status) {
                    case 1:
                        return this.$i18n.t('We are currently investigating this issue') + '.';
                    case 2:
                        return this.$i18n.t('The issue has been identified and a fix is being implemented') + '.';
                    case 3:
                        return this.$i18n.t('A fix has been implemented and we are monitoring the results') + '.';
                    case 4:
                        return this.$i18n.t('This incident has been resolved') + '.';
                    default:
                        return this.$i18n.t('Incident message') + '.';
                }
            } else if (this.incident.type === 2) {
                return this.$i18n.t('We will be undergoing scheduled maintenance during this time') + '.';
            }
        },
    },
    methods: {
        getIncident() {
            const self = this;
            self.loading = true;
            axios.get('api/dashboard/incidents/' + self.$route.params.id).then(function (response) {
                self.incident = response.data;
                self.incident_history.status = response.data.last_history ? response.data.last_history.status : 0
                self.loading = false;
            }).catch(function () {
                self.loading = false;
                self.$router.push('/dashboard/incidents');
            });
        },
        getComponents() {
            const self = this;
            self.loading = true;
            axios.get('api/dashboard/incidents/components').then(function (response) {
                self.components = response.data.items;
                self.getIncident();
            }).catch(function () {
                self.loading = false;
                self.$router.push('/dashboard/incidents');
            });
        },
        saveIncident() {
            const self = this;
            self.loading = true;
            axios.put('api/dashboard/incidents/' + self.$route.params.id, {
                incident: self.incident,
                components: self.components,
                incident_history: self.incident_history
            }).then(function (response) {
                self.incident = response.data.incident;
                self.components = response.data.components;
                self.incident_history.message = null;
                self.loading = false;
                self.$notify({
                    title: self.$i18n.t('Success').toString(),
                    text: self.$i18n.t('Data saved correctly').toString(),
                    type: 'success'
                });
            }).catch(function () {
                self.loading = false;
            });
        },
        deleteIncident() {
            const self = this;
            axios.delete('api/dashboard/incidents/' + self.$route.params.id).then(function () {
                self.$notify({
                    title: self.$i18n.t('Success').toString(),
                    text: self.$i18n.t('Data deleted successfully').toString(),
                    type: 'success'
                });
                self.$router.push('/dashboard/incidents');
            }).catch(function () {
                self.loading = false;
                self.deleteUserModal = false;
            });
        },
    }
}
</script>
