const new_contact = document.getElementById("new-contact");
const add_user_container = document.querySelector(".add--user-container");
const layout = document.querySelector(".layout");
const contactList = document.querySelector(".sidebar--contact-list");
let users = Array.from(contactList.children);

setAttribute();
activeUser();


console.log(users[0].lastElementChild.children[0]);


let selectedId = contactList.children[0].getAttribute("data-userID");
let nextElement = "";
let foundId = "";
let foundUser = "";



selectedUser();
searchUser();

new_contact.addEventListener("click", function() {
    add_user_container.classList.add("active");
    layout.classList.add("blur");
});



function render(foundUser) {
    document.getElementById("selectedUser").innerHTML = `
    <img src="${foundUser.children[0].src}" alt="profile" class="user--profile-avatar">
    <h3 class="user--avavtar-name">${foundUser.lastElementChild.children[0].outerText}</h3>
    <p class="user--avatar-text">${foundUser.lastElementChild.children[1].outerText}</p>
`;



    
}

function selectedUser() {

    if (!selectedId) {

        render(users[0]);

    } else {
   
        for (let index = 0; index < users.length; index++) {
            if (users[index].getAttribute("data-userID") === selectedId) {
                foundUser = users[index];
                foundId = index;
                if (index > 0) {
                    nextElement = users[index - 1];
                } else {
                    nextElement = users[users.length - 1];
                }
                 
                break;
            }
        }
        render(foundUser);

        document.getElementById("update-user").innerHTML = `
        <h3>Update User</h3>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et </p>
        <input type="text" class="input-field" value="${foundUser.children[0].src}" name="image" placeholder="image">
        <input type="text" class="input-field" value="${foundUser.lastElementChild.children[0].outerText}"  name="name" placeholder="name">
        <input type="text" class="input-field" value="${foundUser.lastElementChild.children[1].outerText}" name="email" placeholder="email">
        <button class="btn add--user-btn">update user</button>
`;
    }


}


document.getElementById("delete").addEventListener("click", function() {
    contactList.removeChild(foundUser); 
    nextElement.classList.add("active");
    selectedId = nextElement.getAttribute("data-userID");
    if (users.length -1 === 0) {
        document.getElementById("selectedUser").innerHTML = `<h3>Nincs megjelíthető Felhasználó!</h3>`;
        users.pop();
        document.querySelector(".buttons").style.display = "none";
    } else {
        users.splice(foundId, 1); 
        selectedUser();
    }

})


document.getElementById("edit").addEventListener("click", function() {
    console.log("Edit gomb");
    document.querySelector(".update-box").classList.add("active");
    selectedUser();
})



document.getElementById("update-user").addEventListener("submit", function(event) {
    event.preventDefault();


    const name = event.target.name.value;
    const image = event.target.image.value;
    const email = event.target.email.value;

    let foundIndex = "";

    for (let index = 0; index < users.length; index++) {
        if (users[index].getAttribute("data-userID") === selectedId) {
            foundIndex = index;
            break;
        }
    }

    users[foundIndex].setAttribute("data-name", name);
    users[foundIndex].children[0].src = image;
    users[foundIndex].lastElementChild.children[0].innerHTML = `${name}`;
    console.log(users[foundIndex].lastElementChild.children[0].innerHTML);
    users[foundIndex].lastElementChild.children[1].innerHTML = email;

    selectedUser();
    document.querySelector(".update-box").classList.remove("active");


})








function setAttribute() {
    users.forEach(function(user) {
        const userName = user.lastElementChild.children[0].outerText;
        user.setAttribute("data-name", userName);
        user.setAttribute("data-userID", uuidv4());
    });
}


    function activeUser() {
        users.forEach(function(user) {
            user.addEventListener("click", function(event) {

                users.forEach(function(item) {
                    item.classList.remove("active");
                })


                event.currentTarget.classList.add("active");
                document.querySelector(".buttons").style.display = "";
               const id = event.currentTarget.dataset.userid;
               selectedId = id;

               selectedUser();
            })
        })
    }


    function searchUser() {


        document.querySelector(".search-field").addEventListener("keyup", function(event) {
            const searchName = event.target.value;

            users.forEach((user) => {
                user.style.display = "";
            })

            users.filter((user) => !user.getAttribute("data-name").toLowerCase().includes(searchName.toLowerCase())).map((user) => {
                user.style.display = "none";
            })
        })

    }


function inputDelete() {
    const input = Array.from(document.querySelectorAll(".input-field"));

    input.forEach(function(mezo) {
        mezo.value = "";
    })

    input[0].focus();
}



document.getElementById("user-form").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = event.target.name.value;
    const image = event.target.image.value;
    const email = event.target.email.value;

    let frag = document.createRange().createContextualFragment(`
                        <li class="user-card clearfix">
                    <img src="${image}" alt="user avatar" class="avatar layout__item--floated-left">
                    <div class="user-data">
                        <h6 class="user-name">${name}</h6>
                        <p class="user-email">${email}</p>
                    </div>
                </li>
        `);

    contactList.appendChild(frag);

    add_user_container.classList.remove("active");
    layout.classList.remove("blur");
    inputDelete();


    users.push(contactList.lastElementChild);


    activeUser();
    setAttribute();
    searchUser();
});




function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }