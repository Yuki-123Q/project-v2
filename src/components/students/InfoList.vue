<template>
    <div class="info-list">
        <el-form :inline="true" class="demo-form-inline" size="small">
            <el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                </el-form-item>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="compData" border style="width: 100%">
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="sex_text" label="性别" align="center"></el-table-column>
            <el-table-column prop="age" label="年龄" align="center"></el-table-column>
            <el-table-column prop="father" label="父亲" align="center"></el-table-column>
            <el-table-column prop="mother" label="母亲" align="center"></el-table-column>
            <el-table-column prop="address" label="家庭住址" align="center"></el-table-column>
            <el-table-column prop="entryTime" label="入校时间" align="center"></el-table-column>
            <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
            <el-table-column label="操作" width="120px" fixed="right">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" icon="el-icon-edit" @click="modify(scope.row)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete"
                        @click="deleteInfo(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <el-dialog :title="state ? '添加学生信息' : '修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
            <el-form :rules="rules" :model="form" ref="form">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                    <el-radio v-model="form.sex" label="1">男</el-radio>
                    <el-radio v-model="form.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
                    <el-input v-model="form.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父亲" :label-width="formLabelWidth" prop="father">
                    <el-input v-model="form.father" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="母亲" :label-width="formLabelWidth" prop="mother">
                    <el-input v-model="form.mother" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入学时间" :label-width="formLabelWidth" prop="entryTime">
                    <el-date-picker v-model="form.entryTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-mm-dd"
                        align="right" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="ok()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getData, updateData, deleteData } from '@/utils/table';
export default {
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            currentPage: 1,//当前页数
            pageSize: 10,//每页显示条数
            total: 0,//总条数
            state: true,
            formLabelWidth: '80px',
            formInline: {
                user: '',
                region: ''
            },
            form: {
                name: '',
                sex: '1',
                age: '',
                father: '',
                mother: '',
                address: '',
                entryTime: '',
                phone: '',
            },
            rules: {
                name: [{ required: true, message: '请输入姓名' }],
                sex: [{ required: true }],
                age: [{ required: true, message: '请输入年龄' }],
                address: [{ required: true, message: '请输入地址' }],
                entryTime: [{ required: true, message: '请选择入学时间' }],
                phone: [{ required: true, message: '请输入联系方式' }],
            }
        }
    },
    computed: {
        compData() {
            return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        }
    },
    created() {
        this.getInfos();
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        reset() {
            this.formInline = {
                user: '',
                region: ''
            };
            this.getInfos();
        },
        query() {
            getData(this,'/info', { user: this.formInline.user });
        },
        add() {
            this.form = {
                name: '',
                sex: '1',
                age: '',
                father: '',
                mother: '',
                address: '',
                entryTime: '',
                phone: '',
            };
            this.state = true;
            this.dialogFormVisible = true;
        },
        ok() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const method = this.state ? 'post' : 'put';
                    updateData(this, method, '/info', this.form, this.getInfos);
                    this.$refs.form.resetFields();
                }else{
                    console.error(this.form)
                }
            })
        },
        cancel() {
            this.dialogFormVisible = false;
            this.$refs.form.resetFields();
        },
        deleteInfo(row) {
            deleteData(this, '/info', row.id, this.getInfos);
        },
        modify(row) {
            this.form = { ...row };
            this.state = false;
            this.dialogFormVisible = true;
        },
        getInfos() {
            getData(this, '/info');
        }
    }
}
</script>
<style lang="scss">
.info-list {

    .demo-form-inline,
    .el-form-item {
        text-align: left;
    }

    .demo-form-inline {
        display: flex;
        justify-content: space-between;
    }

    .el-pagination {
        margin-top: 20px;
    }
}
</style>