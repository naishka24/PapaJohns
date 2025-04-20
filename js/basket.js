const sebetModal = document.getElementById('sebetModal')
const basketDiv = document.getElementById('basket')
const basketCount = document.getElementById('basketCount')
const totalPrice = document.getElementById('totalPrice')
const shopQiymet = document.getElementById('shopQiymet')
const shopCount = document.getElementById('shopCount')

let basket = JSON.parse(localStorage.getItem('basket')) || []

function setModal() {
  sebetModal.classList.toggle('hidden')
  showBasket()
}
function showBasket() {
  basketDiv.innerHTML = ''

  basket.map(item => {
    basketDiv.innerHTML += `
            <div class="flex flex-col xs:flex-row justify-between items-center py-3 border border-slate-400 mt-2">
            <div class="w-full xs:w-1/2 flex gap-2 items-center">
              <img class="w-[50px]"
                src="${item.img}"
                alt="">
              <h3 class="sm:text-[20px] font-bold">${item.title}</h3>
            </div>
            <div class="w-full xs:w-1/2 flex items-center gap-3 px-2">
              <div class="flex items-center sm:text-[20px] text-white p-2">
                <button onclick="incDec('${item.id}', -1)" class="px-2 sm:px-3 pb-1 bg-gray-400 font-black">-</button>
                <span class="px-2 sm:px-3 text-black">${item.count}</span>
                <button onclick="incDec('${item.id}', 1)" class="px-2 sm:px-3 pb-1 bg-green-600 font-black">+</button>
                <i class="fa-solid fa-trash"></i>
              </div>
              <div class="w-full font-bold flex items-center justify-between">
                <span class="text-[22px]">${(item.price * item.count).toFixed(2)}</span>
                <i onclick="basketdenSil('${item.id}')" class="fa-solid fa-trash text-2xl"></i>
              </div>
            </div>
          </div>
          
    `
  })
  basketCount.innerHTML = shopCount.innerHTML = basket.length 
  totalPrice.innerHTML = shopQiymet.innerHTML = basket.reduce((acc, item) => acc += +item.price * +item.count, 0) + '₼'
}

function incDec(id, x) {
  const item = basket.find(elem => elem.id == id)
  if (item.count + x > 0 ) {
    item.count += x
  } else {
   basketdenSil(id)
   return
  }
    
  showBasket()
  localStorage.setItem('basket', JSON.stringify(basket))
}

function addToBasket(item) {
  const yoxla = basket.find(elem => elem.id == item.id)
  if (!yoxla) {
    item.count = 1
    basket.push(item)
  }
  showBasket()
  localStorage.setItem('basket', JSON.stringify(basket))
}

function basketdenSil(id) {
  basket = basket.filter(elem => elem.id != id)
  showBasket()
  localStorage.setItem('basket', JSON.stringify(basket))
}

showBasket()
