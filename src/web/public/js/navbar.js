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

colorSwitch.addEventListener('click', (elem) => {
    elem.preventDefault()

    const atributte = localStorage.getItem('tema')

    if(atributte == 'dark') {
        localStorage.setItem('tema', 'light')
        document.documentElement.setAttribute('tema', 'light')
        colorSwitch.src = '/img/sol-negro.svg'
    } else {
        localStorage.setItem('tema', 'dark')
        document.documentElement.setAttribute('tema', 'dark')
        colorSwitch.src = '/img/sol.svg'
    }
})

const tema = localStorage.getItem('tema')

if(tema == 'dark') {
    document.documentElement.setAttribute('tema', 'dark')
    colorSwitch.src = '/img/sol.svg'
} else {
    document.documentElement.setAttribute('tema', 'light')
    colorSwitch.src = '/img/sol-negro.svg'
}