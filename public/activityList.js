let activities = []

fetchActivities(); // Kjører funksjonen for å hente aktivitetene
async function fetchActivities() {
    try {
        let response = await fetch('/getactivities/'); // Fetches users from the server
        let data = await response.json(); // Konverterer responsen til JSON
        console.log(data); // Logger hentet data for testing
        activities = data; // Lagrer data i acitivities
        displayActivities(); // Kjører funksjonen for å vise personene 
    } catch (error) {
        console.error('Error:', error); // Håndterer eventuelle feil
    }
}

function displayActivities() {
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = `<tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>email</th>
                                <th>Subject</th>
                                <th>Room</th>
                                <th>Start Time</th>
                                <th>Duration</th>
                            </tr>`; // Tøm listen først
    
    activities.forEach(activity => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
        <td>${activity.activityid}</td> 
        <td>${activity.firstname + " " + activity.lastname}</td> 
        <td>${activity.email}</td>
        <td>${activity.subjectname}</td>
        <td>${activity.roomname}</td>
        <td>${activity.starttime}</td>
        <td>${activity.duration}</td
        `
        activityList.appendChild(listItem);
    });
}
