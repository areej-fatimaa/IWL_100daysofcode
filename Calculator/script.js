const inputValue = document.getElementById("user-input");
const historyList = document.getElementById("history-list");
const historySidebar = document.getElementById("history-sidebar");
const toggleHistoryBtn = document.getElementById("toggle-history-btn");
let history = [];

// Load history from localStorage when the page loads
window.onload = function() {
  loadHistory();
};

// Handle numbers input
document.querySelectorAll(".numbers").forEach(function (item) {
  item.addEventListener("click", function (e) {
    if (inputValue.innerText === "NaN" || inputValue.innerText === "0") {
      inputValue.innerText = ""; // Clear input if NaN or 0
    }
    inputValue.innerText += e.target.innerHTML.trim(); // Append the clicked number
  });
});

// Handle operations input
document.querySelectorAll(".operations").forEach(function (item) {
  item.addEventListener("click", function (e) {
    const operator = e.target.innerHTML.trim();
    let lastValue = inputValue.innerText.slice(-1);

    if (operator === "=") {
      try {
        const expression = inputValue.innerText;
        const result = eval(expression); // Evaluate the expression
        inputValue.innerText = result;

        // Add to history and save to localStorage
        addToHistory(expression, result);

      } catch {
        inputValue.innerText = "NaN"; // Handle invalid expressions
      }
    } else if (operator === "AC") {
      inputValue.innerText = "0"; // Reset the calculator
    } else if (operator === "DEL") {
      inputValue.innerText = inputValue.innerText.slice(0, -1); // Delete last character
      if (inputValue.innerText.length === 0) {
        inputValue.innerText = "0"; // Set to 0 if the input is empty
      }
    } else {
      // Add operator only if the last character is a number
      if (!isNaN(lastValue)) {
        inputValue.innerText += operator;
      }
    }
  });
});

// Function to add expressions and results to history
function addToHistory(expression, result) {
  const historyEntry = `${expression} = ${result}`;
  history.push(historyEntry);

  // Save the history to localStorage
  localStorage.setItem("calcHistory", JSON.stringify(history));

  // Update the history list in the UI
  updateHistoryUI();
}

// Function to load history from localStorage
function loadHistory() {
  const storedHistory = localStorage.getItem("calcHistory");
  if (storedHistory) {
    history = JSON.parse(storedHistory);
    updateHistoryUI(); // Update the UI with the stored history
  }
}

// Function to update the history UI
function updateHistoryUI() {
  historyList.innerHTML = ""; // Clear current list
  history.forEach(function (entry) {
    const li = document.createElement("li");
    li.innerText = entry;
    historyList.appendChild(li);
  });
}

// Function to clear the history
function clearHistory() {
  history = [];
  localStorage.removeItem("calcHistory"); // Remove from localStorage
  updateHistoryUI(); // Clear the history display
}

// Toggle the history sidebar
toggleHistoryBtn.addEventListener("click", function () {
  historySidebar.classList.toggle("active"); // Show/hide the sidebar
});
