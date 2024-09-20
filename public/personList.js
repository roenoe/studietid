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
    personList.innerHTML = `<tr><th>ID</th><th>Name</th><th>email</th><th>Role</th></tr>`; // Tøm listen først
    
    persons.forEach(person => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
        <td>${person.userid}</td> 
        <td>${person.firstName + " " + person.lastName}</td> 
        <td>${person.email}</td>
        <td>${person.role}</td>
        `
        personList.appendChild(listItem);
    });
}

const regForm = document.getElementById('regForm')
regForm.addEventListener('submit', adduser)
const firstNameField = document.getElementById('firstName')
const lastNameField = document.getElementById('lastName')
const emailField = document.getElementById('email')

async function adduser(event) {
    event.preventDefault()
    let newUser = {
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        idRole: 3,
        isAdmin: 0,
        email: emailField.value
    }
//    const formData = new FormData(regForm)
    
    console.log(newUser)

    try {
        let response = await fetch('/adduser/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
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
    fetchUsers()
}
