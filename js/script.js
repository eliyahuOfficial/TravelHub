/////////////////Analog Clock//////////////

let hr = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');

function displayTime() {
    let date = new Date();


    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    let hRotation = 30 * hh + mm / 2;
    let mRotation = 6 * mm;
    let sRotation = 6 * ss;

    hr.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;

}

setInterval(displayTime, 1000);

/////////////////Calculator////////////////

let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            string = eval(string);
            input.value = string;
        }

        else if (e.target.innerHTML == 'AC') {
            string = "";
            input.value = string;
        }
        else if (e.target.innerHTML == 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        }
        else {
            string += e.target.innerHTML;
            input.value = string;
        }

    })
})


/////////////////Todo List////////////////

const inputBox = document.getElementById('inputBoxtodo');
const addBtn = document.getElementById('addBtntodo');
const todoList = document.getElementById('todoListNew');

let editTodo = null;


const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {

        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else {

        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);



        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);


        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
}


const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}


const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {


            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);



            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);


            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
}


const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    console.log(todoIndex);
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);



////////////////Weather/////////////////

function formatTime(date) {
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function formatDay(date) {
    const dayArray = date.getDay();
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const day = days[dayArray];
    return day;
}

const currentTime = document.querySelector("#current-time");
let newCurrentTime = new Date();
currentTime.innerHTML = formatTime(newCurrentTime);

const currentDay = document.querySelector("#current-day");
let newCurrentDay = new Date();
currentDay.innerHTML = formatDay(newCurrentDay);


function displayWeatherInfo(response) {
    document.querySelector("#searched-city").innerHTML = response.data.name;
    const temperature = Math.round(response.data.main.temp);
    document.querySelector("#current-temperature").innerHTML = `${temperature}°`;
    const humidity = response.data.main.humidity;
    document.querySelector("#humidity").innerHTML = `${humidity}%`;
    const windSpeed = Math.round(response.data.wind.speed);
    document.querySelector("#wind").innerHTML = `${windSpeed}km/h`;
    const weatherType = response.data.weather[0].main;
    document.querySelector("#weather-type").innerHTML = weatherType;


    const weatherIconContainer = document.querySelector("#weather-icon");


    weatherIconContainer.innerHTML = "";


    const weatherIcons = {
        "Rain": "https://img.icons8.com/color-glass/42/000000/rain.png",
        "Clouds": "https://img.icons8.com/color-glass/42/000000/cloud.png",
        "Clear": "https://img.icons8.com/color-glass/42/000000/sun.png",
        "Wind": "https://img.icons8.com/color-glass/42/000000/wind.png",
        "Cloudy": "https://img.icons8.com/color-glass/42/000000/partly-cloudy-day.png"

    };


    if (weatherIcons.hasOwnProperty(weatherType)) {
        const iconSrc = weatherIcons[weatherType];

        const iconElement = document.createElement("img");
        iconElement.src = iconSrc;
        iconElement.alt = weatherType;
        weatherIconContainer.appendChild(iconElement);
    }
}


function searchCity(city) {
    const apiKey = "49cd3dd4ca4abd678c9cfdcac913c24e";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherInfo);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input").value;
    searchCity(city);
}

const searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", handleSubmit);




