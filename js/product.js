const content = document.getElementById('content')
const data = []
const category = new URLSearchParams(location.search).get('category')

fetch(`http://localhost:3000/${category}`)
  .then(res => res.json())
  .then(info => {
    data.length = 0
    data.push(...info)
    show()
  })

  function show() {
    content.innerHTML = ''
    data.map(item => {
      content.innerHTML += `
            <a href="../pages/detail.html?category=${category}&id=${item.id}" class="flex flex-col dark:bg-gray-50 shadow-custom rounded-md overflow-hidden">
              <div href="../pages/detail.html?category=${category}&id=${item.id}">
                <img alt="" class="object-cover w-full h-52 dark:bg-gray-500" src="${item.img}">
              </div>
              <div class="flex flex-col flex-1 p-6">
              <div class="flex items-start justify-between">
                <h3 class="flex-1 py-2 text-lg font-semibold leading-snug">${item.title}</h3>
                <button class="bg-green text-white font-bold p-2 rounded-md">Bunu seç</button>
              </div>
              <span class="py-2">${item.composition}</span>
              </div>
            </a>
    `
    })
  }