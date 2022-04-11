function formatDate(data){
    const splittedDate = data.split('-')
    return `${splittedDate[1]}-${splittedDate[2]}-${splittedDate[0]}`
}