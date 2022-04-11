function tabela(headers, rows){
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')
    const theadRow = document.createElement('tr')

    for(let header of headers){
        const td = document.createElement('td')
        td.innerHTML = header
        theadRow.appendChild(td)
    }
    thead.appendChild(theadRow)
    for(let row of rows){
        const tr = document.createElement('tr')
        for(let column of row){
            const td = document.createElement('td')
            if(typeof column == 'object'){
                td.appendChild(column)
            }else{
                td.innerHTML = column
            }
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
    }
    table.appendChild(thead)
    table.appendChild(tbody)
    return table;
}
