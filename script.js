const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl= document.getElementById('Website-name');
const websiteUrlEl= document.getElementById('Website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');


// show modal , foucs on input 

function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}




modalShow.addEventListener('click',showModal);
modalClose.addEventListener('click',() => modal.classList.remove('show-modal'));
window.addEventListener('click',(e) => (e.target === modal ? modal.classList.remove('show-modal'):false));

// validate form
function validate(nameValue,urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    if(!nameValue || !urlValue){
        alert('Please submit values for both fields.');
        return false;
    }

    const regex = new RegExp(expression);
  
    if(!urlValue.match(regex)){
        alert('Please provide valid web address');
        return false;
    }

    return true;

}


// handle data from form
function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://','https://')){
        urlValue = `https://${urlValue}`;
    }

    if(!validate(nameValue,urlValue)){
        return false;
    }
}


// Event listners
bookmarkForm.addEventListener('submit',storeBookmark);