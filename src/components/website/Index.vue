<template>
    <div class="index">
        <Header />
        <el-container>
            <el-carousel :interval="5000" height="350px">
                <el-carousel-item v-for="(item, index) in imgGroup" :key="index">
                    <img :src="item" alt="">
                </el-carousel-item>
            </el-carousel>
            <List/>
            <Footer />
        </el-container>
        <ShopCar/>
    </div>
</template>
<script>
import Header from './common/Header.vue';
import Footer from './common/Footer.vue';
import List from './ListForIndex.vue';
import ShopCar from './common/ShopCar.vue';
export default {
    components: {
        Header,
        Footer,
        List,
        ShopCar
    },
    data() {
        return {
            imgGroup: [
                require('@/assets/img/s1.jpeg'),
                require('@/assets/img/s2.jpeg'),
                require('@/assets/img/s3.jpeg'),
                require('@/assets/img/s4.jpeg'),
                require('@/assets/img/s5.jpeg')
            ],
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
        .el-carousel__item img {
            width: 100%;
            height: 100%;
            margin: 0;
        }
    }
}
</style>