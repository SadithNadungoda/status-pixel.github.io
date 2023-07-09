<template>
    <main class="flex-1 relative overflow-y-auto py-6 focus:outline-none" tabindex="0">
        <form @submit.prevent="saveIncident">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-5">
                <div class="md:flex md:items-center md:justify-between">
                    <div class="flex-1 min-w-0">
                        <h1 v-if="incident.type === 1" class="text-2xl font-semibold text-gray-900">{{ $t('Create incident') }}</h1>
                        <h1 v-if="incident.type === 2" class="text-2xl font-semibold text-gray-900">{{ $t('Schedule maintenance') }}</h1>
                    </div>
                </div>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mt-6 shadow sm:rounded-lg">
                    <vue-element-loading :active="loading"/>
                    <div class="bg-white md:grid md:grid-cols-3 md:gap-6 px-4 py-5 sm:p-6">
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
                                <div v-if="incident.type === 1" class="col-span-3">
                                    <label class="block text-sm font-medium leading-5 text-gray-700">{{ $t('Status') }}</label>
                                    <div class="shadow border rounded mt-1 p-2">
                                        <div class="w-full mb-3 bg-gray-300">
                                            <div
                                                :style="{width: incident.status === 1 ? '25%' : incident.status === 2 ? '50%' : incident.status === 3 ? '75%' : '100%'}"
                                                class="bg-blue-600 py-1"
                                            />
                                        </div>
                                        <div class="lg:flex justify-around text-gray-700">
                                            <div
                                                :class="incident.status === 1 ? 'text-blue-700' : null"
                                                class="cursor-pointer my-2 lg:my-0"
                                                @click="incident.status = 1"
                                            >
                                                {{ $t('Investigating') }}
                                            </div>
                                            <div
                                                :class="incident.status === 2 ? 'text-blue-700' : null"
                                                class="cursor-pointer my-2 lg:my-0"
                                                @click="incident.status = 2"
                                            >
                                                {{ $t('Identified') }}
                                            </div>
                                            <div
                                                :class="incident.status === 3 ? 'text-blue-700' : null"
                                                class="cursor-pointer my-2 lg:my-0"
                                                @click="incident.status = 3"
                                            >
                                                {{ $t('Monitoring') }}
                                            </div>
                                            <div
                                                :class="incident.status === 4 ? 'text-blue-700' : null"
                                                class="cursor-pointer my-2 lg:my-0"
                                                @click="incident.status = 4"
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
                                            v-model="incident.message"
                                            :placeholder="getIncidentMessagePlaceholder"
                                            class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                            required
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
                                <span v-if="incident.type === 1">{{ $t('Create incident') }}</span>
                                <span v-if="incident.type === 2">{{ $t('Scheduled maintenance') }}</span>
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
import ComponentStatusSelector from "@/components/elements/component/component-status-selector";
import IncidentImpactSelector from "@/components/elements/incident/incident-impact-selector";

Settings.defaultLocale = document.documentElement.lang;

export default {
    name: "new-incident",
    metaInfo() {
        return {
            title: this.$i18n.t('Create incident')
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
            incident: {
                name: null,
                type: 1,
                status: 1,
                impact: 1,
                message: null,
                start_at: null,
                end_at: null,
                components: [],
            },
            components: []
        }
    },
    mounted() {
        this.getComponents();
        if (this.$route.params.type === 'incident') {
            this.incident.type = 1;
        } else if (this.$route.params.type === 'maintenance') {
            this.incident.type = 2;
        } else {
            this.$notify({
                title: this.$i18n.t('Error').toString(),
                text: this.$i18n.t('The selected incident type is invalid').toString(),
                type: 'error'
            });
            this.$router.push('/dashboard/incidents');
        }
    },
    computed: {
        getIncidentMessagePlaceholder() {
            if (this.incident.type === 1) {
                switch (this.incident.status) {
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
        saveIncident() {
            const self = this;
            self.loading = true;
            axios.post('api/dashboard/incidents', {
                incident: self.incident,
                components: self.components
            }).then(function (response) {
                self.loading = false;
                self.$notify({
                    title: self.$i18n.t('Success').toString(),
                    text: self.$i18n.t('Data saved correctly').toString(),
                    type: 'success'
                });
                self.$router.push('/dashboard/incidents/' + response.data.incident.id + '/edit');
            }).catch(function () {
                self.loading = false;
            });
        },
        getComponents() {
            const self = this;
            self.loading = true;
            axios.get('api/dashboard/incidents/components').then(function (response) {
                self.components = response.data.items;
                self.loading = false;
            }).catch(function () {
                self.loading = false;
            });
        },
    }
}
</script>
