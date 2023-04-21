const img = new Image();
img.src = 'cat2.jpg';
img.crossOrigin = "Anonymous";
img.onload = function() {
    draw(this);
};

function draw(img) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
        0, 0, canvas.width, canvas.height); // destination rectangle
    img.style.display = 'none';
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const invert =  () => {
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];     // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    };

    const invertLine =  () => {
        function* iter() {
            for (let i = 0; i < data.length; i += 4) {
                data[i] = data[i]^255;     // red
                data[i + 1] = data[i + 1]^255; // green
                data[i + 2] = data[i + 2]^255; // blue

                if(i%1000 === 0) {
                    setTimeout(() => {
                        ctx.putImageData(imageData, 0, 0);
                        worker.next();
                    }, 0);
                    yield;
                }
            }
        }

        const worker = iter();
        worker.next();
    };

    const grayscale = () => {
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    };

    const animationColor = () => {
        const time = Date.now();
        const tick = () => {
            const elapsedTime = Date.now() - time;
            const chost1Angle = elapsedTime * 0.5
            const chost2Angle = -elapsedTime * 0.23
            for (let i = 0; i < data.length; i += 4) {
                data[i] = data[i] + Math.cos(chost1Angle)*14;     // red
                data[i + 1] = data[i + 1] + Math.sin(chost2Angle)*4; // green
                data[i + 2] = data[i + 2] +  Math.sin(chost1Angle) * (1 + Math.sin(chost1Angle * 0.42))*10; // blue
            }
            ctx.putImageData(imageData, 0, 0);
            window.requestAnimationFrame(tick)
        }
        tick();
    }

    const invertbtn = document.getElementById('invertbtn');
    invertbtn.addEventListener('click', invert);
    const invertbtn1 = document.getElementById('invertbtn1');
    invertbtn1.addEventListener('click', invertLine);
    const grayscalebtn = document.getElementById('grayscalebtn');
    grayscalebtn.addEventListener('click', grayscale);
    const animation = document.getElementById('animation');
    animation.addEventListener('click', animationColor);
}