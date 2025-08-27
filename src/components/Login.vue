<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>通用后台管理系统</span>
            </div>
            <el-form label-width="80px" :model="form" ref="form" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginClick(form)">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { nameRule, passRule } from '../utils/validate';
import {setToken} from '@/utils/setToken.js';
import { login } from '../api/api';
export default {
    data() {
        return {
            form: {
                username: 'admin',
                password: 'Qaz123!'
            },
            rules: {
                username: [{validator: nameRule, trigger: 'blur'}],
                password: [{validator: passRule, trigger: 'blur'}],

            }
        }
    },
    methods: {
        loginClick() {
            this.$refs.form.validate((valid) => {
                console.log(valid)
                if (valid) {
                    console.log(this.form)
                    login(this.form).then(res=>{
                        console.log(res)
                        if(res.status === 200){
                            setToken('username', res.data.username);
                            setToken('token',res.data.token);
                            this.$message({message: res.data.message, type: 'success'});
                            this.$router.push('/home');
                        }
                    })
                } else {
                    console.error(this.form)
                }
            })
        }
    }
}
</script>
<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #409eff;

    .box-card {
        width: 450px;
        margin: 200px auto;

        .el-card__header {
            font-size: 30px;
        }

        .el-button {
            width: 100%;
        }
    }
}
</style>