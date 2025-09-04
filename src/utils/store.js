import { reactive } from 'vue';
import { GetGoodsList } from '@/api/api';
import {setToken,getToken} from './setToken';

export const store = reactive({
    goodsIds: getToken('goodsIds') ? JSON.parse(getToken('goodsIds')) : [],
    goodsGroup: getToken('goodsGroup') ? JSON.parse(getToken('goodsGroup')) : [],
    sumCount: getToken('sumCount') ? getToken('sumCount') : 0,
    sumPrice: getToken('sumPrice') ? getToken('sumPrice') : 0,
    getShopCarItem() {
        return new Promise((resolve, reject) => {
            GetGoodsList({ ids: store.goodsIds }).then(res => {
                if (res.data.status === 200) {
                    this.goodsGroup = res.data.data;
                    this.sumCount = this.goodsGroup.reduce((sum, item) => sum + item.count, 0);
                    this.sumPrice = this.goodsGroup.reduce((sum,item)=>sum + item.price * item.count, 0);
                    setToken('goodsGroup',JSON.stringify(this.goodsGroup));
                    setToken('sumCount',this.sumCount);
                    setToken('sumPrice',this.sumPrice);
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