<template>
    <main class="flex-1 relative overflow-y-auto py-6 focus:outline-none" tabindex="0">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 px-5">
            <div class="md:flex md:items-center md:justify-between">
                <div class="flex-1 min-w-0">
                    <h1 class="text-2xl font-semibold text-gray-900">{{ $t('Components') }}</h1>
                </div>
                <div class="mt-4 flex md:mt-0 md:ml-4">
                    <router-link
                        class="btn btn-blue shadow-sm rounded-md"
                        to="/dashboard/admin/components/new"
                    >
                        {{ $t('Create component') }}
                    </router-link>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="my-6 bg-white shadow overflow-hidden sm:rounded-md">
                <vue-element-loading :active="loading"/>
                <template v-if="componentsList.length > 0">
                    <draggable v-model="componentsList" class="components-draggable" tag="ul" @end="drag = false" @sort="changeOrder" @start="drag = true">
                        <transition-group :name="!drag ? 'flip-list' : null" type="transition">
                            <template v-for="(component, index) in componentsList">
                                <li :key="component.order" :class="{'border-t border-gray-200': index !== 0 || drag}">
                                    <router-link
                                        :class="!drag ? 'hover:bg-gray-100 focus:outline-none focus:bg-gray-100' : null"
                                        :to="'/dashboard/admin/components/' + component.id + '/edit'"
                                        class="block transition duration-150 ease-in-out"
                                    >
                                        <div class="flex items-center px-4 py-4 sm:px-6">
                                            <div class="min-w-0 flex-1 flex items-center">
                                                <div class="flex-shrink-0">
                                                    <component-status-icon :status="component.status"/>
                                                </div>
                                                <div class="min-w-0 flex-1 px-4 lg:grid lg:grid-cols-2 lg:gap-4">
                                                    <div class="flex">
                                                        <div class="inline-block align-middle">{{ component.name }}</div>
                                                        <div class="ml-3">
                                                            <svg-vue v-if="component.display_uptime" class="h-4 w-4 text-gray-600 inline-block align-middle" icon="chart-bar-regular"></svg-vue>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mr-4 cursor-move">
                                                <svg-vue class="h-5 w-5 text-gray-400" icon="grip-vertical-solid"></svg-vue>
                                            </div>
                                            <div>
                                                <svg-vue class="h-5 w-5 text-gray-400" icon="angle-right-regular"></svg-vue>
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </template>
                        </transition-group>
                    </draggable>
                </template>
                <template v-else-if="!loading">
                    <div class="h-full flex">
                        <div class="m-auto">
                            <div class="h-full w-full text-center items-center p-6">
                                <svg-vue class="h-full md:h-64 mb-6" icon="browsing"></svg-vue>
                                <div class="w-full font-semibold text-2xl">{{ $t('No records found') }}</div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </main>
</template>

<script>
import draggable from 'vuedraggable';
import ComponentStatusIcon from "@/components/elements/component/component-status-icon";

export default {
    name: "list-component",
    components: {ComponentStatusIcon, draggable},
    metaInfo() {
        return {
            title: this.$i18n.t('Components')
        }
    },
    data() {
        return {
            drag: false,
            loading: true,
            componentsList: [],
        }
    },
    mounted() {
        this.getComponents();
    },
    methods: {
        getComponents() {
            const self = this;
            self.loading = true;
            axios.get('api/dashboard/admin/components').then(function (response) {
                self.componentsList = response.data.items;
                self.loading = false;
            }).catch(function () {
                self.loading = false;
            });
        },
        changeOrder() {
            const self = this;
            axios.post('api/dashboard/admin/components/order', {components: self.componentsList}).then(function (response) {
                self.$notify({
                    title: self.$i18n.t('Success').toString(),
                    text: self.$i18n.t('Data updated correctly').toString(),
                    type: 'success'
                });
            });
        },
    }
}
</script>

<style lang="scss">
.flip-list-move {
    @apply transition duration-150;
}

.no-move {
    @apply transition-none;
}

.ghost {
    @apply opacity-50;
    background: red;
}
</style>
