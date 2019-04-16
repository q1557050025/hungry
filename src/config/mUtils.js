// 获取localStorage
export const getStore = val => {
	if(!val) return
	return window.localStorage.getItem(val)
}

export const setStore = (key, val) => {
	if(!key) return
	if (typeof val !== 'string') {
		val = JSON.stringify(val)
	}
	return window.localStorage.setItem(key, val)
}

