<template>
    <div class="header">
        <el-header>
            <div class="title">学生管理系统</div>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ name }}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="shop">网上商城</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
    </div>
</template>
<script>
import { getToken, removeToken } from '@/utils/setToken.js';
export default {
    data() {
        return {
            name: ''
        }
    },
    created() {
        this.name = getToken('username');
    },
    methods: {
        handleCommand(command) {
            switch (command) {
                case 'shop':
                    this.toWebsite();
                    break;
                case 'logout':
                    this.logout();
                    break;
            }
        },
        toWebsite() {
            this.$router.push('/index');
        },
        logout() {
            removeToken('username');
            this.$router.push('/login');
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

        .el-dropdown-link {
            cursor: pointer;
            color: #fff;
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }


        .h-item {
            display: flex;
            justify-content: space-around;
            align-items: center;

            div {
                margin-right: 20px;
                cursor: pointer;
            }

            .toweb {
                text-decoration: underline;
            }

            .user {
                margin-left: 10px;
            }
        }
    }
}

.el-dropdown-menu {
    min-width: 96px;
}
</style>