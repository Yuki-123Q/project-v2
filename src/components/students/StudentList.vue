<template>
  <div class="student-list">
    <!-- 查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item label="姓名">
        <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="table" :data="compData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="number" label="学号" align="center"></el-table-column>
      <el-table-column prop="class" label="班级" align="center"></el-table-column>
      <el-table-column prop="state_text" label="状态" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteClick(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { deleteData, getData } from '@/utils/table';
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,//当前页数
      pageSize: 10,//每页显示条数
      total: 0,//总条数
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  created() {
    this.getStudentsData();
  },
  computed: {
    compData() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getStudentsData(params) {
      getData(this, '/users',params);
    },
    deleteClick(row) {
      deleteData(this, '/student', row.id, this.getStudentsData);
    },
    query() {
      this.getStudentsData({ type: 'query', user: this.formInline.user });
    },
    reset() {
      this.getStudentsData({ type: 'reset' });
      this.formInline = {
        user: '',
        region: ''
      };
    },
  }
}
</script>
<style lang="scss">
.student-list {

  .demo-form-inline,
  .el-form-item {
    text-align: left;
  }

  .el-pagination {
    margin-top: 20px;
  }
}
</style>