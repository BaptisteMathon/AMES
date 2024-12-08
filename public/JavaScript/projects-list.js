const token = localStorage.getItem("token")

getUser(token)

async function getUser(token) {
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

        const users = await fetch("https://ames-database.vercel.app/getUser")
        const infoUsers = await users.json()
        console.log(infoUsers)

        infoUsers.forEach(element => {
            if(element._id === idUser){
                console.log(element)
                if(element.admin === true){
                    // document.getElementById("Register").style.display = 'block'
                    console.log('admin')
                    document.getElementById("add-project").style.display = "flex"
                    // const allImg = document.getElementsByTagName("img")
                    const allImg = document.querySelectorAll('img[src="/Img/supprimer.png"]')
                    for(const element of allImg){
                        console.log(element.id)
                        document.getElementById(element.id).style.display = "block"                        
                    }                    
                } else {
                    console.log("pas admin")
                }
            }
        });
    } else {
        console.log('Failed to fetch user data');
        window.location.href = "https://ames-pro.vercel.app/login"
    }
}

document.getElementById("addProject").addEventListener('click', async function() {
    await fetch( "https://ames-database.vercel.app/addProject/" + document.getElementById("newProject").value)
    document.getElementById("newProject").value = ""
    location.reload()    
})

document.addEventListener("DOMContentLoaded", async function() {
    const images = document.querySelectorAll('img[src="/Img/supprimer.png"]');
    images.forEach( async function(image) {
        image.addEventListener('click', async function(event) {
            const imageId = event.target.id;
            console.log("ID de l'image cliquée : ", imageId);
            const projects = await fetch("https://ames-database.vercel.app")
            const detailProjects = await projects.json()
            let idP = ""
            detailProjects.forEach(element => {
                if(element.name === imageId){
                    idP = element._id
                }
            });
            const del = window.confirm(`Voulez vous vraiment supprimer le projet: ${imageId}`)
            if(del){
                console.log("idP : " + idP)
                await fetch("https://ames-database.vercel.app/deleteProject/" + idP)
                location.reload()
            }
        });
    });
});
