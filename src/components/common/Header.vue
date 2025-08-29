<template>
    <div class="header">
        <el-header>
            <div class="title">学生管理系统</div>
            <div class="h-item">
                <div class="toweb" @click="toWebsite">商城首页</div>
                <div class="user">{{ name }}</div>
            </div>
        </el-header>
    </div>
</template>
<script>
import { getToken } from '@/utils/setToken.js';
export default {
    data() {
        return {
            name: ''
        }
    },
    created() {
        this.name = getToken('username');
    },
    methods:{
        toWebsite(){
            this.$router.push('/index');
        }
    }
}
</script>
<style lang="scss">
.header {
    .el-header {
        background: #2578b5;
        color: #fff;
        line-height: 60px;
        display: flex;
        justify-content: space-between;

        .title {
            width: 200px;
            font-size: 24px;
        }
        .h-item{
            display: flex;
            justify-content: space-around;
            align-items: center;
            div{
                margin-right: 20px;
                cursor: pointer;
            }
            .toweb{
                text-decoration: underline;
            }
            .user{
                margin-left: 10px;
            }
        }
    }
}
</style>