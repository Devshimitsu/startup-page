/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/","yt":"https://www.youtube.com"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"rk5dKN5mx76RdPFi","label":"Reddit","bookmarks":[{"id":"UOpTXORNIekK6aBX","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"WbmfMBzji4cWOU8S","label":"r/archlinux","url":"https://www.reddit.com/r/archlinux/"},{"id":"usdfep5UDPIt4c3E","label":"r/MrRobot","url":"https://www.reddit.com/r/MrRobot/"},{"id":"5cEEQ2PZh1tQlXCk","label":"r/formula1","url":"https://www.reddit.com/r/formula1/"}]},{"id":"iTHXoYqGncoDwJCl","label":"Media","bookmarks":[{"id":"ka39WKz887EdUxFY","label":"reddit","url":"https://www.reddit.com/user/devshimitsu"},{"id":"iePKtuai4tC06ScK","label":"github","url":"https://github.com/devshimitsu"},{"id":"U7lN3SfvuBTmn6Bz","label":"instagram","url":"https://www.instagram.com/"},{"id":"mqzF36BqIFqZiGOO","label":"twitter","url":"https://twitter.com/home"}]},{"id":"1LwF9Kq95buufY3D","label":"Drives","bookmarks":[{"id":"VMe4H73lK1zOqSIY","label":"googledrive","url":"https://drive.google.com/drive/my-drive"},{"id":"5TtlVBq02RHGcUlJ","label":"devdrive","url":"https://devdrive.ml/"},{"id":"U93rFGAismq6fvcS","label":"icloud.com","url":"https://www.icloud.com/"},{"id":"mIFRG0aYghLTg0FY","label":"onedrive","url":"https://onedrive.live.com/"}]},{"id":"O9bFBqt6SarElA0w","label":"Mail","bookmarks":[{"id":"yXg8oAfP4YG0hFkz","label":"Gmail","url":"https://mail.google.com/mail/u/0/"},{"id":"KIbvjk7utAntVnUS","label":"Yandex Mail","url":"https://mail.yandex.com/"},{"id":"JmaBDp8pDnalr6iB","label":"Proton Mail","url":"https://mail.proton.me/u/0/inbox"},{"id":"tKd0n7IGI4lK3h2e","label":"Temp Mail","url":"https://temp-mail.org/en/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
