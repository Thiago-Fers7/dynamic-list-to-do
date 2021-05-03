const DOM = {
    h1: document.querySelector('h1'),
    listName: document.querySelector('#listName'),
    listType: document.querySelector('#listType'),
    addButton: document.querySelector('.confirmList'),
    table: document.querySelector('.tableContainer tbody'),
    tableItems: document.querySelector('.tableItems tbody'),
    input: document.querySelectorAll('.validate'),

    indexValue(clss) {
        let index = document.querySelectorAll(`.${clss}`)
        index = index.length === 0 ? 0 : Number(index[index.length - 1].getAttribute('data-index')) + 1
        return index
    },

    clearInput() {
        DOM.input.forEach((input) => input.value = '')
        DOM.formText()
    },

    formText() {
        const input = this.input

        input.forEach((input) => {
            const isValue = input.value.length > 0
            input.classList.toggle('focus', isValue)
        })
    }
}

const validations = {
    validateInput(redirect) {
        let isInputValues = []
        let isInputNumberValues = []

        DOM.input.forEach((input) => {
            isInputValues.push(input.value.length >= 0 && input.value.length <= 22)
            isInputNumberValues.push()
        })

        if (isInputValues.indexOf(false) != -1) {
            alert("Preencha os campos com mais caracteres")
        } else {
            redirect()

            // Att list

        }
    }
}

const listData = {
    list: [],
    // listItem: [],
    listItemInOrder: [{
        items: []
    }],

    totalList(data, clss) {
        const totalList = document.querySelector(`.${clss} span`)
        totalList.textContent = data.length
    }
}

const addList = {
    reloadList() {

    },

    showList() {
        const tr = document.createElement('tr')

        tr.setAttribute('class', 'trsList')
        tr.setAttribute('onclick', 'toggleTables.toggleLists(this)')

        tr.dataset.index = DOM.indexValue('trsList')

        tr.innerHTML = listData.list[0]
        DOM.table.appendChild(tr)
    },

    generateList() {
        const html = `
        <tr>
            <td>${DOM.listName.value}</td>
            <td>${DOM.listType.value}</td>
            <td>${date.currentDate()}</td>
            <td>
                <img src="../../public/remove_circle.svg" alt="Remover Lista" onclick="removeList.pickupIndex(this)">
            </td>
        </tr>`

        listData.list.unshift(html)
        DOM.clearInput()
        listData.totalList(listData.list, "totalLists")
        addList.showList()
    }
}

const addItems = {
    indexList: 0,

    addItemInArray(html) {
        const listItems = listData.listItemInOrder
        const indexList = addItems.indexList

        for (let i = listItems.length; i <= indexList; i++) {
            listItems.push({
                items: []
            })
        }

        listItems[indexList].items.push(html)
        listData.totalList(listData.listItemInOrder[indexList].items, "totalItems")
    },

    showItems() {
        const elements = listData.listItemInOrder[this.indexList].items

        document.querySelectorAll('.trsItems').forEach(e => e.remove())

        elements.forEach((element) => {
            const tr = document.createElement('tr')
            
            tr.setAttribute('class', 'trsItems')
            tr.dataset.index = DOM.indexValue('trsItems')
            tr.innerHTML = element

            DOM.tableItems.appendChild(tr)
        })
        console.log(listData.listItemInOrder[this.indexList])
    },

    generateItems() {
        let html = `
        <tr>
            <td>
                <form action="">
                    <input type="radio" name="checkItem" id="checkItem">
                </form>
            </td>
            <td>${DOM.listName.value}</td>
            <td>${DOM.listType.value}</td>
            <td>${date.currentDate()}</td>
            <td>
                <img src="../../public/remove_circle.svg" alt="Remover Lista">
            </td>
        </tr>`

        addItems.addItemInArray(html)
        addItems.showItems()

        DOM.clearInput()
    }
}

const date = {
    currentDate() {
        const date = new Date()
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = String(date.getFullYear()).replace(/20/g, '')
        const hours = String(date.getHours())
        const minutes = String(date.getMinutes())
        return `${day}/${month}/${year} - ${hours}:${minutes}`
    }
}

const removeList = {
    pickupIndex(thisElement) {
        const element = thisElement.parentNode.parentNode
        const index = element.parentNode.getAttribute('data-index')
        removeList.remove(index, element)
    },

    remove(index, element) {
        listData.list.splice(index, 1)
        element.remove()
        listData.totalList(listData.list, "totalLists")
    }
}

const toggleTables = {
    tableContainer: document.querySelector('.tableContainer'),
    label: document.querySelectorAll('label'),
    tableItems: document.querySelector('.tableItems'),
    previusImg: document.querySelector('.previus-img'),
    inputListType: document.getElementById('listType'),

    toggleLists(element) {
        const label = this.label

        const hiddenTableContainer = this.tableContainer.classList.toggle('hidden')
        this.tableItems.classList.toggle('hidden')
        this.previusImg.classList.toggle('hidden')

        if (hiddenTableContainer) {
            label[0].textContent = 'Nome do Item'
            label[1].textContent = 'Valor (R$)'
            this.inputListType.setAttribute('type', 'number')
            DOM.addButton.setAttribute('onclick', 'validations.validateInput(addItems.generateItems)')

            addItems.indexList = Number(element.getAttribute('data-index'))
            addItems.showItems()
        } else {
            label[0].textContent = 'Nome da lista'
            label[1].textContent = 'Tipo de lista'
            this.inputListType.setAttribute('type', 'text')
            DOM.addButton.setAttribute('onclick', 'validations.validateInput(addList.generateList)')

            document.querySelectorAll('.trsItems').forEach(e => e.remove())
        }

        // addItems.showItems(element)
    }
}