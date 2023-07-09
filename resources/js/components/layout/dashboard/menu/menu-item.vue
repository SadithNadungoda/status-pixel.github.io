<template>
    <router-link
        :class="mobile ? 'router-link router-link-mobile' : 'router-link router-link-desktop'"
        :to="to"
    >
        <svg-vue
            :icon="icon"
            class="mr-3 w-5 h-5 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
        ></svg-vue>
        {{ label }}
    </router-link>
</template>

<script>
export default {
    name: "menu-item",
    props: {
        mobile: {
            type: Boolean,
            default: false,
        },
        to: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    }
}
</script>
