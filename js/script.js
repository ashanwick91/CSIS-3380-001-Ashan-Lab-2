const userData = users;
const usersPerPage = 10;

/**
 * Iterates throught the userData array and generates HTML content.
 * 
 * @returns HTML content
 */
const readContent = () => {
    let content = "";
    userData.map(user => {
        content += `<li class="contact-item cf">
                        <div class="contact-details">
                            <img class="avatar" src="${user.image}">
                            <h3>${user.name}</h3>
                            <span class="email">${user.name.replace(" ", ".")}@example.com</span>
                        </div>
                        <div class="joined-details">
                            <span class="date">Joined ${user.joined}</span>
                        </div>
                    </li>`;
    });
    return content;
}

/**
 * Insert generated HTML content to the page.
 */
const loadContent = () => {
    document.getElementsByTagName("h3")[0].innerHTML = "Total : " + userData.length;

    let contactList = document.getElementsByClassName("contact-list");
    let content = readContent();
    contactList[0].innerHTML = content;

    let pagesToAdd = Math.ceil(userData.length / usersPerPage);
    let paginationDiv = document.getElementsByClassName("pagination");
    for (let i = 1; i <= pagesToAdd; i++) {
        paginationDiv[0].innerHTML += `<li><a href="#" onclick=navigate(${i})>${i}</a></li>`;
    }
};

/**
 * Handles the pagination
 * 
 * @param {number} i page index
 */
const navigate = (i) => {
    let contactItems = document.getElementsByClassName("contact-item");
    for (let i = 0; i < contactItems.length; i++) {
        contactItems[i].style.display = "none";
    }

    let endPage = (i * usersPerPage) - 1;
    let baseCondition = endPage - (usersPerPage - 1);
    if (endPage >= contactItems.length) {
        endPage = contactItems.length - 1;
        baseCondition = contactItems.length - (userData.length % usersPerPage);
    }

    for (let j = endPage; j >= baseCondition; j--) {
        contactItems[j].style.display = "block";
    }

    let paginationListItems = document.getElementsByClassName("pagination")[0].children;
    for (let i = 0; i < paginationListItems.length; i++) {
        paginationListItems[i].firstChild.classList.remove("active");
    }
    paginationListItems[i - 1].firstChild.classList.add("active");
}

// Load HTML content
loadContent();

// Display the first page
navigate(1);