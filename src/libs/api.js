import elegantApi from 'elegant-api';
import Errors from './Errors';

let mock;
if (__DEV__) mock = require('./mock').default;
let api = elegantApi({
  base: '/api/v1',
  mock: {
    disabled: !__DEV__,
    memory: true,
    delay: {min: 300, max: 1000},

  },
  cache: false,
  request: {
    naming: 'snake'
  },
  response: {
    naming: 'camel'
  },
  handle: handle,
  http: {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  routes: {
    getHeadData: {
      path: '/headdata/'
    },
  }
}, mock);

if (__DEV__) window.api = api;

export { api as default };

function handle(target, callback) {
  if (!target.data && __DEV__) target.data = {status: 0, message: 'OK', data: null};

  let {data, http, error} = target;
  let {method, url} = http;

  delete http.crossOrigin;
  delete http.dataType;

  if (method === 'HEAD' || method === 'GET') {
    delete http.body; // 不删除会导致火狐下报错
  } else if (method === 'POST' || method === 'DELETE') {
    http.body = JSON.stringify(http.body);
  }

  if (__DEV__) console.info('REQUEST %s %s %o %o', method, url, http.data, http);
  if (this.mock.memory) return done(data, error, callback, http);

  fetch(url, http)
    .then(res => {
      let {status} = res;
      if (status >= 200 && status < 300) {
        return res.json();
      } else {
        throw new Error(status);
      }
    })
    .then(data => done(data, null, callback, http))
    .catch(res => done(null, res, callback, http));
}

function done(result, err, cb, http) {
  let {data, message, status} = result;
  let errorMessage, oldError;

  if (err) {
    errorMessage = '网络异常，请稍后再试';
    oldError = err;
    status = -1;
    console.log(oldError);
  } else if (status !== 0) {
    errorMessage = message || Errors[status] || '未知错误，状态码 ' + status;
  }

  if (errorMessage) {
    err = new Error(errorMessage);
    err.status = status;
    err.message = errorMessage;
    err.oldError = oldError;

    alert(errorMessage);
    // 登录授权
    // if (status === 1001) {
    //   location.href = G.signOutBase + encodeURIComponent(location.href);
    //   return false;
    // }
  }

  if (__DEV__) console.debug('RESPONSE %s %s %o', http.method, http.url, result);
  return cb(err, data);
}