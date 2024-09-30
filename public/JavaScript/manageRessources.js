function main(){
    const ressourcesButton = document.getElementById("AddRessources")
    ressourcesButton.addEventListener("click", () => {
        document.getElementById("div1").style.opacity = "0.3"
        document.getElementById("section1").style.opacity = "0.3"
        document.getElementById("popup").style.opacity = "0.3"
        document.getElementById("manageRessource").style.display = "flex"
    })

    document.getElementById("sortir").addEventListener("click", () => {
        document.getElementById("div1").style.opacity = "1"
        document.getElementById("section1").style.opacity = "1"
        document.getElementById("popup").style.opacity = "1"
        document.getElementById("manageRessource").style.display = "none"
    })

    const AjoutRessource = document.getElementById("ressource1")
    document.getElementById("inputRessource").value = ""
    
    AjoutRessource.addEventListener("click", async () => {        
        const valueRessource = document.getElementById("inputRessource").value
        await fetch("https://ames-database.vercel.app/addRessource/" + valueRessource)
        location.reload()
    })

    const delRessource = document.getElementById("delRessources")
    delRessource.addEventListener("click", async () => {
        document.getElementById("delRessources").style.display = "none"
        const allRessource = await fetch("https://ames-database.vercel.app/getRessources")
        const jsonRessource = await allRessource.json()
        // let arrayRessource = []
        jsonRessource.forEach(element => {
            let Pdiv = document.createElement("div")
            Pdiv.style.display = "flex"
            Pdiv.style.alignItems = "center"
            // arrayRessource.push(element.ressources)
            let Pressource = document.createElement("p")
            Pressource.innerHTML = element.ressources
            let Pimg = document.createElement("img")
            Pimg.src = "/Img/fermer2.png"
            Pimg.id = element.ressources
            Pimg.style.cursor = "pointer"
            Pimg.addEventListener('click', async () => {
                await fetch("https://ames-database.vercel.app/deleteRessource/" + Pimg.id)
                location.reload()
            })

            
            Pdiv.appendChild(Pimg)
            Pdiv.appendChild(Pressource)
            document.getElementById("ressourcesToDel").appendChild(Pdiv)
        });
        // console.log(arrayRessource)
    })
}

main()

