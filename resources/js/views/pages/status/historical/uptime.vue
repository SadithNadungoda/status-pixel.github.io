<template>
    <div class="min-h-screen bg-gray-100">
        <navbar/>
        <main>
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                // CONTENT
            </div>
        </main>
    </div>
</template>

<script>
import Navbar from "@/components/layout/shared/navbar";

export default {
    name: "uptime",
    components: {Navbar},
    metaInfo() {
        return {
            title: this.$i18n.t('Uptime history'),
            titleTemplate: '%s - ' + this.$store.state.settings.name
        }
    },
    data() {
        return {
            loading: true
        }
    },
}
</script>
