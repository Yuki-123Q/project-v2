import { store } from "./store";
//获取/查询数据
export function getData(root, method, url, params) {
    root.service[method](url, { data: params }).then(res => {
        if (res.data.status === 200) {
            root.tableData = res.data.data;
            root.tableData.forEach(item => {
                item.sex = item.sex.toString();
                item.sex_text = item.sex === '1' ? '男' : '女';
                item.state_text = item.state === '1' ? '已入学' : item.state === '2' ? '未入学' : '休学中';
            })
            root.total = res.data.total;
        }
    })
}
//新增/修改数据 
export function updateData(root, method, url, params, callFn) {
    root.service[method](url, params).then(res => {
        if (res.data.status === 200) {
            root.$message({ type: 'success', message: res.data.message });
            root.dialogFormVisible = false;
            callFn();
        }
    })
}
//删除数据
export function deleteData(root, url, id, callFn) {
    root.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(() => {
        root.service.delete(url, { data: id }).then(res => {
            if (res.data.status === 200) {
                root.$message({ type: 'success', message: res.data.message });
                callFn();
            }
        })
    });
}
/**************官网 **************/
//获取列表 //首页&&购物车列表
export function getList(root, url, data) {
    root.service.get(url, { data }).then(res => {
        console.log(res)
        if (res.status === 200) {
            if (url === '/index') {
                root.goodsGroup = res.data.data;
                root.loading = false;
            } else {
                store.goodsGroup = res.data.data;
                store.loading = false;
            }

        }
    })
}