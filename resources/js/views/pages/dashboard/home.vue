<template>
    <main class="flex-1 relative overflow-y-auto py-6 focus:outline-none" tabindex="0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-gray-900">{{ $t('Dashboard') }}</h1>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <template v-if="$store.state.permissions && $store.state.permissions['App.Http.Controllers.Api.Dashboard.StatsController']">
                <div class="py-4">
                    <stats></stats>
                </div>
                <div class="py-4">
                    <open-closed-incidents></open-closed-incidents>
                </div>
            </template>
        </div>
    </main>
</template>

<script>
import Stats from "@/components/widgets/stats";
import OpenClosedIncidents from "@/components/widgets/open-closed-incidents";

export default {
    name: "home",
    metaInfo() {
        return {
            title: this.$i18n.t('Dashboard')
        }
    },
    components: {OpenClosedIncidents, Stats}
}
</script>
