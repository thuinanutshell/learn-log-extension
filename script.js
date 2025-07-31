let myTabs = []
const saveBtn = document.getElementById("save-btn")
const tabsFromLocalStorage = JSON.parse(localStorage.getItem("myTabs"))
const tabsList = document.getElementById("tabs-list")

if  (tabsFromLocalStorage) {
    myTabs = tabsFromLocalStorage
    renderTabs(myTabs)
}

saveBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myTabs.push(tabs[0].url)
        localStorage.setItem("myTabs", JSON.stringify(myTabs))
        renderTabs(myTabs)
    })
})

function renderTabs(tabs) {
    let listItems = ""
    for (let i = 0; i < tabs.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${tabs[i]}'>
                    ${tabs[i]}
                </a>
            </li>
        `
    }
    tabsList.innerHTML = listItems
}