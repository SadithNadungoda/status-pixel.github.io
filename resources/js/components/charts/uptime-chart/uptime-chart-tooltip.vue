<template>
    <div class="w-64">
        <div class="text-xs font-semibold mb-2 px-1">{{ date | momentFormat }}</div>
        <template v-if="incidents.length > 0">
            <div v-if="resume === 'blue'" class="px-2 py-2 mb-3 text-sm font-medium bg-gray-200 flex">
                <component-status-icon :status="2"></component-status-icon>
                <span class="ml-3 inline-block align-middle">{{ $t('Scheduled maintenance') }}</span>
            </div>
            <div v-else-if="resume === 'yellow'" class="px-2 py-2 mb-3 text-sm font-medium bg-gray-200 flex">
                <component-status-icon :status="3"></component-status-icon>
                <span class="ml-3 inline-block align-middle">{{ $t('Degraded performance') }}</span>
            </div>
            <div v-else-if="resume === 'orange'" class="px-2 py-2 mb-3 text-sm font-medium bg-gray-200 flex">
                <component-status-icon :status="4"></component-status-icon>
                <span class="ml-3 inline-block align-middle">{{ $t('Partial outage') }}</span>
            </div>
            <div v-else-if="resume === 'red'" class="px-2 py-2 mb-3 text-sm font-medium bg-gray-200 flex">
                <component-status-icon :status="5"></component-status-icon>
                <span class="ml-3 inline-block align-middle">{{ $t('Major outage') }}</span>
            </div>
            <div class="px-1 mb-1 text-sm font-medium uppercase">{{ $t('Related') }}</div>
            <ul class="list-none px-1 list-inside text-xs">
                <template v-for="incident in incidents">
                    <li>
                        <a :href="'/incidents/' + incident.uuid" class="text-blue-600 cursor-pointer" target="_blank">
                            {{ incident.name }}
                        </a>
                    </li>
                </template>
            </ul>
        </template>
        <template v-else-if="resume !== 'gray'">
            <div class="px-1 text-sm">{{ $t('No incident recorded on this day') }}.</div>
        </template>
        <template v-else>
            <div class="px-1 text-sm">{{ $t('No data exists for this day') }}.</div>
        </template>
    </div>
</template>

<script>
import ComponentStatusIcon from "@/components/elements/component/component-status-icon";

export default {
    name: "uptime-chart-tooltip",
    components: {ComponentStatusIcon},
    props: {
        date: String,
        resume: String,
        incidents: Array,
    },
    filters: {
        momentFormat: function (value) {
            return moment(value).locale(window.app.app_date_locale).format(window.app.app_date_format);
        }
    },
}
</script>
