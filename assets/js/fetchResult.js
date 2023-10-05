const searchButton = document.getElementById("searchButton");
const resultTable = document.getElementById("resultTable");

const warningMessage = document.getElementById("warningMessage");
const errorMessage = document.getElementById("errorMessage");

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  errorMessage.textContent = "";
  const searchRollno = document.getElementById("rollno").value;
  const searchDob = document.getElementById("dob").value;

  if (!searchRollno || !searchDob) {
    errorMessage.textContent = "Please fill both fields";
    return;
  }

  const url = `http://localhost:3000/api/result?rollno=${searchRollno}&dob=${searchDob}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data && data.message && data.message === "No Record Found") {
        errorMessage.textContent = "No result found";
        resultTable.innerHTML = "";
      } else if (data) {
        let tableRows = `
            <tr>
                <td>${data.name}</td>
                <td>${data.rollno}</td>
                <td>${new Date(data.dob).toLocaleDateString()}</td>
                <td>${data.semester}</td>
                <td>${data.score}</td>
            </tr>
          `;
        errorMessage.textContent = "";
        resultTable.innerHTML = tableRows;
      } else {
        errorMessage.textContent = "Unexpected response from the server";
      }
    })
    .catch((err) => {
      errorMessage.textContent = err;
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", async function () {
    try {
      // Call the logout API
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  });
});
