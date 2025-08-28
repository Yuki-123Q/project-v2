import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import studentsData from './students.json';
import infoData from './infoList.json';
import indexList from './listIndex.json';
import workList from './workList.json';
import dataView from './dataView.json';
const mock = new MockAdapter(axios);
const STATUS_CODES = {
  SUCCESS: 200,
  PASSWORD_INCORRECT: 201,
  USER_NOT_FOUND: 202,
  STUDENT_NOT_FOUND: 304,
  SERVER_ERROR: 500
};
const MESSAGES = {
  LOGIN_SUCCESS: '登录成功',
  PASSWORD_INCORRECT: '密码不正确',
  USER_NOT_FOUND: '用户不存在',
  STUDENT_NOT_FOUND: 'id不存在',
  DATA_GET_SUCCESS: '获取数据成功',
  DELETE_SUCCESS: '删除成功',
  Add_SUCCESS: '提交成功',
  SERVER_ERROR: '服务器错误'
};
// 返回响应数据
const createResponse = (status, message, data = {}) => {
  return [status, { status, message, ...data }];
};
//错误处理
const handleServerError = error => {
  console.log(`Server Error: ${error}`);
  return createResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.SERVER_ERROR);
}
// 数据处理
const handleParams = params => {
  if (!params || typeof params !== 'string') {
    return null;
  }
  try {
    return JSON.parse(params);
  } catch (e) {
    console.log('数据格式错误');
    return null;
  }

}
//登录
mock.onPost('/api/login').reply(params => {
  try {
    const { username } = handleParams(params.data);
    // if (username !== 'admin') return createResponse(STATUS_CODES.USER_NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    // if (password !== 'Qaz123!') return createResponse(STATUS_CODES.PASSWORD_INCORRECT, MESSAGES.PASSWORD_INCORRECT);
    return createResponse(STATUS_CODES.SUCCESS, MESSAGES.LOGIN_SUCCESS, { username, userId: 0 });
  } catch (e) {
    return handleServerError(e);
  }
})

//获取学生信息/前台分页
let students = [...studentsData];
let studentsInfo = [...infoData];
mock.onGet('/api/users').reply(params => {
  try {
    // 查询
    const paramsData = handleParams(params.data);
    if (paramsData?.user) {
      let queryStudents = students.filter(item => item.name === paramsData.user);
      return createResponse(STATUS_CODES.SUCCESS, MESSAGES.DATA_GET_SUCCESS, {
        total: queryStudents.length,
        data: queryStudents
      });
    }
    return createResponse(STATUS_CODES.SUCCESS, MESSAGES.DATA_GET_SUCCESS, {
      total: students.length,
      data: students
    });
  } catch (e) {
    return handleServerError(e);
  }

});
//删除学生信息
mock.onDelete('/api/student').reply(params => {
  try {
    const existStudent = students.some(item => item.id === params.data);
    if (!existStudent) {
      return createResponse(STATUS_CODES.STUDENT_NOT_FOUND, MESSAGES.STUDENT_NOT_FOUND);
    }
    students = students.filter(item => item.id !== params.data);
    return createResponse(STATUS_CODES.SUCCESS, MESSAGES.DELETE_SUCCESS);
  } catch (e) {
    return handleServerError(e);
  }
});
// 获取信息列表
mock.onGet('/api/info').reply(params => {
  try {
    const paramsData = handleParams(params.data);
    if (paramsData) {
      const queryInfo = studentsInfo.filter(item => item.name === paramsData.user);
      return createResponse(STATUS_CODES.SUCCESS, MESSAGES.DATA_GET_SUCCESS, { total: queryInfo.length, data: queryInfo });
    }
    return createResponse(STATUS_CODES.SUCCESS, MESSAGES.DATA_GET_SUCCESS, { total: studentsInfo.length, data: studentsInfo });
  } catch (e) {
    return handleServerError(e);
  }
})
//新增信息
mock.onPost('/api/info').reply(params => {
  try {
    let addObj = handleParams(params.data)
    const maxId = studentsInfo.reduce((max, item) => Math.max(max, item.id), 0);
    addObj = { ...addObj, id: maxId + 1 };
    studentsInfo.push(addObj);
    return createResponse(STATUS_CODES.SUCCESS, MESSAGES.Add_SUCCESS, { total: studentsInfo.length, data: studentsInfo });
  } catch (e) {
    return handleServerError(e);
  }
})
//修改信息
mock.onPut('/api/info').reply(params => {
  try {
    const updateObj = handleParams(params.data)
    studentsInfo.forEach((item, index) => {
      if (item.id === updateObj.id) {
        studentsInfo.splice(index, 1, updateObj);
      }
    });
    return createResponse(STATUS_CODES.SUCCESS, MESSAGES.Add_SUCCESS, { total: studentsInfo.length, data: studentsInfo });
  } catch (e) {
    return handleServerError(e);
  }
})
//删除信息
mock.onDelete('/api/info').reply(params => {
  try {
    const existInfo = studentsInfo.some(item => {
      return item.id === params.data
    });
    if (!existInfo) {
      return createResponse(STATUS_CODES.USER_NOT_FOUND, MESSAGES.USER_NOT_FOUND)
    }
    studentsInfo = studentsInfo.filter(item => item.id != params.data);
    return createResponse(STATUS_CODES.SUCCESS, MESSAGES.DELETE_SUCCESS);
  } catch (e) {
    return handleServerError(e);
  }
})

// 获取作业列表
let workData = [...workList];
mock.onGet('/api/work').reply(() => {
  try {
    return createResponse(STATUS_CODES.SUCCESS, MESSAGES.DATA_GET_SUCCESS, { total: workList.length, data: workData });
  } catch (e) {
    return handleServerError(e);
  }

})
// 数据概览
mock.onGet('/api/dataview').reply(() => {
  return createResponse(STATUS_CODES.SUCCESS, MESSAGES.DATA_GET_SUCCESS, { data: dataView });
})

/*
 *网页接口
 */
// 首页列表/后台分页
mock.onGet('/api/index').reply(params => {
  try {
    const paramsData = handleParams(params.data);
    let listInfo = [...indexList].slice(0, paramsData.pageSize);
    return createResponse(STATUS_CODES.SUCCESS, MESSAGES.DATA_GET_SUCCESS, { data: listInfo });
  }
  catch (e) {
    return handleServerError(e);
  }
})
// 购物车列表
mock.onGet('/api/shopcar').reply(params => {
  try {
    const paramsData = handleParams(params.data);
    let listInfo = [...indexList];
    // 计算每个商品加入购物车次数
    const ids = paramsData.ids || [];
    const itemCountMap = ids.reduce((obj, id) => {
      obj[id] = (obj[id] || 0) + 1;
      return obj;
    }, {})
    const shopcarList = listInfo.filter(item => ids.includes(item.id)).map(item => ({ ...item, count: itemCountMap[item.id] || 0 }));
    return createResponse(STATUS_CODES.SUCCESS, MESSAGES.DATA_GET_SUCCESS, { data: shopcarList });
  }
  catch (e) {
    return handleServerError(e);
  }
})
//商品详情
mock.onGet('/api/goods').reply(params => {
  try {
    const paramsData = handleParams(params.data);
    const detailItem = indexList.find(item => {
      return item.id === paramsData.id;
    }
    );
    return createResponse(STATUS_CODES.SUCCESS, MESSAGES.DATA_GET_SUCCESS, { data: detailItem });
  } catch (e) {
    return handleServerError(e);
  }
})
export default axios;