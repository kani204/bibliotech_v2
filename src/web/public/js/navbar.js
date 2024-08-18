const navbarBody = document.getElementById('navbarBody')
const navbarMenu = document.getElementById('navbarMenu')

navbarMenu.addEventListener('click', (elem) => {
    const display = navbarBody.style.display
    
    if(display == 'none' || display == '') {
        navbarBody.style.display = 'flex'
    } else {
        navbarBody.style.display = 'none'
    }
})

const colorSwitch = document.getElementById('sol')
const menuImg = document.getElementById('navbarMenu')

colorSwitch.addEventListener('click', (elem) => {

    const atributte = localStorage.getItem('tema')
    const temaActual = document.documentElement.getAttribute('tema')

    console.log(atributte, temaActual)
    if(atributte == 'dark' && temaActual == atributte) {
        localStorage.setItem('tema', 'light')
        document.documentElement.setAttribute('tema', 'light')
        menuImg.src = '/img/menu-negro.png'
        colorSwitch.src = '/img/sol-negro.svg'
    } else {
        localStorage.setItem('tema', 'dark')
        document.documentElement.setAttribute('tema', 'dark')
        menuImg.src = '/img/menu.png'
        colorSwitch.src = '/img/sol.svg'
    }
})