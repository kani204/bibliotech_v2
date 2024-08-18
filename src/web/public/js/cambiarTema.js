const fondo = document.getElementById('logeoFondoImg')
const colorSwitch = document.getElementById('sol')
const menuImg = document.getElementById('navbarMenu')

const tema = localStorage.getItem('tema')

console.log(fondo)
if(tema == 'dark') {
    document.documentElement.setAttribute('tema', 'dark')

    if(menuImg) menuImg.src = '/img/menu-negro.png'
    if(colorSwitch) colorSwitch.src = '/img/sol.svg'
    if(fondo) fondo.src = '/img/fondo.jpg'
} else {
    document.documentElement.setAttribute('tema', 'light')

    if(menuImg) menuImg.src = '/img/menu.png'
    if(colorSwitch) colorSwitch.src = '/img/sol.svg'
    if(fondo) fondo.src = '/img/fondo-claro.jpg'
}
    