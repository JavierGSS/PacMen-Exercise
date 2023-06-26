var pos = 0;
    const pacArray = [
        ['images/PacMan1.png', 'images/PacMan2.png'],
        ['images/PacMan3.png', 'images/PacMan4.png']
    ];
    var direction = 0;
    const pacMen = []; // This array holds all the pacmen

    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }
    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(10); // {x:?, y:?}
        let position = setToRandom(200);
        
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.style.position = 'absolute';
        newimg.src = pacArray[0][0];
        newimg.width = 100;
        newimg.style.top = position.x;
        newimg.style.left = position.y;
        game.appendChild(newimg);

        return {
            position: position, 
            velocity: velocity,
            newimg,
        }
    }

    function update() {
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            checkCollisions(item)
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x;
            item.newimg.style.top = item.position.y;
        })
        setTimeout(update, 20);
    }

    function checkCollisions(item) {
        if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth) {
                item.newimg.src = pacArray[1][0];
                item.velocity.x = -item.velocity.x;
            }
        
        if (item.position.x + item.velocity.x < 0){
            item.newimg.src = pacArray[0][0];
            item.velocity.x = -item.velocity.x;
        }

        if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || 
            item.position.y + item.velocity.y < 0) {
                item.velocity.y = -item.velocity.y;
        }
    } 

    function makeOne() {
        pacMen.push(makePac()); // add a new PacMan
    }