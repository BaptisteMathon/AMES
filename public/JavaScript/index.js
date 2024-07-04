async function CheckToken(){
    const users = await fetch("https://ames-database.vercel.app/getUser")
    const infoUsers = await users.json()
    let AllId = []
    infoUsers.forEach(element => {
        AllId.push(element._id)
    });
    console.log(AllId)

    const token = localStorage.getItem('token')

    console.log(localStorage.getItem('token'))
    getUser(token)
}        

CheckToken()

async function getUser(token) {
    const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token 
        }
    });

    if (response.ok) {                
        document.getElementById("login").style.display = "none"
        document.getElementById("logout").style.display = "block"
        const userData = await response.json();
        console.log(userData);
    } else {
        console.log('Failed to fetch user data');
    }
}

function handleResize() {
    const mq = window.matchMedia('(min-width: 970px)');
    if (mq.matches) {
        document.getElementById("menu").style.display = 'none';
        document.getElementById("menu2").style.display = 'none';
        document.getElementById("second-menu").style.display = 'none';
    } else {
        if(document.getElementById("menu2").style.display === 'none'){
            document.getElementById("menu").style.display = 'block';
        }
    }
}

function dateDifference(date1, date2){
    const d1 = new Date(date1)
    const d2 = new Date(date2)

    let yearsDifference = d2.getFullYear() - d1.getFullYear()

    let monthsDifference = d2.getMonth() - d1.getMonth()

    if(monthsDifference < 0){
        yearsDifference--
        monthsDifference += 12
    }

    if(yearsDifference === 0){
        return `${monthsDifference} mois`
    } else {
        return `${yearsDifference} ans et ${monthsDifference} mois`
    }
}

function getDateOfToday(){
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

window.addEventListener('resize', handleResize);
handleResize();

const today = getDateOfToday()
const difference = dateDifference("2024-02-01", today)
document.getElementById("AMES-date").innerHTML = difference

document.getElementById("menu").addEventListener('click', function() {
    document.getElementById("menu").style.display = "none"
    document.getElementById("menu2").style.display = "block"
    document.getElementById("second-menu").style.display = "block"            
})

document.getElementById("menu2").addEventListener('click', function() {
    document.getElementById("menu2").style.display = "none"
    document.getElementById("second-menu").style.display = "none"
    document.getElementById("menu").style.display = "block"
})

document.getElementById("AMES").addEventListener('click', function() {
    if(document.getElementById("AMES-content").style.display === "none") {
        document.getElementById("AMES-content").style.display = "block"
    } else {
        document.getElementById("AMES-content").style.display = "none"
    }
})

document.getElementById("klee").addEventListener('click', function() {
    if(document.getElementById("klee-content").style.display === "none") {
        document.getElementById("klee-content").style.display = "block"
    } else {
        document.getElementById("klee-content").style.display = "none"
    }
})

document.getElementById("Auchan").addEventListener('click', function() {
    if(document.getElementById("Auchan-content").style.display === "none") {
        document.getElementById("Auchan-content").style.display = "block"
    } else {
        document.getElementById("Auchan-content").style.display = "none"
    }
})

document.getElementById("IBM").addEventListener('click', function() {
    if(document.getElementById("IBM-content").style.display === "none") {
        document.getElementById("IBM-content").style.display = "block"
    } else {
        document.getElementById("IBM-content").style.display = "none"
    }
})
