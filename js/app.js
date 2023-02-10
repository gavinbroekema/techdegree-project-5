let json;

/**
 * Fetches 12 users from the random user API and sends back the data as response
 */
fetch('https://randomuser.me/api/?inc=picture,name,email,cell,location,dob&nat=US&results=12')
    .then(data => data.json())
    .then(data => json = data)
    .then(data => buildEmployeeHTML(data))

/**
 * Takes the data from the randomuser API fetch then builds and
 * displays each user card on the page
 * @param {} data 
 */
function buildEmployeeHTML(data) {
    const gallery = document.getElementById('gallery');
    let cardHTML = '';
    data.results.forEach(employee => {
    cardHTML += `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.medium}" alt="${employee.name.first} image">
        </div>
        <div class="card-info-container">
            <h3 id="${employee.name.first}" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
    </div>
    `
    });
    gallery.insertAdjacentHTML('beforeend', cardHTML);
}

/**
 * Builds the modal window
 * @param {*} data 
 * @param {*} index 
 */
function buildModal(data, index) {
    console.log(index)
    console.log(data)

    console.log(data.results[index].dob);
    const birthYear = data.results[index].dob.date.substring(0, 4);
    const birthMonth = data.results[index].dob.date.substring(5, 7);
    const birthDay = data.results[index].dob.date.substring(8, 10);

    const modalHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.results[index].picture.medium}" alt="profile picture">
                <h3 id="${data.results[index].name.first}" class="modal-name cap">${data.results[index].name.first} ${data.results[index].name.last}</h3>
                <p class="modal-text">${data.results[index].email}</p>
                <p class="modal-text cap">${data.results[index].location.city}</p>
                <hr>
                <p class="modal-text">${data.results[index].cell}</p>
                <p class="modal-text">${data.results[index].location.street.number} ${data.results[index].location.street.name}, ${data.results[index].location.city}, ${data.results[index].location.state} ${data.results[index].location.postcode}</p>
                <p class="modal-text">Birthday: ${birthMonth}/${birthDay}/${birthYear}</p>
            </div>
        </div>
    `
    gallery.insertAdjacentHTML('afterend', modalHTML);
}

/**
 * Listens for a click on one of the emplolyee cards and 
 * matches the card information with the respective index from the randomuser API
 */
const gallery = document.getElementById('gallery');
gallery.addEventListener('click', (e) => {
    let employeeIndex = null;
    if(e.target.className.includes('card')) {
        // console.log('Event detected');
        const name = (e.target.closest('.card').querySelector('.card-name').innerHTML);
        const nameArray = name.split(' ');
        // console.log(nameArray);
        const firstName = nameArray[0];
        const lastName = nameArray[1];
        json.results.forEach((result, index) => {
            if(result.name.first === firstName && result.name.last === lastName) {
                employeeIndex = index;
                console.log(employeeIndex);

            }
        })
        buildModal(json, employeeIndex)
        // return employeeIndex;
    }

})

/**
 * Listens for a click on the modal window exit button
 * removes the element 
 */
document.body.addEventListener('click', (e) => {
    if(e.target.closest('#modal-close-btn')) {
        let modal = document.querySelector('.modal-container');
        console.log(modal);
        modal.remove();
    }
})
    