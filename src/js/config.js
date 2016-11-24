angular.module("Game").constant("config", {
	url: "http://",
	imageUrl: "http://",
	request: {
		"SUCCESS": "200",
		"TOKEN_INVALID": "405"
	},
	response: {
		"SUCCESS": 1
	},
	common_params: {},
	interceptor: [
		"index",
		"feiting",
		"saiche",
		"kuaile",
		"liuhecai",
		"jiangpin",
		"contact",
		"charge",
		"me",
		"bills",
		"recommandors",
		"recommand_income",
		"my_code",
		"modify_password",
		"messages",
		"online_charge",
		"online_withdraw",
		"fillinorder",
		"detail",
		"exchange",
		"orders"
	]
});