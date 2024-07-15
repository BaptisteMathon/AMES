const addTask = document.getElementById("Add");
const idProject = document.getElementById("NameProject").innerHTML;

addTask.addEventListener("click", addNewTask, false);

document.getElementById("cancel").addEventListener("click", closeWindow, false)
document.getElementById("save").addEventListener("click", sendData, false)

// document.getElementById("updateDiagramm").addEventListener("click", updateData, false)


function addNewTask() {
    document.getElementById("MainPart").style.opacity = 0.5
    document.getElementById("Add").style.opacity = 0.5
    document.getElementById("NameProject").style.opacity = 0.5
    // document.getElementById("link").style.opacity = 0.5
    document.getElementById("popup").style.display = "flex"
}

function closeWindow(){
    document.getElementById("MainPart").style.opacity = 1
    document.getElementById("Add").style.opacity = 1
    document.getElementById("NameProject").style.opacity = 1
    // document.getElementById("link").style.opacity = 1
    document.getElementById("popup").style.display = "none"
}

async function sendData(){

    const NumberOfElement = document.getElementById("MainPart").children
    let sectionCount = -1
    for (let i = 0; i < NumberOfElement.length; i++) {
        if (NumberOfElement[i].localName === 'section') {
            sectionCount++;
        }
    }

    // console.log(NumberOfElement)

    let data = ""
    let child = ""
    for (let index = 0; index < sectionCount; index++) {
        data += document.getElementById("task" + index).value + '___'
        data += document.getElementById("Ressources" + index).value + '___'
        data += document.getElementById("Debut" + index).value + '___'
        data += document.getElementById("Fin" + index).value + '___'
        data += document.getElementById("Réal" + index).value
        data += '1_2_3'

        for (let ind = 0; ind < NumberOfElement.length; ind++) {
            let childrens = NumberOfElement[ind].children[0].id
            if(childrens.slice(0, 4) == "task" && childrens.length >= 5 && childrens[4] == index){
                child += index
                child += NumberOfElement[ind].children[0].value + "___"
                child += NumberOfElement[ind].children[1].value + "___"
                child += NumberOfElement[ind].children[2].value + "___"
                child += NumberOfElement[ind].children[3].value + "___"
                child += NumberOfElement[ind].children[5].value

                if(ind != NumberOfElement.length -1){
                    child += '1_2_3'
                }
            }

        }
        // console.log(child)

    }

    data += document.getElementById("addNewTask").value + '___'
    data += document.getElementById("addNewRessource").value + '___'
    data += document.getElementById("addNewDateD").value + '___'
    data += document.getElementById("addNewDateF").value + '___'
    data += "0"

    data += "!!!" + document.getElementById("namePro").innerHTML

    if(child == ""){
        child = "null"
    }
      
    // console.log("http://localhost:3001/update/" + data + '/' + child)


    await fetch("https://ames-database.vercel.app/update/" + data + '/' + child)

    location.reload()
}

async function updateData(input){

    const NumberOfElement = document.getElementById("MainPart").children
    let sectionCount = -1
    for (let i = 0; i < NumberOfElement.length; i++) {
        if (NumberOfElement[i].localName === 'section') {
            sectionCount++;
        }
    }

    let data = ""
    let child = ""

    for (let index = 0; index < sectionCount; index++) {
        data += document.getElementById("task" + index).value + '___'
        data += document.getElementById("Ressources" + index).value + '___'
        // console.log(document.getElementById("Ressources" + index).value)
        data += document.getElementById("Debut" + index).value + '___'
        data += document.getElementById("Fin" + index).value + '___'
        data += document.getElementById("Réal" + index).value
        // console.log(index)
        // console.log(sectionCount)
        if(index !== sectionCount - 1){            
            data += '1_2_3'
        }
       
        for (let ind = 0; ind < NumberOfElement.length; ind++) {
            let childrens = NumberOfElement[ind].children[0].id
            if(childrens.slice(0, 4) == "task" && childrens.length >= 5 && childrens[4] == index){
                child += index
                child += NumberOfElement[ind].children[0].value + "___"
                child += NumberOfElement[ind].children[1].value + "___"
                child += NumberOfElement[ind].children[2].value + "___"
                child += NumberOfElement[ind].children[3].value + "___"
                child += NumberOfElement[ind].children[5].value

                if(ind != NumberOfElement.length -1){
                    child += '1_2_3'
                }
            }

        }
        // console.log(child)
    }

    data += "!!!" + document.getElementById("namePro").innerHTML

    // console.log("http://localhost:3001/update/" + data + '/' + child)

    if(child == ""){
        child = "null"
    }

    await fetch ("https://ames-database.vercel.app/update/" + data + '/' + child)

    if(input.target.id.startsWith("Debut") || input.target.id.startsWith('Fin') || input.target.id.startsWith('Réal')){
        location.reload()
    }     
}

async function loadData() {
    try {
        const response = await fetch('https://ames-database.vercel.app');
        const allProjects = await response.json();
        let tasks = ""
        let projectId = ""

        for(let i = 0; i < allProjects.length; i++){
            if(allProjects[i]["name"] === idProject){
                tasks = allProjects[i]["task"]
                projectId = allProjects[i]["_id"]
            }
        }

        let imp = document.createElement('p')
        imp.id = "namePro"
        imp.innerHTML = projectId
        document.body.appendChild(imp)        
        imp.style.display = "none"




        for (let index = 0; index < tasks.length; index++) {
            let newSection = document.createElement("section")
            newSection.id = "Diagramm"

            let underTask = document.createElement("img")
            underTask.src="/Img/plus.png"
            underTask.style.width = '20px'
            underTask.style.height = '20px'
            underTask.style.marginTop = '3px'
            underTask.style.marginRight = '5px'
            underTask.style.cursor = 'pointer'
            underTask.id = "add" + index
            newSection.appendChild(underTask)   

            let image = document.createElement('img')
            image.src = "/Img/supprimer.png"
            image.style.width = '20px'
            image.style.height = '20px'
            image.style.marginTop = '3px'
            image.style.marginRight = '5px'
            image.style.cursor = 'pointer'
            image.id = "del" + index
            newSection.appendChild(image)   
            
            let newTask = document.createElement("input")
            newTask.style.width = "150px"
            newTask.value = tasks[index]["Name"]
            newTask.id = "task" + index
            // ICI ---***----
            let newRessources = document.createElement("select")
            newRessources.style.width = "150px"
            newRessources.style.border = "none"
            newRessources.style.background = "#fff"
            newRessources.style.borderBottom = "1px solid #000"
            // newRessources.value = tasks[index]["Ressources"]
            newRessources.id = "Ressources" + index
            let newOption = document.createElement('option')
            newOption.innerHTML = tasks[index]["Ressources"]
            newOption.value = tasks[index]["Ressources"]
            newRessources.appendChild(newOption)
            // **********
            const allRessources = await fetch('http://localhost:3001/getRessources')
            const jsonRessources = await allRessources.json()
            // console.log(jsonRessources)
            let arrayRessources = []
            jsonRessources.forEach(element => {
                arrayRessources.push(element.ressources)
            });
            console.log(arrayRessources)

            let newRes;
            arrayRessources.forEach(element => {
                if(element != tasks[index]["Ressources"]){
                    newRes = document.createElement('option')
                    newRes.innerHTML = element
                    newRessources.appendChild(newRes)
                }
            });
            // console.log("json ressources")
            // console.log(jsonRessources[0].ressources)
            
            let newStart = document.createElement("input")
            newStart.style.width = "150px"
            newStart.type = "date"
            newStart.value = tasks[index]["Début"]
            newStart.id = "Debut" + index
            let newEnd = document.createElement("input")
            newEnd.style.width = "150px"
            newEnd.value = tasks[index]["Fin"]
            newEnd.type = "date"
            newEnd.id = "Fin" + index

            let newDuration = document.createElement("p")
            const date1 = new Date(tasks[index]["Début"])
            const date2 = new Date(tasks[index]["Fin"])            
            // !!!!!!!!!!!
            const millisecondsInDay = 24 * 60 * 60 * 1000
            let currentDate = date1
            let diffInDays = 0

            while(currentDate <= date2){
                const dayOfWeek = currentDate.getDay()
                if(dayOfWeek !== 0 && dayOfWeek !== 6){
                    diffInDays++
                }
                currentDate = new Date(currentDate.getTime() + millisecondsInDay)
            }

            console.log("nombre de jour ouvrable" + diffInDays)
            // !!!!!!!!!!!
            // const time1 = date1.getTime()
            // const time2 = date2.getTime()
            // const diffInMilliseconds = Math.abs(time2 - time1)
            // const millisecondsInDay = 24 * 60 * 60 * 1000
            // const diffInDays = (diffInMilliseconds / millisecondsInDay) + 1
            // console.log(diffInDays)
            newDuration.innerHTML = diffInDays 
            newDuration.id = "duration" + index
            newDuration.style.margin = "0"
            newDuration.style.padding = "5px"
            newDuration.style.width = "50px"
            newDuration.style.height = "16px"
            newDuration.style.borderBottom = "1px solid black"
            newDuration.style.textAlign = "center"

            let newReal = document.createElement("input")
            newReal.style.width = "90px"
            newReal.value = tasks[index]["Réal"]
            newReal.id = "Réal" + index

            newSection.appendChild(newTask)
            newSection.appendChild(newRessources)
            newSection.appendChild(newStart)
            newSection.appendChild(newEnd)
            newSection.appendChild(newDuration)
            newSection.appendChild(newReal)            

            document.getElementById("MainPart").appendChild(newSection)

            let newRest = document.createElement("p")
            const DurationNumber = document.getElementById("duration" + index).innerHTML
            const Rest = DurationNumber - tasks[index]["Réal"]
            newRest.innerHTML = Rest
            newRest.id = "RestAfaire"
            newRest.style.width = "90px"
            newSection.appendChild(newRest)

            // console.log(tasks[index]['children'])

            // *****************************************************************
            // Chargement des enfants des tâches
            // *****************************************************************

            tasks[index]['children'].forEach((childElt, ind) => {                
                // console.log(childElt)
                // console.log(ind)
                // console.log(childElt["Name"])

                let childSection = document.createElement("div")
                childSection.id = "childSection"

                let childTask = document.createElement("input")
                childTask.style.width = "150px"
                childTask.value = childElt["Name"]
                childTask.id = "task" + index + '-' + ind
                childTask.style.background = "#87c53e"
                childTask.style.marginLeft = "50px"
                // ****************************************
                let childRessources = document.createElement("select")
                childRessources.style.width = "150px"
                // childRessources.value = childElt["Ressources"]
                childRessources.id = "Ressources" + index + '-' + ind
                childRessources.style.background = "#87c53e"
                childRessources.style.border = "none"
                childRessources.style.background = "#87c53e"
                childRessources.style.borderBottom = "1px solid #000"
                let childOption = document.createElement("option")
                // console.log(childElt["Ressources"])
                childOption.innerHTML = childElt["Ressources"]
                childOption.value = childElt["Ressources"]
                childRessources.appendChild(childOption)
                let newOpt;
                arrayRessources.forEach(elt => {
                    if(elt != childElt["Ressources"]){
                        newOpt = document.createElement('option')
                        newOpt.innerHTML = elt
                        childRessources.appendChild(newOpt)
                    }
                })
                // ****************************************
                let childStart = document.createElement("input")
                childStart.style.width = "150px"
                childStart.type = "date"
                childStart.value = childElt["Début"]
                childStart.id = "Debut" + index + '-' + ind
                childStart.style.background = "#87c53e"
                let childEnd = document.createElement("input")
                childEnd.style.width = "150px"
                childEnd.value = childElt["Fin"]
                childEnd.type = "date"
                childEnd.id = "Fin" + index + '-' + ind
                childEnd.style.background = "#87c53e"

                let childDuration = document.createElement("p")
                const childDate1 = new Date(childElt["Début"])
                const childDate2 = new Date(childElt["Fin"])
                // TESTESTEST
                const childMillisecondsInDay = 24 * 60 * 60 * 1000
                let currentDate2 = childDate1
                let childDiffInDays = 0

                while(currentDate2 <= childDate2){
                    const dayOfWeek2 = currentDate2.getDay()
                    if(dayOfWeek2 !== 0 && dayOfWeek2 !== 6){
                        childDiffInDays++
                    }
                    currentDate2 = new Date(currentDate2.getTime() + childMillisecondsInDay)
                }
                // const childTime1 = childDate1.getTime()
                // const childTime2 = childDate2.getTime()
                // const childDiffInMilliseconds = Math.abs(childTime2 - childTime1)
                // const childMillisecondsInDay = 24 * 60 * 60 * 1000
                // const childDiffInDays = (childDiffInMilliseconds / childMillisecondsInDay) + 1
                // console.log(childDiffInDays)
                childDuration.innerHTML = childDiffInDays
                childDuration.id = "duration" + index + '-' + ind
                childDuration.style.margin = "0"
                childDuration.style.padding = "5px"
                childDuration.style.width = "50px"
                childDuration.style.height = "16px"
                childDuration.style.borderBottom = "1px solid black"
                childDuration.style.textAlign = "center"
                childDuration.style.background = "#87c53e"

                let childReal = document.createElement("input")
                childReal.style.width = "90px"
                childReal.value = childElt["Réal"]
                childReal.id = "Réal" + index + '-' + ind
                childReal.style.background = "#87c53e"

                childSection.appendChild(childTask)
                childSection.appendChild(childRessources)
                childSection.appendChild(childStart)
                childSection.appendChild(childEnd)
                childSection.appendChild(childDuration)
                childSection.appendChild(childReal)

                document.getElementById("MainPart").appendChild(childSection)

                let childRest = document.createElement("p")
                const DurationNumber = document.getElementById("duration" + index+  '-' + ind).innerHTML
                const Rest = DurationNumber - childElt["Réal"]
                childRest.innerHTML = Rest
                childRest.id = "RestAfaire"
                childRest.style.background = "#87c53e"
                childRest.style.width = "90px"
                childSection.appendChild(childRest)
            });


            // console.log(tasks[index])
        }

        // console.log(tasks)

        const images = document.querySelectorAll('img[id^="del"]');
        for (const image of images) {
            image.addEventListener('click', delData, 'false');
        }

        const addUnderTask = document.querySelectorAll('img[id^="add"]');
        for(const underTasks of addUnderTask) {
            underTasks.addEventListener('click', addDataUnderTask, 'false')
        }

        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            // console.log(input.type)

            input.addEventListener('focus', () => {
                if(input.type == "date"){
                    input.blur()
                }
            })

            input.addEventListener('change', (event) =>{
                updateData(event)
            })

        })

        const allSelect = document.querySelectorAll('select');
        allSelect.forEach(sel => {
            sel.addEventListener('change', (event) => {
                updateData(event)
            })
        })

        mainDateInfo()
        
    } catch (error) {
        console.error({ error });
    }
}


async function delData(event){
    const imageId = event.target.id
    const lastCharacter = imageId[imageId.length - 1]
    // console.log(`Le dernier caractère de l'ID est : ${lastCharacter}`)

    const NumberOfElement = document.getElementById("MainPart").children
    let sectionCount = -1
    for (let i = 0; i < NumberOfElement.length; i++) {
        if (NumberOfElement[i].localName === 'section') {
            sectionCount++;
        }
    }

    let data = ""
    let child = ""
    let taskdelete = 0

    for (let index = 0; index < sectionCount; index++) {        
        if(index != lastCharacter){            
            // console.log("index : " + index)
            // console.log("lastCharacter : " + lastCharacter)
            data += document.getElementById("task" + index).value + '___'
            data += document.getElementById("Ressources" + index).value + '___'
            data += document.getElementById("Debut" + index).value + '___'
            data += document.getElementById("Fin" + index).value + '___'
            data += document.getElementById("Réal" + index).value
            if(index !== sectionCount - 1){
                data += '1_2_3'
            }

            for (let ind = 0; ind < NumberOfElement.length; ind++) {
                let childrens = NumberOfElement[ind].children[0].id
                if(childrens.slice(0, 4) == "task" && childrens.length >= 5 && childrens[4] == index){
                    if(taskdelete === 0){
                        child += index
                    } else {
                        child += index - 1
                    }                    
                    child += NumberOfElement[ind].children[0].value + "___"
                    child += NumberOfElement[ind].children[1].value + "___"
                    child += NumberOfElement[ind].children[2].value + "___"
                    child += NumberOfElement[ind].children[3].value + "___"
                    child += NumberOfElement[ind].children[5].value
    
                    if(ind != NumberOfElement.length -1){
                        child += '1_2_3'
                    }
                }
    
            }
        } else {
            taskdelete = 1
        }
    }

    if(data.slice(-5) === "1_2_3"){
        // console.log("n")
        data = data.slice(0, -5)
    }

    data += "!!!" + document.getElementById("namePro").innerHTML

    if(child == ""){
        child = "null"
    }

    // console.log("http://localhost:3001/update/" + data + '/' + child)

    await fetch ("https://ames-database.vercel.app/" + data + '/' + child)

    location.reload()
}

async function addDataUnderTask (){
    const imageId = event.target.id
    const lastChar = imageId[imageId.length -1]

    const NumberOfElement = document.getElementById("MainPart").children
    let sectionCount = -1
    for (let i = 0; i < NumberOfElement.length; i++) {
        if (NumberOfElement[i].localName === 'section') {
            sectionCount++;
        }
    }

    let data = ""
    let child = ""

    for (let index = 0; index < sectionCount; index++) {        
        // console.log("index : " + index)
        // console.log("lastCharacter : " + lastCharacter)
        data += document.getElementById("task" + index).value + '___'
        data += document.getElementById("Ressources" + index).value + '___'
        data += document.getElementById("Debut" + index).value + '___'
        data += document.getElementById("Fin" + index).value + '___'
        data += document.getElementById("Réal" + index).value
        if(index !== sectionCount - 1){
            data += '1_2_3'
        }

        for (let ind = 0; ind < NumberOfElement.length; ind++) {
            let childrens = NumberOfElement[ind].children[0].id
            if(childrens.slice(0, 4) == "task" && childrens.length >= 5 && childrens[4] == index){
                child += index
                child += NumberOfElement[ind].children[0].value + "___"
                child += NumberOfElement[ind].children[1].value + "___"
                child += NumberOfElement[ind].children[2].value + "___"
                child += NumberOfElement[ind].children[3].value + "___"
                child += NumberOfElement[ind].children[5].value

                if(ind != NumberOfElement.length -1){
                    child += '1_2_3'
                }
            }

        }
    }

    if(data.slice(-5) === "1_2_3"){
        // console.log("n")
        data = data.slice(0, -5)
    }

    data += "!!!" + document.getElementById("namePro").innerHTML

    child += "1_2_3" + lastChar + "____________0"

    // console.log("http://localhost:3001/update/" + data + '/' + child)

    await fetch ("https://ames-database.vercel.app/update/" + data + '/' + child)

    location.reload()
}

async function mainDateInfo(){
    const allStartDate = document.querySelectorAll('input[id^="Debut"]')
    const allEndDate = document.querySelectorAll('input[id^="Fin"]')

    let arrayAllDate = []
    allStartDate.forEach(date => {
        if(date.value != ""){
            arrayAllDate.push(date.value)
        }
    });
    allEndDate.forEach(date => {
        if(date.value != ""){
            arrayAllDate.push(date.value)
        }
    });

    const uniqueSortedDates = Array.from(new Set(arrayAllDate))
        .map(date => new Date(date))
        .sort((a, b) => a - b)
        .map(date => date.toISOString().split('T')[0])

    // console.log(uniqueSortedDates)

    let separator = document.createElement('section')
    let creationElt = ""
    uniqueSortedDates.forEach((dates, index) => {
        creationElt = document.createElement('div')
        creationElt.innerHTML = dates
        // creationElt.style.width = "85px"
        creationElt.style.width = "100px"
        creationElt.style.height = "23px"
        creationElt.style.paddingTop = "5px"
        creationElt.style.textAlign = "center"
        if(index % 2 === 0){
            creationElt.style.background = "#87c53e"
        }
        separator.appendChild(creationElt)
        // console.log("index" + index)
    });
    document.getElementById("SecondDiv").appendChild(separator)

    let tempDebut = ""
    let tempFin = ""
    let cptStart = 0
    let cptLong = 0
    let cptFinLong = 0
    let tempCreation = ""
    let boolTest = false;
    for (let index = 0; index < allStartDate.length; index++) {
        cptStart = 0
        cptLong = 0
        cptFinLong = 0
        tempDebut = allStartDate[index].value
        tempFin = allEndDate[index].value
        boolTest = false

        uniqueSortedDates.forEach(tempDate => {
            // console.log("uniquesorteddates : " + tempDate)
            // console.log(tempFin)
            if(tempDate !== tempDebut && cptLong === 0 && boolTest === false){
                cptStart++
            } else if(tempDate !== tempFin && cptFinLong === 0) {
                cptLong++
            } else {
                cptFinLong = 1
                if(tempDebut === tempFin){
                    cptLong = 0
                    boolTest = true
                }
            }
        });

        cptLong++

        // console.log("longueur : " + cptLong)
        // console.log("debut : " + cptStart)
        cptStart = cptStart * 100
        cptLong = cptLong * 100

        cptStart += 5
        // cptLong -= 5

        tempCreation = document.createElement("div")
        tempCreation.style.height = "25px"
        tempCreation.style.width = cptLong + "px"
        // zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
        tempCreation.style.marginLeft = cptStart + "px"
        tempCreation.style.marginTop = "2px"
        // tempCreation.style.marginBottom = "1px"
        if(tempDebut !== "" && tempFin !== ""){            
            tempCreation.style.background = "#0ea14a"
        }
        // tempCreation.style.borderRadius = "10px"

        document.getElementById("SecondDiv").appendChild(tempCreation)

        // console.log(index)
        // console.log(tempDebut)
        // console.log(tempFin)
        // console.log(cptStart)
        // console.log(cptLong)
        // console.log("*************")
    }
    // console.log(enfantMainPart)

}

loadData();
