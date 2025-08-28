<template>
    <div class="w-detail">
        <div class="w-back">
            <router-link to="/index">
                <i class="fa fa-angle-left" aria-hidden="true" />
            </router-link>
        </div>
        <div class="w-content">
            <div class="w-item w-good">
                <div class="img" :style="{ backgroundImage: `url(${require('@/assets/img/' + item.src)})` }"></div>
                <div class="w-good-detail">
                    <div class="good-title">{{ item.title }}</div>
                    <div class="good-detail">
                        <div class="good-info">
                            <div class="good-author">作者：{{ item.author }}</div>
                            <div class="good-date">日期：{{ item.date }}</div>
                        </div>
                        <div class="good-remark">描述：{{ item.remark }}</div>

                    </div>
                    <div class="good-addShopCar">
                        <div class="good-price">价格：¥<span>{{ item.price }}</span></div>
                        <el-button type="primary" @click="addShopCar($route.params.id)">
                            加入购物车
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="w-item w-comment">
            </div>
            <div class="w-item w-more">
                <div class="w-title">更多商品</div>
                <Main />
            </div>
        </div>


    </div>
</template>
<script>
import Main from './Main';
import { GetDetail } from '@/api/api';
import { store } from '@/utils/store.js';
export default {
    components: {
        Main
    },
    data() {
        return {
            item: {
                title: '',
                src: '',
                date: '',
                author: '',
                price: 0,
                remark: ''
            }
        }
    },
    created() {
        this.getItem(this.$route.params);
    },
    methods: {
        getItem(id) {
            GetDetail(id).then(res => {
                if (res.data.status === 200) {
                    this.item = { ...res.data.data };
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch(e => {
                this.$message.error(e);
            })
        },
        addShopCar(id) {
            store.goodsIds.push(id);
            store.getShopCarItem();
        }
    }
}
</script>
<style lang="scss">
.w-detail {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    .w-back {
        text-align: left;
        font-size: 24px;
        color: #808080;
        padding-left: 5px;
    }

    .w-content {
        padding: 15px 20px;
        .w-item{
            margin-bottom: 40px;
        }
        .w-good {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;

            .img {
                width: 300px;
                height: 300px;
                background: red;
                margin-right: 20px;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }

            .w-good-detail {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-direction: column;
                height: 300px;
                position: relative;

                .good-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 15px;
                }

                .good-detail {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    overflow: hidden;
                    font-size: 14px;

                    .good-info {
                        display: flex;
                        flex-direction: row;
                        color: #808080;
                        margin-bottom: 10px;
                    }

                    .good-remark {
                        text-align: left;
                        margin-bottom: 30px;
                    }


                }

                .good-price {
                    span {
                        color: red;
                    }
                }

                .good-addShopCar {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: absolute;
                    bottom: 0;
                    left: 0;

                    .el-button {
                        height: 30px;
                        font-size: 12px;
                        line-height: 30px;
                        color: #FFF;
                        background-color: #e72106;
                        border-color: #e72106;
                        padding: 0 20px;
                        border-radius: 18px;
                    }

                    .el-button:hover {
                        background-color: #e72106;
                        border-color: #e72106;
                        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                    }
                }
            }
        }
        .w-comment{
            border-bottom: 1px solid red;
        }
        .w-more{
            .w-title{
                text-align: left;
            }
        }
    }
}
</style>