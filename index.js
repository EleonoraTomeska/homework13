let test = [];

function addDataToHTML() {
    const appHtmlDiv = document.getElementById('app');

    for (const data of test) {

        const divClass = document.createElement('div');
        const classList = divClass.classList;
        classList.add('border');
        classList.add('p-5');
        classList.add('card');
        classList.add('shadow-lg');
        classList.add('col-3', 'text-center', 'm-1');


        const div = document.createElement('div');
        div.innerHTML = data.first_name;


        const divLastName = document.createElement('div');
        divLastName.innerHTML = data.last_name;


        const img = document.createElement('img');
        img.src = data.avatar;
        img.classList.add('rounded-circle');
        img.style.width = '150px';
        img.classList.add('mx-auto', 'p-2');

        const divEmail = document.createElement('div');
        divEmail.innerHTML = data.email;


        divClass.appendChild(div);
        divClass.appendChild(divLastName);
        divClass.appendChild(img);
        divClass.appendChild(divEmail);
        appHtmlDiv.appendChild(divClass);

    }
}

async function getData() {
    try {

        const res = await fetch('https://reqres.in/api/users')
        const data = await res.json();

        test = data.data
        console.log(test);

        addDataToHTML();

    } catch (e) {
        console.error(e);
    }
}

getData();

async function createUser() {
    const firstName = document.getElementById('firstName');
    const valueName = firstName.value;

    const lastName = document.getElementById('lastName');
    const valueLastName = lastName.value;

    const emailAddress = document.getElementById('emailAddress');
    const valueEmail = emailAddress.value;

    try {
        //First Name
        if (valueName.length < 3) {
            alert('The first name must be at least 3 letters!');
            throw 'The first name must be at least 3 letters!';
        }

        if (validateName(valueName) === false) {
            alert("The first name has digits in it!");
            throw "The first name has digits in it!"
        }

        //Last Name
        if (valueLastName.length < 3) {
            alert('The last name must be at least 3 letters!');
            throw 'The last name must be at least 3 letters!';
        }

        if (validateName(valueLastName) === false) {
            alert("The last name has digits in it!");
            throw "The last name has digits in it!";
        }

        //Email
        if (valueEmail.length === 0) {
            alert('The email address is required!');
            throw ('The email address is required!');

        }
        if (valueEmail.length < 6) {
            alert('The email field must have at least 6 characters!');
            throw 'The email field must have at least 6 characters!';
        }
        if (valueEmail.indexOf('@') === -1) {
            alert("The email must have '@' in it!");
            throw "The email must have '@' in it!";
        }
        if (valueEmail.indexOf('.') === -1) {
            alert("The email must have '.' in it!");
            throw "The email must have '.' in it!";
        }


        const res = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            body: JSON.stringify({
                first_name: valueName,
                last_name: valueLastName,
                email: valueEmail
            })
        }
        )



        if (res.ok) {
            const data = await res.json();
            test.push(data);
            //
            addDataToHTML();
            //
        }


    } catch (e) {
        console.error(e);
    }
}

function checkIfDigit(char) {
    if (char === "1" || char === "2" || char === "3" || char === "4" || char === "5" || char === "6" || char === "7" || char === "8" || char === "9") {
        return true;
    } else {
        return false;
    }
}

function validateName(name) {
    for (let i = 0; i < name.length; i++) {
        if (checkIfDigit(name.charAt(i))) {
            return false;
        }
    }
    return true;
}
