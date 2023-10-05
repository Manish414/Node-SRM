const recordTable=document.getElementById("recordTable");
console.log("Hello");
fetch('http://localhost:3000/api/record')
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        let tableRows='';
        data.forEach(record=>{
            tableRows+=`
                        <tr>
                            <td>${record.name}</td>
                            <td>${record.rollno}</td>
                            <td>${new Date(record.dob).toLocaleDateString()}</td>
                            <td>${record.semester}</td>
                            <td>${record.score}</td>
                            <td>
                                <a href="/updateRecord?id=${record._id}" class="btn border-shadow update">
                                    <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
                                </a>
                                <a class="btn border-shadow delete" onclick="deleteRecord('${record._id}')">
                                    <span class="text-gradient"><i class="fas fa-times"></i></span>
                                </a>
                            </td>
                        </tr> 
            `;
        });
        recordTable.innerHTML=tableRows;
    })
    .catch((err)=>{
        console.error("Error Occured while fetching record",err);
    })



    function deleteRecord(id) {
        if(confirm('Delete?')){
            fetch(`/api/record/${id}`,{
                method:'DELETE'
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(data.message);
                location.reload();
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

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
    