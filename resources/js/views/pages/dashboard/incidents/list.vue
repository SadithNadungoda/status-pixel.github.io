<template>
    <main class="flex-1 relative overflow-y-auto py-6 focus:outline-none" tabindex="0">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-5">
            <div class="md:flex md:items-center md:justify-between">
                <div class="flex-1 min-w-0">
                    <h1 class="text-2xl font-semibold text-gray-900">{{ $t('Incidents') }}</h1>
                </div>
                <div class="mt-4 flex md:mt-0 md:ml-4">
                    <router-link
                        class="btn btn-blue shadow-sm rounded-md mr-2"
                        to="/dashboard/incidents/new/incident"
                    >
                        {{ $t('Create incident') }}
                    </router-link>
                    <router-link
                        class="btn btn-blue shadow-sm rounded-md"
                        to="/dashboard/incidents/new/maintenance"
                    >
                        {{ $t('Schedule maintenance') }}
                    </router-link>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="my-6 bg-white shadow overflow-hidden sm:rounded-md">
                <vue-element-loading :active="loading"/>
                <div class="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200 sm:px-6">
                    <div>
                        <label class="sr-only" for="search">{{ $t('Search') }}</label>
                        <div class="flex rounded-md shadow-sm">
                            <div class="relative flex-grow focus-within:z-10">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg-vue class="h-5 w-5 text-gray-400" icon="search-regular"></svg-vue>
                                </div>
                                <input
                                    id="search"
                                    v-model.lazy="filter.search"
                                    :placeholder="$t('Search')"
                                    class="form-input block w-full rounded-none rounded-l-md pl-10 text-sm transition ease-in-out duration-150"
                                    @change="getIncidents"
                                >
                            </div>
                            <span class="relative inline-flex shadow-sm rounded-r-md">
                                <select
                                    id="status"
                                    v-model="filter.status"
                                    aria-label="Status"
                                    class="-ml-px block form-select w-full pl-3 pr-9 py-2 rounded-l-none rounded-r-none border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                                    @change="getIncidents"
                                >
                                    <option value="open">{{ $t('Only open incidents') }}</option>
                                    <option value="closed">{{ $t('Only closed incidents') }}</option>
                                    <option :value="null">{{ $t('All incidents') }}</option>
                                </select>
                                <select
                                    id="type"
                                    v-model="filter.type"
                                    aria-label="Type"
                                    class="-ml-px block form-select w-full pl-3 pr-9 py-2 rounded-l-none rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                                    @change="getIncidents"
                                >
                                    <option :value="1">{{ $t('Incidents') }}</option>
                                    <option :value="2">{{ $t('Scheduled maintenances') }}</option>
                                    <option :value="null">{{ $t('All') }}</option>
                                </select>
                            </span>
                        </div>
                    </div>
                </div>
                <template v-if="incidentsList.length > 0">
                    <ul>
                        <template v-for="(incident, index) in incidentsList">
                            <li
                                :key="incident.order"
                                :class="incident.type === 1 ? incident.impact === 1 ? 'border-green-600' : incident.impact === 2 ? 'border-yellow-500' : incident.impact === 3 ? 'border-orange-500' : 'border-red-600' : 'border-blue-600'"
                                class="border-l-4"
                            >
                                <router-link
                                    :class="{'border-t border-gray-200': index !== 0}"
                                    :to="'/dashboard/incidents/' + incident.id + '/edit'"
                                    class="block hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                    <div class="flex items-center px-4 py-4 sm:px-6">
                                        <div class="min-w-0 flex-1 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4">
                                            <div>
                                                <div class="text-sm leading-5 font-medium text-gray-700 truncate">{{ incident.name }}</div>
                                                <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                                    <div v-if="incident.type === 1 && incident.last_history">
                                                        <span class="uppercase inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-blue-100 text-blue-800 mr-2">
                                                            <span v-if="incident.last_history.status === 1">{{ $t('Investigating') }}</span>
                                                            <span v-if="incident.last_history.status === 2">{{ $t('Identified') }}</span>
                                                            <span v-if="incident.last_history.status === 3">{{ $t('Monitoring') }}</span>
                                                            <span v-if="incident.last_history.status === 4">{{ $t('Resolved') }}</span>
                                                            <span v-if="incident.last_history.status === 0">{{ $t('Updated') }}</span>
                                                        </span>
                                                        {{ incident.last_history.created_at | momentFormatDateTimeAgo }}
                                                    </div>
                                                    <div v-else>
                                                        <span class="uppercase inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-blue-100 text-blue-800 mr-2">
                                                            {{ $t('Scheduled') }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="hidden lg:block xl:col-span-2">
                                                <div v-if="incident.components">
                                                    <div class="text-sm leading-5 text-gray-900">
                                                        {{ incident.components.length }}
                                                        <span v-if="incident.components.length === 1"> {{ $t('component affected') }}</span>
                                                        <span v-else> {{ $t('components affected') }}</span>
                                                    </div>
                                                    <div class="flex max-w-full overflow-hidden mr-6">
                                                        <template v-for="component in  incident.components">
                                                            <div class="mt-2 flex items-center text-sm leading-5 text-gray-600 mr-2">
                                                                <component-status-icon :status="component.status" size="4"/>
                                                                <span class="ml-1 whitespace-no-wrap">{{ component.name }}</span>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <svg-vue class="h-5 w-5 text-gray-400" icon="angle-right-regular"></svg-vue>
                                        </div>
                                    </div>
                                </router-link>
                            </li>
                        </template>
                    </ul>
                </template>
                <template v-else-if="!loading">
                    <template v-if="filter.search || filter.status || filter.type">
                        <div class="h-full flex">
                            <div class="m-auto">
                                <div class="h-full w-full text-center items-center p-6">
                                    <svg-vue class="h-full md:h-64 mb-6" icon="placeholders-list"></svg-vue>
                                    <div class="w-full font-semibold text-2xl">{{ $t('No records found') }}</div>
                                    <div>{{ $t('Try changing the filters, or rephrasing your search') }}</div>
                                </div>
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
                </template>
                <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div class="hidden sm:block">
                        <p class="text-sm leading-5 text-gray-700">
                            {{ $t('Showing') }}
                            <span class="font-medium">{{ (pagination.perPage * pagination.currentPage) - pagination.perPage + 1 }}</span>
                            {{ $t('to') }}
                            <span class="font-medium">{{ pagination.perPage * pagination.currentPage <= pagination.total ? pagination.perPage * pagination.currentPage : pagination.total }}</span>
                            {{ $t('of') }}
                            <span class="font-medium">{{ pagination.total }}</span>
                            {{ $t('results') }}
                        </p>
                    </div>
                    <div class="flex-1 flex justify-between sm:justify-end">
                        <button
                            :class="pagination.currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''"
                            :disabled="pagination.currentPage <= 1"
                            class="pagination-link"
                            type="button"
                            @click="changePage(pagination.currentPage - 1)"
                        >
                            {{ $t('Previous') }}
                        </button>
                        <button
                            :class="pagination.currentPage >= pagination.totalPages ? 'opacity-50 cursor-not-allowed' : ''"
                            :disabled="pagination.currentPage >= pagination.totalPages"
                            class="ml-3 pagination-link"
                            type="button"
                            @click="changePage(pagination.currentPage + 1)"
                        >
                            {{ $t('Next') }}
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    </main>
</template>

<script>
import IncidentImpactIcon from "@/components/elements/incident/incident-impact-icon";
import ComponentStatusIcon from "@/components/elements/component/component-status-icon";

export default {
    name: "list-incident",
    components: {ComponentStatusIcon, IncidentImpactIcon},
    metaInfo() {
        return {
            title: this.$i18n.t('Incidents')
        }
    },
    data() {
        return {
            filter: {
                search: null,
                status: 'open',
                type: 1,
            },
            page: 1,
            perPage: 10,
            loading: true,
            pagination: {
                currentPage: 0,
                perPage: 0,
                total: 0,
                totalPages: 0
            },
            incidentsList: [],
        }
    },
    mounted() {
        this.getIncidents();
    },
    filters: {
        momentFormatDateTimeAgo: function (value) {
            return moment(value).locale(window.app.app_date_locale).fromNow();
        },
    },
    methods: {
        changePage(page) {
            const self = this;
            if ((page > 0) && (page <= self.pagination.totalPages) && (page !== self.page)) {
                self.page = page;
                self.getIncidents();
            }
        },
        getIncidents() {
            const self = this;
            self.loading = true;
            axios.get('api/dashboard/incidents', {
                params: {
                    page: self.page,
                    sort: self.sort,
                    perPage: self.perPage,
                    search: self.filter.search,
                    status: self.filter.status,
                    type: self.filter.type,
                }
            }).then(function (response) {
                self.incidentsList = response.data.items;
                self.pagination = response.data.pagination;
                if (self.pagination.totalPages < self.pagination.currentPage) {
                    self.page = self.pagination.totalPages;
                    self.getIncidents();
                } else {
                    self.loading = false;
                }
            }).catch(function () {
                self.loading = false;
            });
        },
    }
}
</script>
