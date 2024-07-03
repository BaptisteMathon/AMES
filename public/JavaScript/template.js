async function InfoProject(){
    const url = "https://ames-database.vercel.app/projects/"
    const nameProject = document.getElementById('name-project').innerHTML

    fetch(url + nameProject)
        .then(response => {
            return response.json()
        })
        .then(data => {
            document.getElementById("title").innerHTML = data.name
            // console.log(nameProject)
            // console.log(data.title.mainTitle)
            document.getElementById('main-title').value = data.title.mainTitle
            document.getElementById("secondary-title").value = data.title.secondTitle
            document.getElementById("date").value = data.date
            let ArrayTitre = data.taches.split(';')
            // console.log(ArrayTitre)
            let cptr = 0
            let arraySousTitre = data.soustache.split(';')
            // console.log(arraySousTitre)
            for (let i = 0; i < ArrayTitre.length; i++) {
                let arraysousTitre2 = arraySousTitre[i].split('/')
                // console.log(arraysousTitre2)
                let element = ArrayTitre[i];
                cptr++;
                let newSec = document.createElement('section');
                let newTitle = document.createElement('input');
                newTitle.type = 'text';
                newTitle.value = element;
                newTitle.id = 'Title' + cptr;
                let newId = document.createElement('p');
                newId.innerHTML = cptr;
                let newSousSec = document.createElement("div")
                let cptr02 = 0

                let addSousTitre = document.createElement('button')
                addSousTitre.innerHTML = '+'
                addSousTitre.id = 'addSS' + cptr

                let deleteSousTitre = document.createElement('button')
                deleteSousTitre.innerHTML = '-'
                deleteSousTitre.id = 'delSS' + cptr
                arraysousTitre2.forEach(element => {
                    cptr02++
                    let SousSecP = document.createElement('input')
                    SousSecP.value = element
                    SousSecP.type = 'text'
                    SousSecP.id = 'ss' + cptr + cptr02
                    newSousSec.appendChild(SousSecP)
                    newSousSec.id = 'tempclass' + cptr
                    newSousSec.className = "classSS"
                });
                // newSec.appendChild(newSousSec)
                newSec.className = "flex-sec"
                let div1 = document.createElement('div')
                div1.appendChild(newTitle)
                div1.appendChild(addSousTitre)
                div1.appendChild(deleteSousTitre)
                div1.appendChild(newSousSec)
                newSec.appendChild(newId);
                newSec.appendChild(div1);
                document.getElementById("main-template").appendChild(newSec);

            }
            // console.log(ArrayTitre)
            // console.log(arraySousTitre)
            const buttons = document.querySelectorAll('[id^="addSS"]');
            buttons.forEach(button => {
                button.addEventListener('click', function(event) {
                    const id = button.id;
                    let indice = id[id.length - 1] - 1
                    let chaine = arraySousTitre[indice]
                    chaine += '/sous Titre'
                    // console.log(chaine)
                    // console.log(arraySousTitre)
                    arraySousTitre[indice] = chaine
                    
                    let joinSS = arraySousTitre.join(';')
                    console.log(joinSS)
                    fetch("https://ames-database.vercel.app/projects/" + data.name, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "name": data.name,
                            "id": data.name,
                            "title": {
                                "mainTitle": data.title.mainTitle,
                                "secondTitle": data.title.secondTitle
                            },
                            "date": data.date,
                            "taches": data.taches,
                            "soustache": joinSS
                        })
                    })
                });
            });

            const buttons2 = document.querySelectorAll('[id^="delSS"]');
            buttons2.forEach(button2 => {
                button2.addEventListener('click', function(event) {
                    const id = button2.id;

                    let indice = id[id.length - 1] - 1
                    console.log(indice)
                    console.log(ArrayTitre)
                    console.log(arraySousTitre)
                    ArrayTitre.splice(indice, 1)
                    arraySousTitre.splice(indice, 1)
                    console.log(ArrayTitre)
                    console.log(arraySousTitre)
                    let newArr1 = ArrayTitre.join(';')
                    let newArr2 = arraySousTitre.join(';')
                    console.log(newArr1)
                    console.log(newArr2)
                    fetch("https://ames-database.vercel.app/projects/" + data.name, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "name": data.name,
                            "id": data.name,
                            "title": {
                                "mainTitle": data.title.mainTitle,
                                "secondTitle": data.title.secondTitle
                            },
                            "date": data.date,
                            "taches": newArr1,
                            "soustache": newArr2
                        })
                    })
                });
            });

        })
}

InfoProject()

function Update(){
    const nameProject = document.getElementById('name-project').innerHTML
    const upMainTitle = document.getElementById("main-title").value
    const upSecondtitle = document.getElementById("secondary-title").value
    const upDate = document.getElementById("date").value
    const nbrSec = document.getElementById("main-template").children.length - 1
        
    let ArrayTitle = []
    let ArraySousTitle = []
    for (let index = 1; index <= nbrSec; index++) {
        ArrayTitle.push(document.getElementById("Title" + index).value) 

        let nbrSoust = document.getElementById('tempclass' + index).children.length
        // console.log('nombre: '+ nbrSoust)

        let tempArray = []
        for (let index2 = 1; index2 <= nbrSoust; index2++) {
            console.log(document.getElementById("ss" + index + index2).value)
            tempArray.push(document.getElementById("ss" + index + index2).value)
        }
        let tempSS = tempArray.join('/')
        ArraySousTitle.push(tempSS)
    }
    let strTitle = ArrayTitle.join(';')
    let sousTitre = ArraySousTitle.join(';')
    // console.log(strTitle)
    // console.log('sous titre: ' + sousTitre)
    fetch("https://ames-database.vercel.app/projects/" + nameProject, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": nameProject,
            "id": nameProject,
            "title": {
                "mainTitle": upMainTitle,
                "secondTitle": upSecondtitle
            },
            "date": upDate,
            "taches": strTitle,
            "soustache": sousTitre
        })
    })
}

function AddTitle(){
    const nameProject = document.getElementById('name-project').innerHTML
    const upMainTitle = document.getElementById("main-title").value
    const upSecondtitle = document.getElementById("secondary-title").value
    const upDate = document.getElementById("date").value
    const nbrSec = document.getElementById("main-template").children.length - 1
    let ArrayTitle = []
    let ArraySousTitle = []
    for (let index = 1; index <= nbrSec; index++) {
        ArrayTitle.push(document.getElementById("Title" + index).value)   
        
        let nbrSoust = document.getElementById('tempclass' + index).children.length
        
        let tempArray = []
        for (let index2 = 1; index2 <= nbrSoust; index2++) {
            tempArray.push(document.getElementById("ss" + index + index2).value)
        }
        let tempSS = tempArray.join('/')
        ArraySousTitle.push(tempSS)
    }
    let strTitle = ArrayTitle.join(';')
    let sousTitre = ArraySousTitle.join(';')
    strTitle += ';Titre'
    sousTitre += ';T1'
    console.log(strTitle)

    fetch("https://ames-database.vercel.app/projects/" + nameProject, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": nameProject,
            "id": nameProject,
            "title": {
                "mainTitle": upMainTitle,
                "secondTitle": upSecondtitle
            },
            "date": upDate,
            "taches": strTitle,
            "soustache": sousTitre
        })
    })

}
