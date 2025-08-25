<template>
    <div class="w-header">
        <el-header>
            <div>图书商城</div>
            <div class="w_header_right">
                <el-input v-model="searchText" placeholder="请输入搜索内容">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <div>用户</div>
            </div>
        </el-header>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchText: ''
        }
    }
}
</script>
<style lang="scss">
.w-header {
    background: #e72106;
    color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2000;

    .el-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .w_header_right {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .el-input {
            width: 300px;
            margin-right: 30px;

            .el-input__icon {
                line-height: 30px;
                cursor: pointer;
            }

            .el-input__inner {
                border-radius: 18px;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
            }
        }
    }
}
</style>