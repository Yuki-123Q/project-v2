<template>
    <div class="w-shopcar">
        <div class="shopcar" @click="openShopcar">购物车</div>
        <el-drawer custom-class="w-drawer" size="40%" title="购物车" :visible.sync="drawer" :append-to-body="true"
            @open="handleOpen">
            <ul class="infinite-list ">
                <li class="infinite-list-item " v-for="(item, index) in goodsGroup" :key="index">
                    <img :src="require(`@/assets/img/${item.src}`)" alt="">
                    <div class="list-content">
                        <div class="list-info">
                            <div class="list-info-child list-title">{{ item.title }}</div>
                            <div class="list-info-child list-author">
                                <span>{{ item.author }}</span>
                                <span>{{ item.date }}</span>
                            </div>
                        </div>
                        <div class="list-option">
                            <div class="opt-price">
                                ¥{{ item.price }}
                            </div>
                            <div class="list-opt">
                                <div>-</div>
                                <div>{{ item.count }}</div>
                                <div>+</div>
                            </div>

                        </div>
                    </div>
                </li>
                <div class="shopcar-sum">
                    <div class="shopcar-sum-price">¥9999</div>
                    <div class="shopcar-to-sum">去结算</div>
                </div>
            </ul>
        </el-drawer>
    </div>
</template>
<script>
import { store } from '../../../utils/store.js';
export default {
    data() {
        return {
            drawer: false,
            goodsGroup: []
        }
    },
    mounted() {
        console.log(this.goodsGroup)
    },
    methods: {
        openShopcar() {
            this.drawer = true;
        },
        handleOpen() {
            console.log(store.goodsGroup)
            this.goodsGroup = store.goodsGroup;
        }
    }
}
</script>
<style lang="scss">
.w-shopcar {
    position: fixed;
    right: 0;
    bottom: 50px;
    z-index: 2001;


    .shopcar {
        background-color: red;
        color: white;
    }
}

.w-drawer {
    .el-drawer__body {
        position: relative;
    }

    .infinite-list {
        .infinite-list-item {
            margin: 0 5px;
            padding: 10px 8px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            border-top: 1px solid #cacaca;
            border-radius: 3px;
            font-size: 12px;

            img {
                width: 80px;
                height: 80px;
            }

            .list-content {
                width: calc(100% - 96px);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: flex-start;
                padding: 3px 0px 3px 20px;
                text-align: left;

                .list-info {
                    .list-info-child {
                        margin-bottom: 12px;
                        color: #808080;
                    }

                    .list-title {
                        font-size: 14px;
                        color: #000;
                        width: 90px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                .list-option {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;

                    .list-opt {
                        width: 40px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                    }
                }

            }
        }

        .shopcar-sum {
            width: calc(100% - 20px);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            background: red;
            position: absolute;
            left: 0;
            bottom: 0;
            padding: 0 10px;
            color: white;
        }
    }

}
</style>