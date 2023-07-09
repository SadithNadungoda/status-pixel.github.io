<template>
    <div class="grid grid-cols-1 gap-6">
        <vue-element-loading :active="false"/>
        <div class="flex flex-col bg-white rounded-lg shadow">
            <div class="p-4">
                <div class="font-semibold">
                    {{ $t('Opened and closed incidents this year') }}
                </div>
            </div>
            <div class="p-4">
                <vue-element-loading :active="loading"/>
                <line-chart ref="chart" :chart-data="chartData" :height="350"></line-chart>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from "@/components/charts/line-chart";

export default {
    name: "open-closed-incidents",
    components: {LineChart},
    data() {
        return {
            loading: true,
            chartData: {
                labels: [
                    this.$t('Jan'), this.$t('Feb'), this.$t('Mar'), this.$t('Apr'), this.$t('May'), this.$t('Jun'), this.$t('Jul'), this.$t('Aug'), this.$t('Sept'), this.$t('Oct'), this.$t('Nov'), this.$t('Dec')
                ],
                datasets: [
                    {
                        label: this.$i18n.t('Opened incidents'),
                        backgroundColor: 'transparent',
                        borderColor: '#48BB78',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: this.$i18n.t('Closed incidents'),
                        backgroundColor: 'transparent',
                        borderColor: '#E53E3E',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: this.$i18n.t('Scheduled maintenances'),
                        backgroundColor: 'transparent',
                        borderColor: '#4299E1',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                ],
            }
        }
    },
    computed: {
        datasets() {
            return this.chartData.datasets[0].data
        }
    },
    watch: {
        datasets() {
            this.$refs.chart.update();
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            const self = this;
            self.loading = true;
            axios.get('api/dashboard/stats/open-closed-incidents').then(function (response) {
                self.chartData.datasets[0].data = response.data.opened_incidents;
                self.chartData.datasets[1].data = response.data.closed_incidents;
                self.chartData.datasets[2].data = response.data.scheduled_maintenances;
                self.loading = false;
            });
        }
    },
}
</script>
