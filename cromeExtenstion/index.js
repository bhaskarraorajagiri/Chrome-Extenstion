let URL = []
let oldURL = []
const inputEle = document.getElementById("input")
const saveBtn = document.getElementById("save")
const ulEle = document.getElementById("list")
const deleteBtn = document.getElementById("delete")
const tabBtn = document.getElementById("tab")
const localStorageEle = JSON.parse(localStorage.getItem("URL"))
if (localStorageEle) {
    URL = localStorageEle
    render(URL)
}
saveBtn.addEventListener("click",function(){
    URL.push(inputEle.value)
    oldURL.push(inputEle.value)
    inputEle.value = ""
    localStorage.setItem("URL",JSON.stringify(URL))
    render(URL)
}) 
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(){
        URL.push(tab[0].url)
        localStorage.setItem("URL",JSON.stringify(URL))
        render(URL)
    })
})
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    URL = []
    render(URL)
})
function render(URL){
let listItems = ""
for(let i=0;i<URL.length;i++){
    listItems += `<li>
                        <a target='_blank' href='#'>
                            ${URL[i]}
                        </a>
                </li>`
}
ulEle.innerHTML = listItems
}