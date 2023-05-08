let config;
config = {
	development: {
		// api: 'http://47.109.37.1:8762',
		api: 'https://zm.zgzhm.com',
		imgUrl:'https://zm.zgzhm.com/mini/img'
	},
	production: {
		 api: 'https://zm.zgzhm.com',
		 imgUrl:'https://zm.zgzhm.com/mini/img'
	},
}
 
console.log(process.env.NODE_ENV)
export default {
	ENV: process.env.NODE_ENV,
	...config[process.env.NODE_ENV]
};





