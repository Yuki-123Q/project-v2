<template>
    <div class="work-list">
        <el-table ref="table" :data="workData" border style="width: 100%">
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="classId" label="所属班级" align="center"></el-table-column>
            <el-table-column prop="completedText" label="作业完成情况" align="center"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
import { getWorkListData } from '@/utils/table';
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
        }

    },
    created() {
        getWorkListData(this, '/work', {});
    },
    computed: {
        workData() {
            return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        handleSizeChange(val) {
            this.pageSize = val;
        }
    }
}
</script>
<style lang="scss">
.work-list {
    .el-pagination {
        margin-top: 20px;
    }
}
</style>