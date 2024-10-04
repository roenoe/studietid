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
    displayPendingActivities();
    displayFailedActivities();
    displayCompletedActivities();
}

function displayPendingActivities() {
    const activityList = document.getElementById('pendingActivityList');
    activityList.innerHTML = `<tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>email</th>
                                <th>Subject</th>
                                <th>Room</th>
                                <th>Start Time</th>
                                <th>Duration</th>
                                <th>Button</th>
                            </tr>`; // Tøm listen først
    
    activities.forEach(activity => {
        if (activity.status == "Ubekreftet") {
            const listItem = document.createElement('tr');
            listItem.innerHTML = `
            <td>${activity.activityid}</td> 
            <td>${activity.firstname + " " + activity.lastname}</td> 
            <td>${activity.email}</td>
            <td>${activity.subjectname}</td>
            <td>${activity.roomname}</td>
            <td>${activity.starttime}</td>
            <td>${activity.duration}</td>
            <td>
                <button onclick="updateActivity(${activity.activityid}, 3)" class="green">Confirm</button>
                <button onclick="updateActivity(${activity.activityid}, 1)" class="orange">Deny</button>
            </td>
            `
            activityList.appendChild(listItem);
        }
    });
}

function displayFailedActivities() {
    const activityList = document.getElementById('failedActivityList');
    activityList.innerHTML = `<tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>email</th>
                                <th>Subject</th>
                                <th>Room</th>
                                <th>Start Time</th>
                                <th>Duration</th>
                                <th>Button</th>
                            </tr>`; // Tøm listen først

    activities.forEach(activity => {
        if (activity.status == "Annulert") {
            const listItem = document.createElement('tr');
            listItem.innerHTML = `
            <td>${activity.activityid}</td> 
            <td>${activity.firstname + " " + activity.lastname}</td> 
            <td>${activity.email}</td>
            <td>${activity.subjectname}</td>
            <td>${activity.roomname}</td>
            <td>${activity.starttime}</td>
            <td>${activity.duration}</td>
            <td>
                <button onclick="updateActivity(${activity.activityid}, 3)" class="green">Confirm</button>
                <button onclick="delActivity(${activity.activityid})" class="red">Delete</button>
            </td>
            `
            activityList.appendChild(listItem);
        }
    });
}

function displayCompletedActivities() {
    const activityList = document.getElementById('completedActivityList');
    activityList.innerHTML = `<tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>email</th>
                                <th>Subject</th>
                                <th>Room</th>
                                <th>Start Time</th>
                                <th>Duration</th>
                                <th>Button</th>
                            </tr>`; // Tøm listen først

    activities.forEach(activity => {
        if (activity.status == "Bekreftet") {
            const listItem = document.createElement('tr');
            listItem.innerHTML = `
            <td>${activity.activityid}</td> 
            <td>${activity.firstname + " " + activity.lastname}</td> 
            <td>${activity.email}</td>
            <td>${activity.subjectname}</td>
            <td>${activity.roomname}</td>
            <td>${activity.starttime}</td>
            <td>${activity.duration}</td>
            <td><button onclick="updateActivity(${activity.activityid}, 1)" class="orange">Annuler</button></td>
            `
            activityList.appendChild(listItem);
        }
    });
}

async function updateActivity(activityId, idStatus) {
    let activity = {
        activityid: activityId,
        idStatus: idStatus
    }

    console.log(activity)

    try {
        let response = await fetch('/updateactivity/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activity)
        })

        let data = await response.json();

        if (data.error) {
            document.getElementById('error').innerText = data.error
            document.getElementById('success').innerText = ''
        } else { 
            document.getElementById('success').innerText = data.message
            document.getElementById('error').innerText = ''
        }
    } catch (error) {
        console.error('Error:', error);
    }
    fetchActivities()
}

async function delActivity(activityid) {
    let activity = {
        activityid: activityid
    }

    try {
        let response = await fetch('/deleteactivity/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activity)
        })

        let data = await response.json();
    }
    catch (error) {
        console.error('Error:', error);
    }
    fetchActivities()
}
