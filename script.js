const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl= document.getElementById('Website-name');
const websiteUrlEl= document.getElementById('Website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
const searchBookmark = document.getElementById('search-bookmark');
const countBookmarks = document.getElementById('count-bookmarksEl');
let bookmarks = [];


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

// Build bookmarks DOM
function buildBookmarks(){
    // Remove all bookmarks elements
    bookmarksContainer.textContent = '';
    bookmarks.forEach((bookmark)=>{
        const {name , url } = bookmark;
    //    Item
    const item = document.createElement('div');
    item.classList.add('item');
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas','fa-trash');
    closeIcon.setAttribute('title','Delete Bookmark');
    closeIcon.setAttribute('onclick',`deleteBookmark('${url}')`);
    // Favicon  / Link container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    const favicon = document.createElement('img');
    favicon.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt','Favicon');
    const link  = document.createElement('a');
    link.setAttribute('href',`${url}`);
    link.setAttribute('target','_blank');
    link.textContent = name;
    const bookmarkLength = bookmarks.length;
    countBookmarks.textContent = bookmarkLength;
    // Append to bookmark conatiner

    linkInfo.append(favicon,link);
    item.append(closeIcon,linkInfo);
    bookmarksContainer.appendChild(item);
    });
    
}



// Fetch bookmarks from local storage if available

function fetchBookmarks(){
    // get bookmarks from local storage if available
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        // create bookmarks array in localstorage
        bookmarks = [
            {
                name:'Google',
                url:'https//google.com',
            },
        ];
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    buildBookmarks();
}


// Delete bookmark

function deleteBookmark(url){
    bookmarks.forEach((bookmark,i)=>{
        if(bookmark.url === url) {
            bookmarks.splice(i,1);
        }
    });
    // Update bookmarks array in localStorage and re-populate the DOM
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
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

    const bookmark = {
        name:nameValue,
        url:urlValue,
    };

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}


// Event listners
bookmarkForm.addEventListener('submit',storeBookmark);

// on load , fetch bookmarks
fetchBookmarks();
