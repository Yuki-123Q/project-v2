/** 学生列表&&信息列表 */
//获取/查询数据
export function getData(root, url, params) {
    root.service.get(url, { data: params }).then(res => {
        if (res.data.status === 200) {
            root.tableData = res.data.data;
            root.tableData.forEach(item => {
                item.sex = item.sex.toString();
                item.sex_text = item.sex === '1' ? '男' : '女';
                item.state_text = item.state === '1' ? '已入学' : item.state === '2' ? '未入学' : '休学中';
            })
            root.total = res.data.total;
        } else {
            root.$message.error(res.data.message);
        }
    }).catch(e => {
        root.$message.error(e);
    })
}
//新增/修改数据 
export function updateData(root, method, url, params, callFn) {
    root.service[method](url, params).then(res => {
        if (res.data.status === 200) {
            root.$message({ type: 'success', message: res.data.message });
            root.dialogFormVisible = false;
            callFn();
        } else {
            root.$message.error(res.data.message);
        }
    }).catch(e => {
        root.$message.error(e);
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
            } else {
                root.$message.error(res.data.message);
            }
        }).catch(e => {
            root.$message.error(e);
        })
    });
}
/** 作业列表 */
export function getWorkListData(root, url, data) {
    root.service.get(url, { params: data }).then(res => {
        if (res.data.status === 200) {
            root.tableData = res.data.data;
            root.tableData.forEach(item => {
                item.completedText = item.completed ? '是' : '否';
            });
            root.total = res.data.total;
        } else {
            root.$message.error(res.data.message);
        }
    }).catch(e => {
        root.$message.error(e);
    })

}