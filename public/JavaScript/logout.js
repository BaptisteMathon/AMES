const token = localStorage.getItem("token")

getUser(token)

const logoutBtn = document.getElementById("logout")
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token')

    document.cookie = "authToken=; exprires= Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    window.location.href = "/"
})

async function getUser(token){
    const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token 
        }
    });

    if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        let idUser = userData._id
        console.log(idUser)

        const users = await fetch(https://ames-database.vercel.app/getUser")
        const infoUsers = await users.json()
        console.log(infoUsers)

        infoUsers.forEach(element => {
            if(element._id === idUser){
                console.log(element)
                let username = document.getElementById("username")
                let email = document.getElementById("email")

                username.innerHTML += element.username
                email.innerHTML += element.email

                if(element.admin === true){
                    document.getElementById("Register").style.display = 'block'
                }
            }
        });
    } else {
        console.log('Failed to fetch user data');
    }
}

document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
        alert('Registration successful');
    } else {
        alert('Registration failed: ' + data.msg);
    }
});
