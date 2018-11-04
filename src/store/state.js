export default{
	pattern:{
		userid   : /^[a-zA-Z][a-zA-Z0-9_]{6,15}$/,//用户名
		unionid  : /^[\u4e00-\u9fa5]{2,25}$/,
		// pwd      : /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
		pwd      : /^[\w]{6,20}$/ ,//密码
		name     : /^[\u4e00-\u9fa5]{1,6}$/,//1-6中文名字
		//id       : /^[0-9]{17}[0-9|X]$/,
		id      : /^[0-9]{17}[0-9|X|x]$/,//身份证
		mobile   : /^1[34578]\d{9}$/,//手机号码验证
		mail     : /^[0-9|A-z|_]{1,17}[@][0-9|A-z]{1,8}.(com)$/,//邮箱验证
		postCode : /^[1-9]\d{5}$/,
		tel      : /(d+-)?(d{4}-?d{7}|d{3}-?d{8}|^d{7,8})(-d+)?/,
		fax      : /^\d{3}-\d{8}|\d{4}-\d{7}$/, //传真验证
		// id : /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,//身份证号码
		zh       : /^[\u4e00-\u9fa5]{2,6}$/,//中文字符匹配
		phone    : /^\d{7,8}$/,//固定电话
    code: /^\d{6}$/,
		location: /^[a-zA-Z0-9\u4e00-\u9fa5_-]+$/,
    mobileOrEmail: /（^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$）|（^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$）/i
	} //输入框匹配
}