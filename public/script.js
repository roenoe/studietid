const regForm = document.getElementById('regForm')
regForm.addEventListener('submit', registerActivity)

fetchOptions()
function fetchOptions() {
    fetchSubjects()
    fetchRooms()
}

async function fetchSubjects() {
    try {
        let response = await fetch('/getsubjects/')
        let data = await response.json();

        data.forEach(subject => {
            let option = document.createElement('option')
            option.value = subject.id
            option.innerText = subject.name
            regForm.elements['idSubject'].appendChild(option)
        })
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchRooms() {
    try {
        let response = await fetch('/getrooms/')
        let data = await response.json();

        data.forEach(room => {
            let option = document.createElement('option')
            option.value = room.id
            option.innerText = room.name
            regForm.elements['idRoom'].appendChild(option)
        })
    } catch (error) {
        console.error('Error:', error);
    }
}

async function registerActivity(event) {
    event.preventDefault()
        let newActivity = {
        idUser: 1,
        idSubject: regForm.elements['idSubject'].value,
        idRoom: regForm.elements['idRoom'].value,
        idStatus: 2,
        duration: regForm.elements['duration'].value
    }

    console.log(newActivity)

    try {
        let response = await fetch('/registeractivity/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newActivity)
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
}
