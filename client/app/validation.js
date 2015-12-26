$.validator.setDefaults({
	rules: {
		userEmail: {
			required: true,
			email: true
		},
		userContent: {
			required: true,
		},
		tokenAmount: {
			required: true,
			number: true
		},
		amountAdd: {
			required: true,
			number: true
		}
	},
	messages: {
		userEmail: {
			required: "*需要電子郵件地址*",
			email: "*此地址不存在*"
		},
		userContent: {
			required: "*請大概說明一下需求*",
		},
		tokenAmount: {
			required: "*請填上金額*",
			number: "*需要是數字*"
		},
		amountAdd: {
			required: "*請填上金額*",
			number: "*需要是數字*"
		}
	}
});