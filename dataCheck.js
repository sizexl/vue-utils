import Vue from 'vue'
import { Message } from 'element-ui'
export default {
  install(Vue, options) {
    Vue.prototype.valiLoginName = (rule, value, callback) => {
      if (value == ''||/^\s+/.test(value)) {
        return callback(new Error('用户名不能为空或不能有空格'));
      } else {
        callback()
      }
    };
    Vue.prototype.valiLoginPassword = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    };
    Vue.prototype.valiClassName = (rule, value, callback) => {
      if (value == ''||/^\s+/.test(value)) {
        return callback(new Error('课程名不能为空或有空格'));
      } else {
        callback()
      }
    };
    // 1.20 /^\s+/.test(value) 课程名称可以有空格
    Vue.prototype.checkData = (value,message) =>{
      if(value == ''|| value == undefined || value == null || !/[\u4e00-\u9fa5_a-zA-Z0-9]+/.test(value)){
        Message({
          type:'error',
          message:message
        })
        return false
      }else{
        return true
      }
    },
    Vue.prototype.checkDataNum = (value,message) =>{
      if(value == ''|| /^\s+/.test(value) || value == undefined || value == null || /^(0|([1-9]\d*))(\.\d+)?$/g.test(value)!=true){
        Message({
          type:'error',
          message:message
        })
        return false
      }else{
        return true
      }
    },
    //链接地址判断 域名或是ip都包括
    Vue.prototype.checkDataLync = (value,message) =>{
      var re_weburl = new RegExp(
        "^" +
          "([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])"+ "|" +
          // protocol identifier
          "(?:(?:https?|ftp)://)" +
          // user:pass authentication
          "(?:\\S+(?::\\S*)?@)?" +
          "(?:" +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
            "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
            "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
          "|" +
            // host name
            "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
            // domain name
            "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
            // TLD identifier
            "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
          ")" +
          // port number
          "(?::\\d{2,5})?" +
          // resource path
          "(?:/\\S*)?" +
        "$", "i"
      );
      if(value == ''|| /^\s+/.test(value) || value == undefined || value == null || re_weburl.test(value)!=true){
        Message({
          type:'error',
          message:message
        })
        return false
      }else{
        return true
      }
    },
    Vue.prototype.checkAssociate = (query) =>{
      if(query != ''&&/^\s+/.test(query)!=true &&query.lastIndexOf('&')!=query.length-1&&query.lastIndexOf(' ')!=query.length-1){
        return true
      }else{
        return false
      }
    },
    Vue.prototype.checkDateTime = (time1,time2) =>{
      let trainTime = new Date(time1).getTime()
      let enrollTime = new Date(time2).getTime()
      if(trainTime<enrollTime){
        Message({
          type:'error',
          message:'报名时间不能在培训时间之后'
        })
        return false
      }else{
        return true
      }
    },
    Vue.prototype.dataStr = (str) =>{
      if(str){
        let arrStr = str.split(' ')
        return arrStr[0]
      }      
    },
    //精确到分钟的时间
    Vue.prototype.dataStrMin = (str) =>{
      if(str){
        let arrStr = str.split(' ')
        let arrHMin = ''
        if(arrStr[1]){
          let arrMin = arrStr[1].split(':')
          if(arrMin[0]&&arrMin[1]){
            arrHMin = arrStr[0] + ' ' + arrMin[0]+ ':' + arrMin[1]
          }
        }
        return arrHMin
      }      
    },
    //小数转为百分比
    Vue.prototype.dataPercent = (point) =>{
      if (point==0) {
        return 0
      }
      if(point==null){
        return '-'
      }
      // if(point<0){
      //   return point+='%'
      // }
      var str=Number(point*100).toFixed(1);
      str+="%"
      return str
    }
    //小数转为整数
    Vue.prototype.dataInt = (point) =>{    
      return Math.round(point);
    }
    //保留两位小数
    Vue.prototype.dataFloatTwo = (num) =>{ 
      if (num==0) {
        return 0
      }
      if(num==null){
        return '-'
      }   
      return parseFloat(num).toFixed(2) +''
    }
    //千分位 转化成 逗号隔开
    Vue.prototype.dataSan = (num) => { 
      if(num == null){
        return '-'
      }
      if (num==0) {
        return 0
      }
      return (num+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');   
    }
    //判断是否为ie9
    Vue.prototype.isIE9 = (str) =>{
      if (
        navigator.appName == "Microsoft Internet Explorer" &&
        parseInt(
          navigator.appVersion
            .split(";")[1]
            .replace(/[ ]/g, "")
            .replace("MSIE", "")
        ) <= 9
      ) {
        return true;
      }
      return false;      
    }
    Vue.prototype.nonempty = (param) => {
      return param !== null && param !== undefined && param.length !== 0
    }
    Vue.prototype.timeFromNow = (time) => {
      let result = ''
      const now = new Date()
      const timeDifference = now.getTime() - new Date(time).getTime()
      // 一周以上直接显示日期
      if (timeDifference > 1000 * 60 * 60 * 24 * 7) {
        result = moment(time).format('YYYY-MM-DD HH:mm')
      } else {
        result = moment(time).fromNow()
      }
      return result
    }
    // 根据字符串格式化时间
    Vue.prototype.$timeFormat = (time, str) => moment(time).format(str)
  }
}

