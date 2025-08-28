<template>
    <div class="dataView">
        <el-card>
            <div id="main1">

            </div>
        </el-card>
        <el-card>
            <div id="main2">

            </div>
        </el-card>
    </div>
</template>
<script>
import { GetDataView } from '@/api/api';
export default {
    data() {
        return {

        }
    },
    created() {
        GetDataView().then(res => {
            if (res.data.status === 200) {
                let { legend, xAxis, series } = res.data.data;
                this.draw(legend, xAxis, series);
            } else {
                this.$message.error(res.data.message);
            }
        }).catch(e => {
            this.$message.error(e);
        })
    },
    mounted() {
        let myChart = this.$echarts.init(document.getElementById('main1'));
        myChart.setOption({
            title: {
                text: '各班级学生数量'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [{
                name: '人数',
                type: 'pie',
                data: [
                    {
                        value: 32,
                        name: '一班'
                    },
                    {
                        value: 35,
                        name: '二班'
                    },
                    {
                        value: 34,
                        name: '三班'
                    },
                    {
                        value: 36,
                        name: '四班'
                    },
                    {
                        value: 40,
                        name: '五班'
                    }
                ]
            }]
        });

    },
    methods: {
        draw(legend, xAxis, series) {
            let myChart = this.$echarts.init(document.getElementById('main2'));
            let option = {
                title: {
                    text: '作业完成情况'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: legend
                },
                xAxis: {
                    data: xAxis
                },
                yAxis: {
                    type: 'value'
                },
                series: series
            };
            myChart.setOption(option);
        }
    }
}
</script>
<style lang="scss">
.dataView {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 50%;

        #main1,
        #main2 {
            height: 500px;
        }
    }
}
</style>