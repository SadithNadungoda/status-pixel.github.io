<template>
    <div class="my-2">
        <svg
            id="uptime-graph"
            :viewBox="windowWidth === 'lg' ? '0 0 448 34' : windowWidth === 'md' ? '150 0 298 34' : '300 0 148 34'"
            class="w-full"
            height="34"
            preserveAspectRatio="none"
        >
            <template v-if="Object.keys(incidences).length > 0">
                <template v-for="(incidents, date, index) in incidences">
                    <rect
                        v-tooltip.bottom="{content: tooltipContent(date, incidents.resume, incidents.list), html: true, autoHide: false}"
                        :class="'day-'+index+' uptime-day-'+incidents.resume"
                        :x="index * 5"
                        class="uptime-day cursor-pointer"
                        data-html="true"
                        height="34"
                        width="3"
                        y="0"
                    />
                </template>
            </template>
            <template v-for="(key, index) in new Array(90)" v-else>
                <rect
                    :class="'day-'+index+' uptime-day-green'"
                    :x="index * 5"
                    class="uptime-day"
                    data-html="true"
                    height="34"
                    width="3"
                    y="0"
                />
            </template>
        </svg>
        <div class="flex text-sm">
            <div class="text-gray-600">
                <span v-if="windowWidth === 'lg'">90</span>
                <span v-else-if="windowWidth === 'md'">60</span>
                <span v-else>30</span>
                {{ $t('days ago') }}
            </div>
            <div class="flex-grow bg-gray-400 mx-4 mt-3" style="height: 1px;"></div>
            <div class="text-right text-gray-600">{{ $t('Today') }}</div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import UptimeChartTooltip from "@/components/charts/uptime-chart/uptime-chart-tooltip";

export default {
    name: "uptime-chart",
    props: {
        incidences: {
            required: true,
            type: Object
        }
    },
    mounted() {
        this.getWindowWidth();
        this.$nextTick(function () {
            window.addEventListener('resize', this.getWindowWidth);
        });
    },
    data() {
        return {
            windowWidth: 'lg',
        }
    },
    methods: {
        getWindowWidth() {
            let windowWidth = document.documentElement.clientWidth;
            if (windowWidth > 1024) {
                this.windowWidth = 'lg';
            } else if (windowWidth > 600) {
                this.windowWidth = 'md';
            } else {
                this.windowWidth = 'sm';
            }
        },
        tooltipContent(date, resume, incidents) {
            return new Vue({...UptimeChartTooltip, parent: this, propsData: {date: date, resume: resume, incidents: incidents}}).$mount().$el.outerHTML;
        }
    }
}
</script>

<style lang="scss">
.tooltip {
    @apply mt-2;
    @apply z-10;

    .tooltip-inner {
        @apply p-4 bg-white text-gray-800 border shadow rounded border-solid border-gray-300;
    }

    .tooltip-arrow {
        position: absolute;
        top: 0;
        width: 0;
        height: 0;
        border-width: 0 9px 9px;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
        border-right-color: transparent;
        border-left-color: transparent;
        border-image: initial;
        border-bottom-color: white;
        border-top-style: initial;
        border-top-color: initial;
        margin-left: 0;
        margin-top: -7px;
    }
}

.uptime-day {
    &:hover {
        fill: theme('colors.gray.700');
    }

    &:not(:hover) {
        &.uptime-day-gray {
            fill: theme('colors.gray.500');
        }

        &.uptime-day-blue {
            fill: theme('colors.blue.500');
        }

        &.uptime-day-green {
            fill: theme('colors.green.600');
        }

        &.uptime-day-yellow {
            fill: theme('colors.yellow.400');
        }

        &.uptime-day-orange {
            fill: theme('colors.orange.600');
        }

        &.uptime-day-red {
            fill: theme('colors.red.600');
        }
    }
}
</style>
