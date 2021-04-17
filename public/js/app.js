const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';

weatherForm.addEventListener('submit', event => {
    event.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`http://127.0.0.1:3000/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = 'Location: ' + data.location;
                messageTwo.innerHTML = 'Temperature: ' + data.temperature + '<br/>' + 'Current conditions: ' + data.forecast;
            }
        });
    });
});

/*()
*/