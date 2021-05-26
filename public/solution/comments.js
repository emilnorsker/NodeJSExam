let username;
/*
do {
    username = prompt('Enter your username: ');
} while (!username);
*/
username = "Rasmus";
const textarea = document.querySelector('#textarea');
const submitBtn = document.querySelector('#submitBtn');
const commentBox = document.querySelector('.comment-box');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("hello");
    console.log(username);
    let comment = textarea.value
    if (!comment) {
        return;
    }
    postComment(comment);
});

function postComment(comment) {
    let data = {
        username: username,
        comment: comment
    }
    appendToDom(data);
    textarea.value = '';
}

function appendToDom(){
    let lTag = document.createElement('li');
    lTag.classList.add('comment');
    let markup = `
    <div class="card border-light text-white bg-dark mb-3">
        <div class="card-body">
            <h6 class="text-">${data.username}</h6>
            <p style="text-align: left;">${data.comment}</p>
            <div>
                <img src="/solution/clock.png" alt="clock">
                <small>${moment(data.time).format('HH:mm')}</small>
            </div>
        </div>
    </div>`

    lTag.innerHTML = markup;
    commentBox.prepend(lTag);
}