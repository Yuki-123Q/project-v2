<template>
    <div class="w-shopcar">
        <div class="shopcar" @click="openShopcar">
            <div class="car-count">{{ sumCount }}</div>
            <i class="fa fa-shopping-cart" aria-hidden="true" />
        </div>

        <el-drawer custom-class="w-drawer" size="40%" title="购物车" :visible.sync="drawer" :append-to-body="true"
            @open="handleOpen">
            <div class="list-wrap">
                <ul class="infinite-list ">
                    <li class="infinite-list-item " v-for="(item, index) in goodsGroup" :key="index">
                        <img :src="require(`@/assets/img/${item.src}`)" alt="">
                        <div class="list-content">
                            <div class="list-info">
                                <div class="list-info-child list-title" :title="item.title">{{ item.title }}</div>
                                <div class="list-info-child list-info-author">
                                    <span class="list-author">{{ item.author }}</span>
                                    <span>{{ item.date }}</span>
                                </div>
                            </div>
                            <div class="list-option">
                                <div class="opt-price">
                                    ¥{{ item.price }}
                                </div>
                                <div class="list-opt">
                                    <div class="i" @click="removeItem(item.id)">-</div>
                                    <div>{{ item.count }}</div>
                                    <div class="i" @click="addItem(item.id)">+</div>
                                </div>

                            </div>
                        </div>
                    </li>
                </ul>
                <div class="shopcar-sum">
                    <div class="shopcar-sum-price">¥{{ sumPrice }}</div>
                    <div class="shopcar-sum-opt">
                        <div class="shopcar-clear" @click="clear()">清空</div>
                        <span class="shopcar-cutline">|</span>
                        <div class="shopcar-to-sum">结算</div>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { store } from '@/utils/store.js';
import { setToken, removeToken } from '@/utils/setToken';
export default {
    data() {
        return {
            drawer: false,
            goodsGroup: []
        }
    },
    computed: {
        sumPrice() {
            return store.sumPrice;
        },
        sumCount() {
            return store.sumCount;
        }
    },
    methods: {
        openShopcar() {
            this.drawer = true;
        },
        handleOpen() {
            this.goodsGroup = store.goodsGroup;
        },
        async addItem(id) {
            store.goodsIds.push(id);
            setToken('goodsIds', JSON.stringify(store.goodsIds));
            try {
                await store.getShopCarItem();
                this.goodsGroup = store.goodsGroup;
            } catch (e) {
                console.log('购物车数据更新失败', e)
            }
        },
        async removeItem(id) {
            const index = store.goodsIds.indexOf(id);
            if (index !== -1) {
                store.goodsIds.splice(index, 1);
                setToken('goodsIds', JSON.stringify(store.goodsIds));
            }
            try {
                await store.getShopCarItem();
                this.goodsGroup = store.goodsGroup;
            } catch (e) {
                console.log('失败', e);
            }
        },
        clear() {
            this.$confirm('确定清空购物车？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                store.goodsGroup = [];
                store.sumCount = 0;
                store.sumPrice = 0;
                this.goodsGroup = store.goodsGroup;
                removeToken('goodsGroup');
                removeToken('goodsIds');
                removeToken('sumPrice');
                removeToken('sumCount');
                this.drawer = false;
            })
        }
    }
}
</script>
<style lang="scss">
.w-shopcar {
    position: fixed;
    right: 5px;
    bottom: 30px;
    z-index: 2001;

    .shopcar {
        position: relative;

        .car-count {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            line-height: 15px;
            font-size: 12px;
            border: 1px solid white;
            position: absolute;
            top: 11px;
            right: 10px;
            color: white;
        }

        .fa {
            font-size: 48px;
            color: red;
        }
    }
}

@media screen and (max-width: 730px) and (min-width: 500px) {
    .el-drawer {
        width: 50% !important;
    }
}

@media (max-width: 500px) {
    .w-shopcar {
        bottom: 10vh;
        right: 1vw;
    }

    .el-drawer {
        width: 75% !important;
    }

    .w-drawer .infinite-list .infinite-list-item .list-content .list-info .list-info-author .list-author {
        margin-right: 5px;
    }
}

.w-drawer {
    .list-wrap {
        height: 100%;
        position: relative;

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

            .shopcar-sum-opt {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .shopcar-clear,
                .shopcar-to-sum {
                    cursor: pointer;
                }

                .shopcar-cutline {
                    font-size: 13px;
                    margin: 0 3px;
                }
            }
        }
    }

    .infinite-list {
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: calc(100% - 40px);
        overflow: hidden scroll;

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
                    justify-content: space-between;
                    align-items: flex-end;
                    height: 100%;

                    .opt-price {
                        color: red;
                    }

                    .list-opt {
                        width: 60px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;

                        .i {
                            width: 18px;
                            height: 18px;
                            border-radius: 50%;
                            border: 1px solid red;
                            text-align: center;
                            line-height: 18px;
                            color: red;
                            cursor: pointer;
                        }
                    }
                }

            }
        }


    }

}
</style>