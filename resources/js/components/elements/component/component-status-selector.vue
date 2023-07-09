<template>
    <div v-on-clickaway="closeMenu" class="relative">
        <div class="inline-block w-full rounded-md shadow-sm cursor-pointer">
            <button
                aria-expanded="true"
                aria-haspopup="listbox"
                aria-labelledby="listbox-label"
                class="relative w-full rounded-md border border-gray-400 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                type="button"
                @click="open = !open"
            >
                <template>
                    <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0 inline-block">
                            <component-status-icon :status="status"></component-status-icon>
                        </div>
                        <template v-if="status === 1">
                            <span class="block truncate">{{ $t('Operational') }}</span>
                        </template>
                        <template v-else-if="status === 2">
                            <span class="block truncate">{{ $t('Under maintenance') }}</span>
                        </template>
                        <template v-else-if="status === 3">
                            <span class="block truncate">{{ $t('Degraded performance') }}</span>
                        </template>
                        <template v-else-if="status === 4">
                            <span class="block truncate">{{ $t('Partial outage') }}</span>
                        </template>
                        <template v-else-if="status === 5">
                            <span class="block truncate">{{ $t('Major outage') }}</span>
                        </template>
                    </div>
                </template>
                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 20 20"><path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>
                </span>
            </button>
        </div>
        <div v-show="open" class="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg">
            <ul
                class="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                role="listbox"
                tabindex="-1"
            >
                <li
                    id="listbox-item-1" class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9" role="option" @click="selectOption(1)">
                    <div class="flex items-center space-x-3">
                        <span class="flex-shrink-0 inline-block">
                            <component-status-icon :status="1"></component-status-icon>
                        </span>
                        <span :class="status === 1 ? 'font-semibold' : 'font-normal'" class="font-normal block truncate">
                            {{ $t('Operational') }}
                        </span>
                    </div>
                </li>
                <li
                    id="listbox-item-2" class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9" role="option" @click="selectOption(2)">
                    <div class="flex items-center space-x-3">
                        <span class="flex-shrink-0 inline-block">
                            <component-status-icon :status="2"></component-status-icon>
                        </span>
                        <span :class="status === 2 ? 'font-semibold' : 'font-normal'" class="font-normal block truncate">
                            {{ $t('Under maintenance') }}
                        </span>
                    </div>
                </li>
                <li
                    id="listbox-item-3" class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9" role="option" @click="selectOption(3)">
                    <div class="flex items-center space-x-3">
                        <span class="flex-shrink-0 inline-block">
                            <component-status-icon :status="3"></component-status-icon>
                        </span>
                        <span :class="status === 3 ? 'font-semibold' : 'font-normal'" class="font-normal block truncate">
                            {{ $t('Degraded performance') }}
                        </span>
                    </div>
                </li>
                <li
                    id="listbox-item-4" class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9" role="option" @click="selectOption(4)">
                    <div class="flex items-center space-x-3">
                        <span class="flex-shrink-0 inline-block">
                            <component-status-icon :status="4"></component-status-icon>
                        </span>
                        <span :class="status === 4 ? 'font-semibold' : 'font-normal'" class="font-normal block truncate">
                            {{ $t('Partial outage') }}
                        </span>
                    </div>
                </li>
                <li
                    id="listbox-item-5" class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9" role="option" @click="selectOption(5)">
                    <div class="flex items-center space-x-3">
                        <span class="flex-shrink-0 inline-block">
                            <component-status-icon :status="5"></component-status-icon>
                        </span>
                        <span :class="status === 5 ? 'font-semibold' : 'font-normal'" class="font-normal block truncate">
                            {{ $t('Major outage') }}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mixin as clickaway} from 'vue-clickaway';
import ComponentStatusIcon from "@/components/elements/component/component-status-icon";

export default {
    name: "component-status-selector",
    components: {ComponentStatusIcon},
    mixins: [clickaway],
    props: {
        value: {type: Number}
    },
    computed: {
        status: {
            get() {
                return this.value
            },
            set(status) {
                this.$emit('input', status)
            }
        }
    },
    data() {
        return {
            open: false,
        }
    },
    methods: {
        closeMenu() {
            this.open = false;
        },
        selectOption(option) {
            this.status = option;
            this.closeMenu();
        }
    }
}
</script>
