const axios = require('axios')
const { OMDB_API_KEY } = process.env

exports.handler = async function (event) { // 서버리스 함수는 무조건 비동기
  // GET이 아닌 POST방식으로 요청
  const payload = JSON.parse(event.body)
  console.log(payload)

  const { title, type, year, page, id } = payload
  const url = id // id가 있을 때, 없을 때
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const { data } = await axios.get(url)
    if (data.Error) { // 응답에 Error가 있으면
      return {
        statusCode: 400, // 유효하지 않은 요청
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return { // 에러 객체에 이런 속성이 있다
      statusCode: error.response.status,
      body: error.message
    }
  }

  // return { // http://localhost:8888/.netlify/functions/movie
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     name: 'kabin',
  //     age: 88
  //   })
  // }
}