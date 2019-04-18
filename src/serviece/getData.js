import fetch from '../config/fetch.js'
import demo from '../config/demo.js'

export const hotCities = () => fetch('/v1/cities', {
	type: 'hot'
})

export const cityGroup = () => fetch('/v1/cities', {
	type: 'group'
})

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
})

export const currentCity = (num) => fetch('/v1/cities/'+ num)


export const searchPlace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});

export const data = () => demo()
