<template>
    <div class="min-h-screen bg-gray-100">
        <navbar/>
        <main>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div>
                    <vue-element-loading :active="loading.components"/>
                    <div class="mb-4">
                        <template v-if="!loading.resume">
                            <div v-if="resume.status === 1" class="bg-blue-200 border-l-4 border-blue-600 p-4 mt-4">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg-vue class="h-5 w-5 text-blue-600" icon="pause-circle-solid"></svg-vue>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm leading-5 text-blue-900">{{ $t('Service under maintenance') }}.</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="resume.status === 2" class="bg-yellow-200 border-l-4 border-yellow-600 p-4 mt-4">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg-vue class="h-5 w-5 text-yellow-600" icon="minus-circle-solid"></svg-vue>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm leading-5 text-yellow-900">{{ $t('Partially degraded service') }}.</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="resume.status === 3" class="bg-orange-200 border-l-4 border-orange-600 p-4 mt-4">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg-vue class="h-5 w-5 text-orange-600" icon="exclamation-circle-solid"></svg-vue>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm leading-5 text-orange-900">{{ $t('Minor service outage') }}.</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="resume.status === 4" class="bg-red-200 border-l-4 border-red-600 p-4 mt-4">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg-vue class="h-5 w-5 text-red-600" icon="exclamation-circle-solid"></svg-vue>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm leading-5 text-red-900">{{ $t('Partial system outage') }}.</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="resume.status === 5" class="bg-red-200 border-l-4 border-red-600 p-4 mt-4">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg-vue class="h-5 w-5 text-red-600" icon="exclamation-triangle-solid"></svg-vue>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm leading-5 text-red-900">{{ $t('Major system outage') }}.</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="bg-green-200 border-l-4 border-green-600 p-4 mt-4">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg-vue class="h-5 w-5 text-green-600" icon="check-circle-solid"></svg-vue>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm leading-5 text-green-900">{{ $t('All systems operational') }}.</p>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div v-if="resume.incidents && resume.incidents.length > 0" class="max-w-none mx-auto my-12">
                        <template v-for="incident in resume.incidents">
                            <div
                                :class="incident.type === 1 ? incident.impact === 1 ? 'border-green-600' : incident.impact === 2 ? 'border-yellow-500' : incident.impact === 3 ? 'border-orange-500' : 'border-red-600' : 'border-blue-600'"
                                class="bg-white overflow-hidden mb-4 border"
                            >
                                <div
                                    :class="incident.type === 1 ? incident.impact === 1 ? 'bg-green-600' : incident.impact === 2 ? 'bg-yellow-500' : incident.impact === 3 ? 'bg-orange-500' : 'bg-red-600' : 'bg-blue-600'"
                                    class="px-3 py-4 sm:px-6"
                                >
                                    <router-link
                                        :to="'/incidents/'+incident.uuid"
                                        class="font-semibold text-white"
                                    >
                                        {{ incident.name }}
                                    </router-link>
                                </div>
                                <div v-for="history in incident.histories" class="px-4 py-5">
                                    <div>
                                        <span v-if="history.status === 1" class="font-semibold">{{ $t('Investigating') }}</span>
                                        <span v-else-if="history.status === 2" class="font-semibold">{{ $t('Identified') }}</span>
                                        <span v-else-if="history.status === 3" class="font-semibold">{{ $t('Monitoring') }}</span>
                                        <span v-else-if="history.status === 4" class="font-semibold">{{ $t('Resolved') }}</span>
                                        <span v-else class="font-semibold">{{ $t('Updated') }}</span>
                                        - {{ history.message }}
                                    </div>
                                    <div class="text-gray-500 text-sm">
                                        {{ history.created_at | momentFormatDateTime }}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="bg-white overflow-hidden sm:rounded-md">
                    <vue-element-loading :active="loading.components"/>
                    <div class="shadow">
                        <template v-if="components && components.length > 0">
                            <ul>
                                <template v-for="(component, index) in components">
                                    <li :class="{'border-t border-gray-200': index !== 0}">
                                        <div class="px-4 py-4 sm:px-6">
                                            <div class="flex">
                                                <div class="flex-1 text-gray-800">{{ component.name }}</div>
                                                <div class="flex-1 text-right">
                                                    <component-status-text :status="component.status"/>
                                                </div>
                                            </div>
                                            <template v-if="component.display_uptime">
                                                <uptime-chart :incidences="component.incidences"/>
                                            </template>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                        </template>
                        <template v-else>
                            <div class="h-full flex">
                                <div class="m-auto">
                                    <div class="h-full w-full text-center items-center px-6 py-24">
                                        <svg-vue class="h-full md:h-64 mb-6" icon="server-status"></svg-vue>
                                        <div class="w-full font-semibold text-2xl">{{ $t('No records found') }}</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="mt-12">
                    <div class="pb-6">
                        <h1 class="text-3xl leading-6 font-medium text-gray-900">{{ $t('Past incidents') }}</h1>
                    </div>
                    <div class="pb-10">
                        <vue-element-loading :active="loading.components"/>
                        <template v-for="history in historyList">
                            <div class="pb-5">
                                <h2 class="leading-6 font-medium text-gray-900 pb-3 mb-3 border-b border-gray-400">{{ history.date | momentFormatDate }}</h2>
                                <template v-if="history.incidents && history.incidents.length > 0">
                                    <template v-for="incident in history.incidents">
                                        <div
                                            :class="incident.type === 1 ? incident.impact === 1 ? 'border-green-600' : incident.impact === 2 ? 'border-yellow-500' : incident.impact === 3 ? 'border-orange-500' : 'border-red-600' : 'border-blue-600'"
                                            class="bg-white overflow-hidden mb-3 border"
                                        >
                                            <div
                                                :class="incident.type === 1 ? incident.impact === 1 ? 'bg-green-600' : incident.impact === 2 ? 'bg-yellow-500' : incident.impact === 3 ? 'bg-orange-500' : 'bg-red-600' : 'bg-blue-600'"
                                                class="px-3 py-4 sm:px-6"
                                            >
                                                <router-link
                                                    :to="'/incidents/'+incident.uuid"
                                                    class="font-semibold text-white"
                                                >
                                                    {{ incident.name }}
                                                </router-link>
                                            </div>
                                            <div v-for="history in incident.histories" class="px-4 py-5">
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
                                        </div>
                                    </template>
                                </template>
                                <template v-else>
                                    <h4 class="text-gray-700 py-2">{{ $t('No incidents reported') }}.</h4>
                                </template>
                            </div>
                        </template>
                    </div>
<!--                    <div class="py-5 border-t border-gray-400">-->
<!--                        <router-link class="text-blue-600 cursor-pointer" to="/history">← {{ $t('Incident history') }}</router-link>-->
<!--                    </div>-->
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Navbar from "@/components/layout/shared/navbar";
import UptimeChart from "@/components/charts/uptime-chart/uptime-chart";
import ComponentStatusText from "@/components/elements/component/component-status-text";

export default {
    name: "index",
    components: {ComponentStatusText, UptimeChart, Navbar},
    metaInfo() {
        return {
            title: this.$store.state.settings.meta_home_title
        }
    },
    data() {
        return {
            loading: {
                resume: true,
                components: true,
                history: true,
            },
            resume: {
                status: null,
                incident: null
            },
            components: [],
            historyList: [],
        }
    },
    mounted() {
        this.getResumeStatus();
        this.getComponents();
        this.getHistory();
    },
    filters: {
        momentFormatDate: function (value) {
            return moment(value).locale(window.app.app_date_locale).format(window.app.app_date_format);
        },
        momentFormatDateTime: function (value) {
            return moment(value).locale(window.app.app_date_locale).format(window.app.app_date_format + ' HH:mm');
        },
    },
    methods: {
        getResumeStatus() {
            const self = this;
            self.loading.resume = true;
            axios.get('api/status/resume').then(function (response) {
                self.resume = response.data;
                self.loading.resume = false;
            }).catch(function () {
                self.loading.resume = false;
            });
        },
        getComponents() {
            const self = this;
            self.loading.components = true;
            axios.get('api/status/components').then(function (response) {
                self.components = response.data.items;
                self.loading.components = false;
            }).catch(function () {
                self.loading.components = false;
            });
        },
        getHistory() {
            const self = this;
            self.loading.history = true;
            axios.get('api/status/history').then(function (response) {
                self.historyList = response.data;
                self.loading.history = false;
            }).catch(function () {
                self.loading.history = false;
            });
        },
    }
}
</script>
