document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search)
    const recordId = url.get("id")
    console.log(recordId)
    if(recordId) {
        fetch(`http://localhost:3000/api/record?id=${recordId}`)
            .then(response => response.json())
            .then((record) => {
                document.getElementById('name').value = record.name
                document.getElementById('rollno').value = record.rollno
                document.getElementById('semester').value = record.semester
                document.getElementById('score').value = record.score
                const updateForm=document.getElementById("updateRecord")
                updateForm.action=`/api/record/${recordId}`
            })
            .catch((err)=>{
                console.log(err);
            })
    }
})


document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    
    logoutButton.addEventListener('click', async function() {
        try {
            // Call the logout API
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    });
});




