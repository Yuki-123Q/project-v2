<template>
    <div class="index">
        <el-container>
            <ShopCar />
            <Header />
            <div>
                <router-view></router-view>
            </div>

            <Footer />
        </el-container>
    </div>
</template>
<script>
import Header from './common/Header.vue';
import Footer from './common/Footer.vue';
import ShopCar from './common/ShopCar.vue';
export default {
    components: {
        Header,
        Footer,
        ShopCar
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="scss">
.index {
    .el-container {
        display: flex;
        flex-direction: column;
        margin-top: 65px;

    }
}
</style>