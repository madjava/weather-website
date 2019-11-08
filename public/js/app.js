const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = '';
// messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${address}`)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.errors) {
                        if (Array.isArray(data.errors)) {
                            messageOne.textContent = '';
                            data.errors.forEach((error) => {
                                const el = document.createElement('div');
                                el.innerText = error.msg;
                                el.className = 'error-msg';
                                messageOne.appendChild(el);
                            });
                        } else {
                            messageOne.textContent = data.errors;
                        }
                    } else {
                        messageOne.textContent = data.location;
                        messageTwo.textContent = data.forecast;
                    }
                });
        })
        .catch((error) => {
            console.log(error);
        });
});