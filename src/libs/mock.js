export default {
  $default(target, cb) {
    cb(null, {status: 0, data: null, message: 'ok'})
  },
  getHeadData(target, cb) {
    let data=[
      {id:0,icon:'',position:'left',link:'',data:[
        {ClassName:"学习资讯"},
        {ClassName:"沪江网校"},
        {ClassName:"沪江社团"},
        {ClassName:"CC课堂"},
        {ClassName:"沪江部落"}
      ]},
      {id:1,name:'学习工具',position:'left',link:'',data:[]},
      {id:2,name:'沪江首页',position:'left',link:''},
      {id:3,name:'CC课堂',position:'left',link:''},
      {id:4,name:'选课中心',position:'left',link:''},
      {id:5,name:'加入收藏',position:'left',link:''},
      {id:6,name:'登录',position:'right',link:''},
      {id:7,name:'免费注册',position:'right',link:''},
      {id:8,name:'我的网校',position:'right',link:'',data:[
        {ClassID: 16254816, ClassName: "剑桥同传【同声翻译入门】", ShortName: "同声翻译入门"},
        {ClassID: 16268915, ClassName: "2017考研名师政治单科特训营（包住宿）【暑期班】", ShortName: "政治单科特训营 暑期班"},
        {ClassID: 16269730, ClassName: "英语零基础直达大学四级【听说升级版 7月通关班】", ShortName: "英语零基础直达大四 7月班"},
        {ClassID: 16269781, ClassName: "新概念英语1、2册连读【外教VIP 7月通关班】", ShortName: "新概念1-2外教VIP 7月通关班"},
        {ClassID: 16269704, ClassName: "英语零基础直达大学六级【7月通关班】", ShortName: "0-CET6 7月班"}]}
    ];
    cb(null, {status: 0, data});
  },
}