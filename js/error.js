function handleError(elem) {
  const div = document.getElementById(elem)
}
if (div) {
  div.innerHTML = `
        <section class="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
          <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div class="max-w-md text-center">
              <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-400">
                <span class="sr-only">Error</span>404
              </h2>
              <p class="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
              <p class="mt-4 mb-8 dark:text-gray-600">In 3 seconds you will be directed to HomePage</p>
              <a rel="noopener noreferrer" href="#" class="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Back to homepage</a>
            </div>
          </div>
        </section>
`
}
setTimeout( ()=>{
  location.href = "/index.html"
}, 3500)
handleError("cards")