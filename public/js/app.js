const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const iconSection = document.querySelector('#icon-section');
const skycons = new Skycons({"color":"#333333"});

// messageOne.textContent = '';
// messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    iconSection.className = 'display-none';

    fetch(`/weather?address=${address}`)
        .then((response) => {
            if(!response.ok){
                return messageOne.textContent = `No result for the address ${address} at this time.`;
            }
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
                        messageOne.textContent = 'Forcast: ' + data.location;
                        messageTwo.textContent = data.forecast.summary;
                        iconSection.className = '';
                        skycons.set('weather-icon', data.forecast.icon);
                        skycons.play();
                    }
                });
        })
        .catch((error) => {
            console.log(error);
        });
});