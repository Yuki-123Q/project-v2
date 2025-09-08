<template>
    <div class="w-index-list" style="overflow-y: hidden;">
        <div class="list-container" v-infinite-scroll="load" :infinite-scroll-disabled="isDisabled"
            style="height:calc(100vh - 80px);overflow:auto">
            <el-carousel ref="slideCarousel" :interval="5000">
                <el-carousel-item v-for="(item, index) in imgGroup" :key="index">
                    <img :src="item" alt="">
                </el-carousel-item>
            </el-carousel>
            <ul class="infinite-list">
                <li v-for="(i, k) in dataList" class="infinite-list-item" :key="k">
                    <img :src="require(`@/assets/img/${i.src}`)" @click="toDetail(i.id)" alt="">
                    <div class="list-content">
                        <div class="list-info">
                            <div class="list-info-child list-title">{{ i.title }}</div>
                            <div class="list-info-child list-author-info">
                                <span class="list-author">{{ i.author }}</span>
                                <span>{{ i.date }}</span>
                            </div>
                            <div class="list-info-child list-remark">{{ i.remark }}</div>
                        </div>
                        <div class="list-option">
                            <div class="list-price">¥{{ i.price }}</div>
                            <el-button type="primary" @click="addShopCar(i.id)">
                                加入购物车
                            </el-button>
                        </div>
                    </div>
                </li>
            </ul>
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
        </div>
    </div>
</template>
<script>
import { GetIndexList } from '@/api/api';
import { store } from '@/utils/store.js';
import { setToken } from '@/utils/setToken';
import { EventBus } from '@/main';
export default {
    data() {
        return {
            dataList: [],
            count: 10,
            loading: false,
            noMore: false,
            imgGroup: [
                require('@/assets/img/s1.jpeg'),
                require('@/assets/img/s2.jpeg'),
                require('@/assets/img/s3.jpeg'),
                require('@/assets/img/s4.jpeg'),
                require('@/assets/img/s5.jpeg')
            ],
            start: 0,
            end: 0,
            sumDataCount: 0,
            searchData: ''
        }
    },
    mounted() {
        this.getData();
        EventBus.$on('search-event',this.getSearchData);
    },
    computed: {
        isDisabled() {
            return this.loading || this.noMore;
        }
    },
    methods: {
        resetPoint() {
            this.start = 0;
            this.end = 0;
        },
        toDetail(id) {
            this.$router.push({ name: 'details', params: { id } });
        },
        addShopCar(id) {
            store.goodsIds.push(id);
            setToken('goodsIds', JSON.stringify(store.goodsIds));
            store.getShopCarItem();
        },
        load() {
            this.loading = true;
            if (this.count >= this.sumDataCount) {
                this.loading = false;
                this.noMore = true;
            } else {
                setTimeout(() => {
                    this.count += 2;
                    this.getData();
                }, 2000);
            }
        },
        getSearchData(data){
            this.searchData = data;
            this.getData();
        },
        getData() {
            GetIndexList({ search: this.searchData,pageSize: this.count }).then(res => {
                if (res.data.status === 200) {
                    this.dataList = res.data.data;
                    this.sumDataCount = res.data.sumCount;
                } else {
                    this.$message.error(res.data.message);
                }
                this.loading = false;
            }).catch(e => {
                this.loading = false;
                this.$message.error(e);
            })
        },
    }
}
</script>
<style lang="scss">
.w-index-list {
    font-size: 12px;

    .el-carousel {
        height: 320px;

        .el-carousel__container {
            height: 100%;
        }

        .el-carousel__indicators--horizontal {
            white-space: nowrap;
        }
    }

    .el-carousel__item img {
        width: 100%;
        height: 100%;
        margin: 0;
    }

    .list-container {
        padding-bottom: 20px;

        .infinite-list {

            .infinite-list-item {
                margin: 20px 8px;
                padding: 15px 12px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                border: 1px solid #e2b0a9;
                border-radius: 3px;
                cursor: pointer;

                img {
                    width: 120px;
                    height: 120px;
                }

                .list-content {
                    width: calc(100% - 146px);
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
                            width: 200px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .list-author-info {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;

                            .list-author {
                                margin-right: 10px;
                            }
                        }
                    }

                    .list-option {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: flex-end;

                        .list-price {
                            font-size: 20px;
                            color: red;
                            text-align: right;
                            width: 120px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

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

                        .el-button:hover,
                        .el-button:focus {
                            background-color: #e72106;
                            border-color: #e72106;
                            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                        }
                    }
                }
            }

            .infinite-list-item:hover {
                box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
            }

        }

        p {
            color: #b9b9b9;
        }
    }
}

::-webkit-scrollbar {
    display: none;
}

@media (max-width: 600px) {
    .w-index-list {
        .el-carousel {
            width: 100vw;
            height: 30vh;

            .el-carousel__container {
                height: 100%;
            }
        }

        .list-container {
            .infinite-list {
                .infinite-list-item {
                    align-items: center;
                    padding: 8px;
                    margin: 15px 12px;

                    .list-content {
                        flex-direction: column;
                        align-items: flex-end;

                        .list-option {
                            justify-content: space-between;
                            flex-direction: row;
                            align-items: center;
                            width: 100%;

                            .list-price {
                                width: 20vw;
                                text-align: left;
                            }

                            .el-button {
                                margin-left: 20px;
                            }
                        }
                    }
                }
            }
        }
    }

}
</style>