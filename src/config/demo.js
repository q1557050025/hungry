
export default async (url ='', data = {}, type = 'GET') => {
	const baseUrl = 'http://47.107.116.88:8023/dckj-ec-exam/web/ErrorExport/ExportPdf?examId=296094&subjectName=%E8%8B%B1%E8%AF%AD&pageIndex=13'
	
	url = baseUrl + url;
	if(type == 'GET') {
		let dataStr = ''
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&'
		})
		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr
		}
	}
	let requestConfig = {
		credentials: 'include',
		method: type,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		mode: "cors",
		cache: "force-cache"
	}

	if(type == 'POST') {
		Object.defineProperty(requestConfig, 'body',{
			value: JSON.stringify(data)
		})
	}

	try{
		const response = await fetch(url)
		const responseJson = await response.json()
		return responseJson
	} catch(error) {
		console.log(error)
		throw new Error(error)
	}
}
