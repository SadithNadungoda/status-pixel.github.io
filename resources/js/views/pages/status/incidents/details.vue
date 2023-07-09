<template>
    <div class="min-h-screen bg-gray-100">
        <navbar/>
        <main>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <vue-element-loading :active="loading"/>
                <div
                    :class="incident.type === 1 ? incident.impact === 1 ? 'border-green-600' : incident.impact === 2 ? 'border-yellow-500' : incident.impact === 3 ? 'border-orange-500' : 'border-red-600' : 'border-blue-600'"
                    class="bg-white overflow-hidden my-10 border"
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
                            {{ history.created_at | momentFormatDateTimeAgo }}
                        </div>
                    </div>
                    <div
                        :class="incident.type === 1 ? incident.impact === 1 ? 'border-green-600' : incident.impact === 2 ? 'border-yellow-500' : incident.impact === 3 ? 'border-orange-500' : 'border-red-600' : 'border-blue-600'"
                        class="px-4 py-5 border-t text-sm"
                    >
                        <span class="font-medium">{{ $t('Affected components') }}:</span>
                        <div class="md:flex max-w-full mr-6">
                            <template v-for="component in  incident.components">
                                <div class="mt-2 flex items-center text-sm leading-5 text-gray-600 mr-2">
                                    <component-status-icon :status="component.status" size="4"/>
                                    <span class="ml-1 whitespace-no-wrap">{{ component.name }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="py-5 md:px-0 border-t">
                    <router-link class="text-blue-600 cursor-pointer" to="/">← {{ $t('Current status') }}</router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Navbar from "@/components/layout/shared/navbar";
import ComponentStatusIcon from "@/components/elements/component/component-status-icon";

export default {
    name: "incident-details",
    components: {ComponentStatusIcon, Navbar},
    metaInfo() {
        return {
            title: this.incident.name,
            titleTemplate: '%s - ' + this.$store.state.settings.name
        }
    },
    data() {
        return {
            loading: true,
            incident: []
        }
    },
    mounted() {
        this.getIncident();
    },
    filters: {
        momentFormatDateTimeAgo: function (value) {
            return moment(value).locale(window.app.app_date_locale).fromNow();
        },
    },
    methods: {
        getIncident() {
            const self = this;
            self.loading = true;
            axios.get('api/status/incidents/' + self.$route.params.uuid).then(function (response) {
                self.incident = response.data;
                self.loading = false;
            }).catch(function () {
                self.$router.push('/404');
            });
        }
    }
}
</script>
