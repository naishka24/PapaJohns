const detail = document.getElementById('detail')
const dataDetail = []
const url = new URLSearchParams(location.search)
const category = url.get('category')
const id = url.get('id')

fetch(`http://localhost:3000/${category}/${id}`)
  .then(res => res.json())
  .then(info => {
    info.count = 1
    dataDetail.length = 0
    dataDetail.push(info)
    showDetail()
  })

function showDetail() {
  const item = dataDetail[0]
  detail.innerHTML = `
        <a href="#" class="lg:flex lg:justify-between gap-3 mx-auto ">
          <div class="p-6 space-y-2 lg:col-span-5">
            <h3 class="font-semibold text-2xl group-hover:underline group-focus:underline">${item.title}</h3>
            <p class="font-bold">Tərkibi: <span class="font-light">${item.composition}</span></p>
            <p class="font-bold text-[18px] my-2">Qiyməti: <span id="qiymet">${(item.price * item.count).toFixed(2)}</span>₼</p>
            ${item.variations.length > 0 ?
      `
            <div id="btns" class="flex my-2">
              <div id="Ənənəvi" onclick="qalinliq('Ənənəvi')" class="max-w-[150px] w-full p-2 text-white bg-green rounded-l-md">Ənənəvi</div>
              <div id="Nazik" onclick="qalinliq('Nazik')" class="max-w-[150px] w-full p-2 bg-[#e5e7eb] text-green rounded-r-md">Nazik</div>
            </div>
            <select onchange="qiymetDeyis()" id="olculer" class="max-w-[300px] w-full bg-red text-white font-bold p-2 my-2 rounded-md">
              ${item.variations
                  .filter(elem => elem.type == 'Ənənəvi')
                  .map(elem => `<option value="${elem.price}">${elem.size}</option>`)
                }
                      </select> </br>
                      ` : ''
              }
            <div>
            <button onclick="miqdariDeyis(-1)" class="w-[50px] py-1 m-2  text-white bg-[#9ca3af] rounded-md">-</button>
            <span id="countSpan" class="font-bold">${item.count}</span>
            <button onclick="miqdariDeyis(1)" class="w-[50px] py-1 m-2 text-white bg-green rounded-md">+</button> </br>
            </div>
            <button onclick='addToBasket(${JSON.stringify(item)})' class="bg-green text-white max-w-[200px] w-full p-3 my-3 rounded-md">Səbətə at</button>
          </div>
          <img src="${item.img}" alt="" class="object-cover h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500">
        </a>`
}

function miqdariDeyis(x) {
  const countSpan = document.getElementById('countSpan')
  const qiymet = document.getElementById('qiymet')

  const item = dataDetail[0]
  if (item.count + x > 0) {
    item.count = item.count + x
    countSpan.innerHTML = item.count 
    qiymet.innerHTML = (item.price * item.count).toFixed(2)
  }
}


function qalinliq(div) {
  const olculer = document.getElementById('olculer')
  const btns = document.querySelectorAll('#btns div')

  const item = dataDetail[0]
  btns.forEach(elem => {
    if (elem.id === div) {
      elem.classList.add('bg-green', 'text-white')
      elem.classList.remove('bg-[#e5e7eb]', 'text-green')
    } else {
      elem.classList.add('bg-[#e5e7eb]', 'text-green')
      elem.classList.remove('bg-green', 'text-white')
    }
  })

  const yeniElem = item.variations.filter(item => item.type == div)

  olculer.innerHTML = ""

  yeniElem.map(elem => {
    olculer.innerHTML += `<option value="${elem.price}">${elem.size}</option>`
  })
}

function qiymetDeyis() {
  const olculer = document.getElementById('olculer')
  const qiymet = document.getElementById('qiymet')
  const item = dataDetail[0]
  item.price = olculer.value
  qiymet.innerHTML = olculer.value
}