<template>
    <div>
        <svg-vue v-show="status === 1" :class="'h-'+size+' w-'+size" class="text-green-600" icon="check-circle-solid"></svg-vue>
        <svg-vue v-show="status === 2" :class="'h-'+size+' w-'+size" class="text-blue-600" icon="pause-circle-solid"></svg-vue>
        <svg-vue v-show="status === 3" :class="'h-'+size+' w-'+size" class="text-yellow-500" icon="minus-circle-solid"></svg-vue>
        <svg-vue v-show="status === 4" :class="'h-'+size+' w-'+size" class="text-orange-500" icon="exclamation-circle-solid"></svg-vue>
        <svg-vue v-show="status === 5" :class="'h-'+size+' w-'+size" class="text-red-600" icon="times-circle-solid"></svg-vue>
    </div>
</template>

<script>
export default {
    name: "component-status-icon",
    props: {
        status: {
            type: Number,
            required: true,
        },
        size: {
            type: String,
            default: '5',
        },
    }
}
</script>
