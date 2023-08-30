let count = 0
let id_1;
let id_2;

let SCORE = 0;
let FAILS = 0;
let totalAttempts = 0;

const images = ["dog.jpg", "cat.jpg", "dog.jpg", "elephant.jpg", "cat.jpg", "elephant.jpg","cow.jpg","frog.jpg","frog.jpg"];

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [array[i], array[j]] = [array[j], array[i]];
    }

}

shuffle(images);

const griditems = document.querySelectorAll(".grid-item");
Array.from(griditems).forEach((Element, index) => {
    
    Element.style.backgroundImage = `url(${images[index]})`;
    
})

Array.from(document.getElementsByClassName("overlay")).forEach((Element) => {
    Element.classList.add("op-0");
})

setTimeout(() => {
    Array.from(document.getElementsByClassName("overlay")).forEach((Element) => {
        Element.classList.remove("op-0");
    })
},7000)



const overlays = document.querySelectorAll('.overlay');
Array.from(overlays).forEach(e => {
    e.addEventListener('click', (element) => {
        e.classList.add('op-0');
        count++;
        if (count == 1) {
            id_1 = element.target.id;
            console.log(id_1);
        }
        if (count == 2) {
            id_2 = element.target.id;
            console.log(id_2);
            checkMatch(id_1, id_2);
        }
    })
})

const checkMatch = (id1, id2) => {
    let style_1;
    let style_2;
    const selectedItem1 = document.getElementById(id1);
    const selectedItem2 = document.getElementById(id2);
    const gridItem1 = selectedItem1.parentElement;
    const gridItem2 = selectedItem2.parentElement;

    style_1 = getComputedStyle(gridItem1).getPropertyValue("background-image");
   
    style_2 = getComputedStyle(gridItem2).getPropertyValue("background-image");
    

    if (style_1 == style_2) {
        setTimeout(() => {
            showDialog("Both images match!", () => {
                // console.log("User clicked OK!");
                selectedItem1.classList.remove('op-0');
                selectedItem2.classList.remove('op-0');
                SCORE++;
                totalAttempts++;
                document.getElementById("score").innerText = "Your Score: " + SCORE;
                document.getElementById("attempts").innerText = "Total Attempts " + totalAttempts;
                setTimeout(() => {
                    if (SCORE === 5) {
                        alert("Congratulations! You Won!");
                        window.location.reload();

                    }
                }, 400)
            })
        }, 400);
        count = 0;
    }
    else {
        setTimeout(() => {
            showDialog("Images do not match!", () => {
                selectedItem1.classList.remove('op-0');
                selectedItem2.classList.remove('op-0');
                FAILS++;
                totalAttempts++;
                document.getElementById("fails").innerText = "Failed Attempts: " + FAILS;
                document.getElementById("attempts").innerText = "Total Attempts: " + totalAttempts;
                setTimeout(() => {
                    if (FAILS === 3) {
                        alert("Gameover! Try Again!");
                        window.location.reload();

                    }
                }, 100)
            })
        }, 400);
        count = 0;

    }
}


const showDialog = (message, callback) => {
    
    alert(message);
    if (typeof callback === 'function') {
        callback();
    }

}



