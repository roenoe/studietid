let persons = []

fetchUsers(); // Kjører funksjonen for å hente personene
async function fetchUsers() {
    try {
        let response = await fetch('/getusers/'); // Fetches users from the server
        let data = await response.json(); // Konverterer responsen til JSON
        console.log(data); // Logger hentet data for testing
        persons = data; // Lagrer data i persons
        displayPersons(); // Kjører funksjonen for å vise personene 
    } catch (error) {
        console.error('Error:', error); // Håndterer eventuelle feil
    }
}

function displayPersons() {
    const personList = document.getElementById('personList');
    personList.innerHTML = `<tr><th>ID</th><th>Name</th><th>Role</th></tr>`; // Tøm listen først
    
    persons.forEach(person => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
        <td>${person.userid}</td> 
        <td>${person.firstName + " " + person.lastName}</td> 
        <td>${person.role}</td>
        `
        personList.appendChild(listItem);
    });
}
