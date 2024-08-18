const tema = localStorage.getItem('tema')

const fondo = document.getElementById('logeoFondoImg')

if(tema == 'light') {
    document.documentElement.setAttribute('tema', 'light')
    fondo.src = '/img/fondo-claro.jpg'
} else {
    document.documentElement.setAttribute('tema', 'dark')
    fondo.src = '/img/fondo.jpg'
}