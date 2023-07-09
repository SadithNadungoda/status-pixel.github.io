<template>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <vue-element-loading :active="stats.open_incidents == null"/>
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        <svg-vue class="h-6 w-6 text-white" icon="times-circle-duotone"></svg-vue>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                                {{ $t('Open incidents') }}
                            </dt>
                            <dd class="flex items-baseline">
                                <div class="text-2xl leading-8 font-semibold text-gray-900">
                                    {{ stats.open_incidents ? stats.open_incidents : 0 }}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <vue-element-loading :active="stats.incidents == null"/>
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        <svg-vue class="h-6 w-6 text-white" icon="exclamation-square-duotone"></svg-vue>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                                {{ $t('Total incidents') }}
                            </dt>
                            <dd class="flex items-baseline">
                                <div class="text-2xl leading-8 font-semibold text-gray-900">
                                    {{ stats.incidents ? stats.incidents : 0 }}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <vue-element-loading :active="stats.scheduled_maintenance == null"/>
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        <svg-vue class="h-6 w-6 text-white" icon="sliders-h-square-duotone"></svg-vue>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                                {{ $t('Scheduled maintenances') }}
                            </dt>
                            <dd class="flex items-baseline">
                                <div class="text-2xl leading-8 font-semibold text-gray-900">
                                    {{ stats.scheduled_maintenance ? stats.scheduled_maintenance : 0 }}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <vue-element-loading :active="stats.components == null"/>
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        <svg-vue class="h-6 w-6 text-white" icon="shapes-duotone"></svg-vue>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
                                {{ $t('Total components') }}
                            </dt>
                            <dd class="flex items-baseline">
                                <div class="text-2xl leading-8 font-semibold text-gray-900">
                                    {{ stats.components ? stats.components : 0 }}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "stats",
    data() {
        return {
            stats: {
                open_incidents: null,
                incidents: null,
                scheduled_maintenance: null,
                components: null,
            }
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            const self = this;
            axios.get('api/dashboard/stats/count').then(function (response) {
                self.stats = response.data;
            });
        }
    },
}
</script>
