document.addEventListener('DOMContentLoaded', () => {
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");
    const option3 = document.getElementById("option3");
    const operator = document.getElementById("operator")
    const audio = document.getElementById("myAudio");

    let equations = []; // Array to store equations from db.json
    let answer = 0;

    // Function to fetch data from db.json and start the game
    async function startGame() {
        try {
            const response = await fetch('../db.json'); // Adjust path as necessary
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            equations = data.equations;
            
            generate_equation(); // Start the game with the first equation
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to generate a random equation and its choices
    function generate_equation() {
        if (equations.length === 0) {
            console.error('No equations available.');
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * equations.length);
        const equation = equations[randomIndex];

        let num1 = equation.num1;
        let num2 = equation.num2;
        let operation = equation.operation;
        
        // Calculate the correct answer
        switch (operation) {
            case '+':
                answer = num1 + num2;
                operator.textContent = '+';
                break;
            case '-':
                answer = num1 - num2;
                operator.textContent = '-';
                break;
            case '*':
                answer = num1 * num2;
                operator.textContent = 'x';
                break;
            case '/':
                answer = num1 / num2;
                operator.textContent = '÷';
                break;
            default:
                answer = num1 + num2; // Default to addition if no valid operation is found
                operator.textContent = '+';
                break;
        }
                
        // Generate dummy answers
        let dummyAnswer1 = generateDummyAnswer(answer);
        let dummyAnswer2 = generateDummyAnswer(answer);
        
        // Create array of all answers
        let allAnswers = [answer, dummyAnswer1, dummyAnswer2];
        
        // Shuffle the answers
        allAnswers.sort(() => Math.random() - 0.5);
        
        // Set the equation and options in the HTML
        document.getElementById('num1').textContent = num1;
        document.getElementById('num2').textContent = num2;
        // Remove setting operation and result as they are not in HTML
        option1.textContent = allAnswers[0];
        option2.textContent = allAnswers[1];
        option3.textContent = allAnswers[2];
    }
    
    // Function to generate a dummy answer different from the correct answer
    function generateDummyAnswer(correctAnswer) {
        let dummyAnswer;
        do {
            dummyAnswer = Math.floor(Math.random() * 21); // Adjust range as necessary
        } while (dummyAnswer === correctAnswer);
        return dummyAnswer;
    }

    // Event listeners for options
    option1.addEventListener('click', function() {
        if (parseInt(option1.textContent) === answer) {
            generate_equation();
        } else {
            audio.play();
        }
    });
    option2.addEventListener('click', function() {
        if (parseInt(option2.textContent) === answer) {
            generate_equation();
        } else {
            audio.play();
        }
    });
    option3.addEventListener('click', function() {
        if (parseInt(option3.textContent) === answer) {
            generate_equation();
        } else {
            audio.play();
        }
    });

    // Start the game when DOM is fully loaded
    startGame();
});