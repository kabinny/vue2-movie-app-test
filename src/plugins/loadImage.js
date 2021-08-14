export default {
  install(Vue) { // 뷰의 프로토타입에 등록하기
    Vue.prototype.$loadImage = (src) => {
      return new Promise((resolve) => { // 비동기로 동작
        const img = document.createElement('img') // 메모리에 img요소 생성
        img.src = src
        img.addEventListener('load', () => {
          resolve() // 로딩이 완료되면 resolve실행 - 비동기 완료 처리됨 
        })
      })
    }
  }
}