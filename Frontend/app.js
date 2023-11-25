const btnsave = document.querySelector('.btn-save')
const btncan = document.querySelector('.btn-can')
const inputtext = document.querySelector('.inputtext')
const addbtn = document.querySelector('.add-btn')
const editbox = document.querySelector('.editbox')
const notes = document.querySelector('.notes')
const dltBtnAll = document.querySelector('.dlt-btn')
const deleteBtn = undefined
const updateBtn = undefined
let adding = true
let idObj = ''
btnsave.addEventListener('click', () => {
  if (adding) {
    saveData(inputtext.value)
  } else {
    upadateData(inputtext.value)
  }

  editbox.style.display = 'none'
  // console.log(addbtn)
  addbtn.textContent = '+'
  getData()
})

function deleteNote(data) {
  // console.log(data)
  fetch(`http://localhost:3000/api/v1/notes/${data}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => getData())
}
addbtn.addEventListener('click', () => {
  addbtnClick()
})
btncan.addEventListener('click', () => {
  addbtnClick()
})
function addbtnClick() {
  if (addbtn.textContent == '+') {
    editbox.style.display = 'block'

    addbtn.textContent = '-'
  } else {
    editbox.style.display = 'none'
    addbtn.textContent = '+'
  }
  getData()
}

window.addEventListener('DOMContentLoaded', () => {
  getData()
})
function saveData(data) {
  fetch('http://localhost:3000/api/v1/notes', {
    method: 'POST',
    body: JSON.stringify({
      content: data,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => {
    // editbox.style.display = 'none'
    // ele.target.textContent = '+'
    // getData()
  })
}
async function getData() {
  fetch('http://localhost:3000/api/v1/notes', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      // console.log(json.data.notes)
      const res = returnNotes(json.data.notes)
      // console.log(res)
      notes.innerHTML = res
      const deleteBtn = [...document.querySelectorAll('.btn-dlt')]
      const updateBtn = [...document.querySelectorAll('.btn-upd')]
      // console.log(updateBtn)
      deleteBtn.forEach((btn) => {
        btn.addEventListener('click', (ele) => {
          console.log(ele.currentTarget.dataset.id)
          deleteNote(ele.currentTarget.dataset.id)
        })
      })
      updateBtn.forEach((btn) => {
        btn.addEventListener('click', (ele) => {
          console.log('updated')

          console.log(ele.currentTarget.dataset.id)
          idObj = ele.currentTarget.dataset.id
          adding = false
          addbtnClick()
        })
      })
    })
}

function returnNotes(datas) {
  let result = datas
    .map((data) => {
      return ` <div class="note">
  <div class="content">${data.content}</div>
  <div class="btn">
  <button class="btn-delete btn-dlt" data-id="${data._id}">delete</button>
  <button class="btn-updata btn-upd" data-id="${data._id}">update</button>
  </div>
  </div>
  `
    })
    .join('\n')
  return result
}

function upadateData(data) {
  console.log('updating')
  console.log('data' + data)
  console.log('id' + idObj)
  fetch(`http://localhost:3000/api/v1/notes/${idObj}`, {
    method: 'PATCH',
    body: JSON.stringify({
      content: data,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => {
    adding = true
    // editbox.style.display = 'none'
    // ele.target.textContent = '+'
    // getData()
  })
}
dltBtnAll.addEventListener('click', (e) => {
  fetch(`http://localhost:3000/api/v1/notes`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => {
    // editbox.style.display = 'none'
    // ele.target.textContent = '+'
    getData()
  })
})
