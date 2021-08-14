const axios = require('axios')

exports.handler = async function (event) { // 서버리스 함수는 무조건 비동기
  // GET이 아닌 POST방식으로 요청
  const payload = JSON.parse(event.body)
  console.log(payload)

  const { title, type, year, page, id } = payload
  const url = id // id가 있을 때, 없을 때
    ? `https://www.omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=7035c60c&s=${title}&type=${type}&y=${year}&page=${page}`
  const { data } = await axios.get(url)
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }

  // return { // http://localhost:8888/.netlify/functions/movie
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     name: 'kabin',
  //     age: 88
  //   })
  // }
}