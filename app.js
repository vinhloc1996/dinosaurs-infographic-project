
    // Create Dino Constructor
    function Dino({species, weight, height, diet, fact}, index) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.fact = fact;
        this.index = index
    }

    // Create Dino Objects
    const Dinos = getDinos();
    let objects = []
    let indexes = [5]
    for (let dino of Dinos) {
        let index = randomArrayIndex(indexes);
        indexes.push(index)
        let newDino = new Dino(dino, index);
        objects.push(newDino);
    }

    // Create Human Object
    let human = (function() {
        let species = "";
        let weight = 0;
        let height = 0;
        let diet = "";
        
        return {
            getSpecies: () => species,
            setSpecies: (setSpecies) => species = setSpecies,
            getWeight: () => weight,
            setWeight: (setWeight) => weight = setWeight,
            getHeight: () => height,
            setHeight: (setHeight) => height = setHeight,
            getDiet: () => diet,
            setDiet: (setDiet) => diet = setDiet,
            isHuman: true,
            index: 5
        }
    })()


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    let compareDiet = (dino) => {
        let result = "";
        if(dino.diet == human.getDiet()) {
            if(dino.diet == 'herbavor') {
                result = `${dino.species} just only eats plant, ${human.getSpecies()} don't need to worry when facing it`
            } else if (dino.diet == 'carnivor') {
                result = `${dino.species} and ${human.getSpecies()} shares the same food chain, two species can hunt each other`
            } else {
                result = `${dino.species} and ${human.getSpecies()} eats each other and plants`
            }
        } else {
            if (dino.diet == 'carnivor') {
                result = `Beware, ${dino.species} shown no mercy with food`
            } else if (dino.diet == 'herbavor') {
                result = `${dino.species} ate plants only`
            }
        }
        return result;
    }
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    let compareWeight = (dino) => {
        console.log('compare',dino)
        let result = "";
        if(dino.weight == human.getWeight()) {
            return `${dino.species}'s child had the same weigth with the mature ${human.getSpecies()}`
        } else if (dino.weight > human.getWeight()) {
            result = `${dino.species} had wight over than ${human.getSpecies()}`
        } else {
            result = `${dino.species} needed to gain ${human.getWeight() - dino.weight} lbs to equal with ${human.getSpecies()}`
        }
        return result;
    }
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    let compareHeight = (dino) => {
        let result = "";
        console.log('compare',dino)
        if(dino.height == human.getHeight()) {
            return `${dino.species}'s child had the same weigth with the mature ${human.getSpecies()}`
        } else if (dino.height > human.getHeight()) {
            result = `${dino.species} had height over ${dino.height/human.getHeight()*100}% than ${human.getSpecies()}`
        } else {
            result = `${dino.species} looked smaller about ${human.getHeight() - dino.height} inches with ${human.getSpecies()}`
        }
        return result;
    }

    // Use IIFE to get human data from form
    document.getElementById("btn").addEventListener('click', () => {
        // e.preventDefault();
        let name = document.getElementById("name").value
        let feet = document.getElementById("feet").value
        let inches = document.getElementById("inches").value
        let weight = document.getElementById("weight").value
        let diet = document.getElementById("diet").value
        let height = convertFeetToInches(feet) + inches

        human.setDiet(diet)
        human.setSpecies(name)
        human.setHeight(height)
        human.setWeight(weight)
        objects.push(human)
        document.getElementById("dino-compare").hidden =  true
        appendToDOM();
    })

    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen

    function appendToDOM() {
        let grid = document.getElementById('grid');
        
        let tiles = objects.map(e => {
            if (e.index != 5){
                let i = randomArrayIndex([], 4, 1)
                switch (i) {
                    case 1:
                        e.fact = compareDiet(e)
                        break;
                    case 2:
                        e.fact = compareHeight(e)
                        break;
                    case 3:
                        e.fact = compareWeight(e)
                        break;
                }
            }
            return e;
        }).sort((a, b) => a.index - b.index)
        for (let tile of tiles) {
            let divGrid = document.createElement('div')
            divGrid.classList.add('grid-item')
            let species = document.createElement('h3')
            let img = document.createElement('img')
            let fact = document.createElement('p');
            if (tile.hasOwnProperty('isHuman')) {
                img.src = `images/human.png`
                species.innerHTML = tile.getSpecies()
            }else {
                img.src = `images/${tile.species.toLowerCase()}.png`
                if (tile.species == 'Pigeon') {
                    fact.innerHTML = "All birds are Dinosaurs"
                }else{
                    fact.innerHTML = tile.fact;
                }
                species.innerHTML = tile.species;
            }
            divGrid.appendChild(species);
            divGrid.appendChild(fact)
            divGrid.appendChild(img)
            grid.appendChild(divGrid)
        }

        grid.hidden = false
    }


// On button click, prepare and display infographic

function convertFeetToInches(ft) {
    return ft * 12
}

function randomArrayIndex(arr, limit = 9, offset = 1) {
    while(arr.length < limit){
        var r = Math.floor(Math.random() * limit) + offset;
        if(arr.indexOf(r) === -1) return r;
    }
}

