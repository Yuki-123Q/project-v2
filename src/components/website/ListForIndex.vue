<template>
    <div class="w-index-list">
        <div class="list-header">
            <i class="fa fa-users"></i>
        </div>
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="(i, k) in goodsGroup" class="infinite-list-item" :key="k">
                <img :src="require(`@/assets/img/${i.src}`)" alt="">
                <div class="list-content">
                    <div class="list-info">
                        <div class="list-info-child list-title">{{ i.title }}</div>
                        <div class="list-info-child list-author">
                            <span>{{ i.author }}</span>
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
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
        </ul>
    </div>
</template>
<script>
import { getList } from '../../utils/table.js';
import indexList from '../../Mock/listIndex.json';
import { store } from '../../utils/store.js';
export default {
    data() {
        return {
            goodsGroup: [],
            count: 10,
            loading: false,
            noMore: false,
        }
    },
    mounted() {
        this.getData('/index');
        console.log(this.goodsGroup)
    },
    methods: {
        addShopCar(id) {
            console.log(id)
            store.goodsIds.push(id);
            console.log(store.goodsIds)
            this.getData('/shopcar')
        },
        load() {
            this.loading = true
            if (this.count >= indexList.length) {
                this.loading = false;
                this.noMore = true;
            } else {
                setTimeout(() => {
                    this.count += 2;
                    this.getData('/index');
                }, 2000);

            }
            console.log(this.loading)
        },
        getData(url) {
            console.log(this.count)
            getList(this, url, { pageSize: this.count, ids: store.goodsIds});
        }
    }
}
</script>
<style lang="scss">
.w-index-list {
    font-size: 12px;

    .infinite-list {
        height: 800px;

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
                width: calc(100% - 156px);
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

                    .el-button:hover {
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

        p {
            color: #b9b9b9;
        }
    }
}
</style>