const clockContainerEl = document.querySelector('.clock-container')
const timeEl = document.querySelector('.time')
const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')
const secondEl = document.querySelector('.second')
const dateEl = document.querySelector('.date')
const toggleButton = document.querySelector('.toggle')
const toggleModeButton = document.querySelector('.toggleMode')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

toggleButton.addEventListener('click', (e) => {
  const htmlEl = document.querySelector('html')

  if (htmlEl.classList.contains('dark')) {
    htmlEl.classList.remove('dark')
    localStorage.setItem('theme', 'light')
    e.target.innerHTML = 'Dark Mode'
  } else {
    htmlEl.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    e.target.innerHTML = 'Light Mode'
  }
})

function setTheme() {
  const htmlEl = document.querySelector('html')
  const storageVal = localStorage.getItem('theme')
  if (storageVal) {
    storageVal === 'dark' ? htmlEl.classList.add('dark') : localStorage.setItem('theme', 'light')
  } else {
    localStorage.setItem('theme', 'light')
  }
}

function setTime() {
  const d = new Date()
  const hour = d.getHours() >= 13 ? d.getHours() % 12 : d.getHours()
  const minute = d.getMinutes()
  const second = d.getSeconds()
  const day = d.getDay()
  const month = d.getMonth()
  const year = d.getFullYear()

  //   Format the Date to show st, nd, rd or th
  function getDate() {
    const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate().toString()
    let dateFmt

    if (date.toString().charAt(1) === '3') {
      dateFmt = 'rd'
    } else if (date.toString().charAt(1) === '2') {
      dateFmt = 'nd'
    } else if (date.toString().charAt(1) === '1') {
      dateFmt = 'st'
    } else {
      dateFmt = 'th'
    }
    return { date, dateFmt }
  }

  const { date, dateFmt } = getDate()

  hourEl.innerHTML = `${hour}:`
  minuteEl.innerHTML = `${minute < 10 ? `0${minute}` : minute}:`
  secondEl.innerHTML = `${second < 10 ? `0${second}` : second}`
  dateEl.innerHTML = `${days[day]}, ${date}${dateFmt} ${months[month]} ${year}`
}

setTheme()
setTime()

setInterval(setTime, 1000)
