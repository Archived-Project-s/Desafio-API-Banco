function AddRota(NomeRota,RotaConteudo){
    const rota = document.createElement('div')
    rota.classList.add('main')
    rota.setAttribute('data-route', NomeRota)
    rota.appendChild(RotaConteudo)
    document.body.appendChild(rota)
}

function IrRota(NomeRota){
    document.querySelector('.rotaatual').classList.remove('rotaatual')
    document.querySelector(`*[data-route="${NomeRota}"]`).classList.add('rotaatual')
}

