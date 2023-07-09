<template>
    <div>
        <template v-if="status === 1">
            <span class="text-sm text-green-600">
                {{ $t('Operational') }}
            </span>
        </template>
        <template v-else-if="status === 2">
            <span class="text-sm text-blue-600">
                {{ $t('Under maintenance') }}
            </span>
        </template>
        <template v-else-if="status === 3">
            <span class="text-sm text-yellow-500">
                {{ $t('Degraded performance') }}
            </span>
        </template>
        <template v-else-if="status === 4">
            <span class="text-sm text-orange-500">
                {{ $t('Partial outage') }}
            </span>
        </template>
        <template v-else-if="status === 5">
            <span class="text-sm text-red-600">
                {{ $t('Major outage') }}
            </span>
        </template>
    </div>
</template>

<script>
export default {
    name: "component-status-text",
    props: {
        status: {
            type: Number,
            required: true,
        },
    }
}
</script>
