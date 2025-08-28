import { reactive } from 'vue';
import { GetGoodsList } from '@/api/api';

export const store = reactive({
    goodsIds: [],
    goodsGroup: [],
    sumCount: 0,
    sumPrice: 0,
    getShopCarItem() {
        return new Promise((resolve, reject) => {
            GetGoodsList({ ids: store.goodsIds }).then(res => {
                console.log(res)
                if (res.data.status === 200) {
                    this.goodsGroup = res.data.data;
                    this.sumCount = this.goodsGroup.reduce((sum, item) => sum + item.count, 0);
                    this.sumPrice = this.goodsGroup.reduce((sum,item)=>sum + item.price * item.count, 0);
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