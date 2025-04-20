const menu = document.getElementById('menu')
const CACHE = JSON.parse(localStorage.getItem("category"))
const dataHeader = CACHE || []

if(!CACHE) {
  fetch("http://localhost:3000/category")
    .then(res => res.json())
    .then(info => {
      dataHeader.length = 0
      dataHeader.push(...info)
      localStorage.setItem("category", JSON.stringify(dataHeader))
      handleHeader()
    })
}
function handleHeader() {
  menu.innerHTML = ''
  dataHeader.map(item => {
    const url = item.id == 222 ? "/index.html" : `/pages/category.html?category=${item.slug}`
    menu.innerHTML += `<li><a href="${url}">${item.category}</a></li>`
  })
}
handleHeader()

