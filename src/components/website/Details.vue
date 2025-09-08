<template>
    <div class="w-detail">
        <div class="w-back">
            <i class="fa fa-angle-left" @click="back" />
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
                        <div class="good-price">¥{{ item.price }}</div>
                        <el-button type="primary" @click="addShopCar(item.id)">
                            加入购物车
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="w-item w-comment">
                <div class="w-title w-comment-title">
                    <div class="wc-comment-left">
                        <div class="wc-title">商品评价</div>
                        <div class="w-rate">
                            <el-rate v-model="rate" @change="changeRate"></el-rate>
                        </div>
                    </div>
                    <div class="w-comment-submit">
                        <el-button type="primary" @click="submit">提交</el-button>
                    </div>
                </div>
                <div class="w-comment-info">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="comment">
                    </el-input>
                </div>
                <div class="w-comment-list">
                    <ul>
                        <li class="wc-list-item" v-for="(i, k) in commentList" :key="k">
                            <div class="wc-list-user">
                                <div class="wc-list-userinfo">
                                    <i class="fa fa-user" aria-hidden="true" />
                                    <div class="wc-username">{{ i.userName }}</div>
                                </div>
                                <div class="wc-list-userrate">
                                    <el-rate v-model="i.level" disabled show-score text-color="#ff9900"
                                        :score-template="i.level.toString()">
                                    </el-rate>
                                </div>
                            </div>
                            <div class="wc-list-info">{{ i.msg }}</div>
                            <div class="wc-list-date">{{ i.time }}</div>
                        </li>
                    </ul>
                </div>
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
import { GetDetail, GetComment, SubmitComment } from '@/api/api';
import { store } from '@/utils/store.js';
import { setToken } from '@/utils/setToken';
import { getToken } from '../../utils/setToken';
import { formatedDate } from '@/utils/formatDate';
export default {
    components: {
        Main
    },
    data() {
        return {
            item: {
                id: null,
                title: '',
                src: '',
                date: '',
                author: '',
                price: 0,
                remark: ''
            },
            rate: null,
            commentList: [],
            comment: ''
        }
    },
    created() {
        this.item.id = Number(this.$route.params.id);
        this.getGoodsItem(this.item.id);
        this.getCommentList(this.item.id);

    },
    methods: {
        back() {
            this.$router.push('/index');
        },
        submit() {
            const data = {
                goodsId: this.item.id,
                comment: {
                    userId: 0,
                    userName: getToken('username'),
                    level: this.rate,
                    msg: this.comment,
                    time: formatedDate()
                }
            };
            SubmitComment(data).then(res => {
                if (res.data.status === 200) {
                    this.getCommentList(this.item.id);
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch(e => {
                this.$message.error(e);
            })
        },
        getGoodsItem(id) {
            GetDetail({ id }).then(res => {
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
            setToken('goodsIds', JSON.stringify(store.goodsIds));
            store.getShopCarItem();
        },
        changeRate(val) {
            this.rate = val;
        },
        getCommentList(id) {
            GetComment({ id }).then(res => {
                if (res.data.status === 200) {
                    this.commentList = res.data.data.comment.reverse();
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch(e => {
                this.$message.error(e);
            })
        }
    }
}
</script>
<style lang="scss">
.w-detail {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

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

    .w-back {
        text-align: left;
        font-size: 24px;
        color: #808080;
        padding-left: 5px;

        i {
            cursor: pointer;
        }
    }

    .w-title {
        text-align: left;
    }



    .w-content {
        padding: 0 20px 15px 20px;

        .w-item {
            padding: 20px 0;
            margin-bottom: 15px;
            border-top: 1px solid red;
        }

        .w-good {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            border: none;

            .img {
                width: 280px;
                height: 280px;
                background-size: 100%;
                margin-right: 20px;
            }

            .w-good-detail {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-direction: column;
                width: calc(100% - 300px);
                position: relative;

                .good-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 15px;
                    max-width: 500px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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

                        .good-author,
                        .good-date {
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }

                    .good-remark {
                        text-align: left;
                        margin-bottom: 30px;
                        min-height: 190px;
                    }
                }

                .good-price {
                    color: red;
                }

                .good-addShopCar {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
            }
        }

        .w-comment {
            .w-comment-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;

                .wc-comment-left {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    .wc-title {
                        margin-right: 10px;
                    }
                }

            }

            .w-comment-info {
                margin-bottom: 20px;
            }

            .w-comment-submit {
                text-align: right;
            }

            .w-comment-list {
                .wc-list-item {
                    text-align: left;
                    margin: 15px;
                    padding: 12px 15px;
                    border-top: 1px solid #f0eded;
                    padding-bottom: 0;

                    .wc-list-user {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .wc-list-userinfo {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;

                            i {
                                margin-right: 10px;
                                font-size: 20px;
                            }

                            .wc-username {
                                font-size: 14px;
                            }
                        }

                    }

                    .wc-list-info {
                        margin: 12px 20px;
                        font-size: 14px;
                    }

                    .wc-list-date {
                        text-align: right;
                        color: #808080;
                    }
                }
            }
        }
    }
}

@media (max-width: 500px) {
    .w-detail {
        .w-content {

            .w-good {
                .img {
                    width: 180px;
                    height: 180px;
                }

                .w-good-detail {
                    width: calc(100% - 200px);

                    .good-title {
                        max-width: 180px;
                    }

                    .good-detail {
                        .good-info {
                            flex-direction: column;
                            justify-content: flex-start;
                            align-items: flex-start;

                            .good-author {
                                margin-bottom: 5px;
                            }
                        }

                        .good-remark {
                            min-height: 75px;
                        }

                    }
                }
            }
        }
    }

}
</style>