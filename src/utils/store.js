import { reactive } from 'vue';
import { GetGoodsList } from '@/api/api';

export const store = reactive({
    goodsIds: [],
    goodsGroup: [],
    getShopCarItem() {
        return new Promise((resolve, reject) => {
            GetGoodsList({ ids: store.goodsIds }).then(res => {
                if (res.data.status === 200) {
                    this.goodsGroup = res.data.data;
                    resolve(res.data.data);
                } else {
                    reject(new Error('购物车数据更新失败'))
                }
            }).catch(e => {
                reject(e);
            })
        })

    }
})