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
                        <template v-if="impact === 1">
                            <incident-impact-icon :impact="impact"/>
                            <span class="block truncate">{{ $t('None') }}</span>
                        </template>
                        <template v-else-if="impact === 2">
                            <incident-impact-icon :impact="impact"/>
                            <span class="block truncate">{{ $t('Minor') }}</span>
                        </template>
                        <template v-else-if="impact === 3">
                            <incident-impact-icon :impact="impact"/>
                            <span class="block truncate">{{ $t('Mayor') }}</span>
                        </template>
                        <template v-else-if="impact === 4">
                            <incident-impact-icon :impact="impact"/>
                            <span class="block truncate">{{ $t('Critical') }}</span>
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
                        <span class="bg-green-600 flex-shrink-0 inline-block h-2 w-2 rounded-full"></span>
                        <span :class="impact === 1 ? 'font-semibold' : 'font-normal'" class="font-normal block truncate">
                            {{ $t('None') }}
                        </span>
                    </div>
                </li>
                <li
                    id="listbox-item-2" class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9" role="option" @click="selectOption(2)">
                    <div class="flex items-center space-x-3">
                        <span class="bg-yellow-500 flex-shrink-0 inline-block h-2 w-2 rounded-full"></span>
                        <span :class="impact === 2 ? 'font-semibold' : 'font-normal'" class="font-normal block truncate">
                            {{ $t('Minor') }}
                        </span>
                    </div>
                </li>
                <li
                    id="listbox-item-3" class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9" role="option" @click="selectOption(3)">
                    <div class="flex items-center space-x-3">
                        <span class="bg-orange-500 flex-shrink-0 inline-block h-2 w-2 rounded-full"></span>
                        <span :class="impact === 3 ? 'font-semibold' : 'font-normal'" class="font-normal block truncate">
                            {{ $t('Mayor') }}
                        </span>
                    </div>
                </li>
                <li
                    id="listbox-item-4" class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9" role="option" @click="selectOption(4)">
                    <div class="flex items-center space-x-3">
                        <span class="bg-red-600 flex-shrink-0 inline-block h-2 w-2 rounded-full"></span>
                        <span :class="impact === 4 ? 'font-semibold' : 'font-normal'" class="font-normal block truncate">
                            {{ $t('Critical') }}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mixin as clickaway} from "vue-clickaway";
import IncidentImpactIcon from "@/components/elements/incident/incident-impact-icon";

export default {
    name: "incident-impact-selector",
    components: {IncidentImpactIcon},
    mixins: [clickaway],
    props: {
        value: {type: Number}
    },
    computed: {
        impact: {
            get() {
                return this.value
            },
            set(impact) {
                this.$emit('input', impact)
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
            this.impact = option;
            this.closeMenu();
        }
    }
}
</script>
