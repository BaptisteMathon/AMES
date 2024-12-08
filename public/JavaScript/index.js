function main(){
    getDuration()
    CheckToken()
}

function getDuration(){
    // Get current date
    const today = new Date();
    const startDate = new Date(2024, 1); // February 2024 (month is 0-based)

    // Calculate difference in months
    let months = (today.getFullYear() - startDate.getFullYear()) * 12;
    months += today.getMonth() - startDate.getMonth();

    // Calculate years and remaining months
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    // Format duration string
    let duration;
    if (years === 0) {
        duration = `${remainingMonths} mois`;
    } else {
        duration = `${years} an${years > 1 ? 's' : ''} et ${remainingMonths} mois`;
    }

    document.getElementById('durationAMES').textContent = `février 2024 - aujourd'hui • ${duration}`;
}

function toggleDescription(companyId){
    const description = document.getElementById(companyId);
    description.classList.toggle('hidden');
}

main();
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


async function getUser(token) {
    const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token 
        }
    });

    if (response.ok) {                
        document.getElementById("log").href = "https://ames-pro.vercel.app/logout"
        const userData = await response.json();
        console.log(userData);
    } else {
        document.getElementById("log").href = "https://ames-pro.vercel.app/login"
        console.log('Failed to fetch user data');
    }
}
