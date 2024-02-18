import "./style.css";

function calculatePrimes() {
    const start = parseInt(document.getElementById("start").value, 10);
    const end = parseInt(document.getElementById("end").value, 10);

    if (!isNaN(start) && !isNaN(end)) {

        const worker = new Worker(
            new URL('worker.js', import.meta.url),
            { type: 'module' }
        );
        worker.postMessage({ start, end });

        worker.onmessage = function (event) {
            const count = event.data;
            document.getElementById(
                "result"
            ).textContent = `Number of prime numbers between ${start} and ${end}: ${count}`;
        };
    } else {
        document.getElementById("result").textContent =
            "Please enter valid numbers.";
    }
}

document
    .getElementById("calculatePrimes")
    .addEventListener("click", calculatePrimes);
