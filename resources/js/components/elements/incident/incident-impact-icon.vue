<template>
    <div>
        <span v-show="impact === 1" :class="'h-'+size+' w-'+size" class="bg-green-600 flex-shrink-0 inline-block rounded-full"></span>
        <span v-show="impact === 2" :class="'h-'+size+' w-'+size" class="bg-yellow-500 flex-shrink-0 inline-block rounded-full"></span>
        <span v-show="impact === 3" :class="'h-'+size+' w-'+size" class="bg-orange-500 flex-shrink-0 inline-block rounded-full"></span>
        <span v-show="impact === 4" :class="'h-'+size+' w-'+size" class="bg-red-600 flex-shrink-0 inline-block rounded-full"></span>
    </div>
</template>

<script>
export default {
    name: "incident-impact-icon",
    props: {
        impact: {
            type: Number,
            required: true,
        },
        size: {
            type: String,
            default: '2',
        },
    }
}
</script>
