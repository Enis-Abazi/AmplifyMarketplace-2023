document.addEventListener('DOMContentLoaded', function() {





    const chatbotToggler = document.querySelector(".chatbot-toggler");
    chatbotToggler.style.zIndex = '1238712387123'
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");

    let userMessage;


    const API_KEY = "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";
    const inputInitHeight = chatInput.scrollHeight;
    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi;
    }
    const generateResponse = (chatElement) => {
        const API_URL = "https://api.openai.com/v1/chat/completions";
        const messageElement = chatElement.querySelector("p");

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{
                        "role": "system",
                        "content": "You are a helpful assistant."
                    },
                    {
                        "role": "user",
                        "content": userMessage
                    }
                ],
            })
        }

        fetch(API_URL, requestOptions).then(response => response.json()).then(data => {

            messageElement.textContent = data.choices[0].message.content.trim();
        }).catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }
    const handleChat = () => {
        userMessage = chatInput.value.trim();
        if (!userMessage) return;

        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }
    chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    const chatbot = document.querySelector('.chatbot');
    chatbot.style.opacity = '0';
    chatbot.style.display = 'none'
    let chatBotOpen = false;
    sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => {
        document.body.classList.remove("show-chatbot");
        const chatbot = document.querySelector('.chatbot');
        chatbot.style.opacity = '0';
        chatbot.style.display = 'none'
        const chatInput = document.querySelector('.chat-input');
        chatInput.style.zIndex = '0';
    });
    chatbotToggler.addEventListener("click", () => {

        if (!chatBotOpen) {
            document.body.classList.toggle("show-chatbot")
            const chatbot = document.querySelector('.chatbot');
            chatbot.style.opacity = '1';
            chatbot.style.display = 'block'
            const chatInput = document.querySelector('.chat-input');
            chatInput.style.zIndex = '10000';
        } else {
            document.body.classList.remove("show-chatbot")
            const chatbot = document.querySelector('.chatbot');
            chatbot.style.opacity = '0';
            chatbot.style.display = 'none'
            const chatInput = document.querySelector('.chat-input');
            chatInput.style.zIndex = '-10';
        }
        chatBotOpen = !chatBotOpen;
    });






    const loggedInUserEmail = localStorage.getItem('users');
    const signInHeader = document.querySelector('#sign-in-or-signed');
    const realEmail = JSON.parse(loggedInUserEmail);
    const dropdown = document.querySelector('.dropdown');
    if (realEmail && realEmail.length > 0) {
        for (let i = 0; i < realEmail.length; i++) {
            const email = realEmail[i].email;
            signInHeader.textContent = email;
            dropdown.setAttribute('id', 'dropdownLogIn')
            const linkClosed = document.querySelector('#importantClosedLink');
            linkClosed.setAttribute('href', '#');
            const logOutLink = document.querySelector('#logOutLink');
            logOutLink.addEventListener('click', () => {
                localStorage.clear();
            })
        }
    } else if (!realEmail || !realEmail.length === 0) {
        signInHeader.textContent = 'Sign In';
        const loginSetup = document.querySelector('.login-setup');
        loginSetup.style.visibility = 'hidden';
        const added$1 = document.querySelector('#addedProduct');
        const added$2 = document.querySelector('#addedProductTwo');
        added$1.style.visibility = 'hidden';
        added$2.style.visibility = 'hidden';
    } else {
        signInHeader.textContent = 'Sign In As'
        const loginSetup = document.querySelector('.login-setup');
        loginSetup.style.visibility = 'hidden'
        const added$1 = document.querySelector('#addedProduct');
        const added$2 = document.querySelector('#addedProductTwo');
        added$1.style.visibility = 'hidden';
        added$2.style.visibility = 'hidden';
    }


})

let api = 'https://fakestoreapi.com/products';

fetch(api)
    .then(response => response.json())
    .then(data => {


        const urlParams = new URLSearchParams(window.location.search);
        const productID = urlParams.get('id');

        const productData = data.find(product => product.id === parseInt(productID, 10));

        if (productData) {
            const image = document.querySelector('#product-image');
            const title = document.querySelector('#product-title');
            const desc = document.querySelector('#product-description');
            const price = document.querySelector('#actualPrice');
            image.src = productData.image;
            title.textContent = productData.title;
            desc.textContent = productData.description
            price.textContent = "$" + productData.price;
        } else {
            console.log('failed productData', productID)
        }




    })
    .catch(error => {
        console.log(error, 'error while fetching')
    })


const searchInput = document.querySelector('#searchInput');
const dropdownContainer = document.querySelector('#dropdownContainer');
const dropdownColLeft = document.querySelector('.dropdown-row-col-search-left');



searchInput.addEventListener('input', function() {
    let query = searchInput.value;

    if (query.trim() === '') {
        dropdownContainer.style.display = 'none';
        return;
    }


    fetch(`https://fakestoreapi.com/products?title=${query}`)
        .then(response => response.json())
        .then(data => {

            if (data.length > 0) {
                dropdownContainer.style.display = 'block';
                dropdownContainer.style.animation = 'dropdownIn 0.4s ease-out';
                dropdownColLeft.innerHTML = '';

                let matchingProduct = [];

                const maxProductShow = 4;

                for (const product of data) {
                    if (product.title.toLowerCase().includes(query.toLowerCase()) && matchingProduct.length < maxProductShow) {
                        matchingProduct.push(product)
                        const productDiv = document.createElement('div');
                        productDiv.className = 'product';

                        const productImage = document.createElement('img');
                        productImage.className = 'filteredImage';
                        productImage.src = product.image;
                        productImage.alt = 'Product Image';
                        productImage.style.width = '100px';
                        productImage.style.aspectRatio = '3/4';
                        productImage.style.objectFit = 'contain';

                        const flex = document.createElement('div');
                        flex.className = 'flex';
                        flex.style.display = 'flex';
                        flex.style.flexDirection = 'column';
                        flex.style.rowGap = '10px';


                        const title = document.createElement('h4');
                        title.id = 'headerTitleDropdown';
                        title.textContent = product.title;
                        title.style.padding = '10px 0';

                        const price = document.createElement('p');
                        price.id = 'priceDropdown';
                        price.textContent = `$${product.price}`;
                        price.style.padding = '10px 0';
                        price.style.color = 'var(--red)';
                        price.style.position = 'relative';

                        const row = document.createElement('div');
                        row.className = 'dropdown-row-search';

                        row.addEventListener('click', () => {
                            window.location.href = `view-auction.html?id=${product.id}`;
                        })

                        row.appendChild(productImage);
                        row.appendChild(flex);
                        flex.appendChild(title)
                        flex.appendChild(price);

                        if (matchingProduct.length === maxProductShow) {
                            row.style.border = 'none'
                        }
                        dropdownColLeft.appendChild(row);
                    }
                }
                if (matchingProduct.length === 1) {
                    const dropdownRow = dropdownColLeft.querySelector('.dropdown-row-search');
                    if (dropdownRow) {
                        dropdownRow.style.border = 'none';
                    }
                }
                if (dropdownColLeft.children.length === 0) {
                    dropdownColLeft.innerHTML = 'No products found';
                    dropdownContainer.style.color = '#000';
                    dropdownContainer.style.background = '#fff'
                    dropdownContainer.style.border = 'none'
                    dropdownColRight.innerHTML = '';
                }
            }
        }).catch((error) => {
            console.log(error, 'error of filter input')
        })
})

function logoClicked() {
    const img = document.querySelector('#logoClicked');
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        window.location.href = 'index.html'
    })
}
logoClicked();

function randomViews() {
    const word = document.querySelector('#randomviews');
    const randomWord = Math.floor(Math.random() * 1000 - 20 / (-2));

    if (randomWord.length !== 5) {
        word.textContent = randomWord
    }
}
randomViews()


const responsiveIconRow = document.querySelector('#responsive-icons-row');
const buttonSearchIcon = document.querySelector('#responsiveSearch');
const basketIcon = document.querySelector('#addToCartShopping');
const heartIcon = document.querySelector('#responsiveHeart');
const userIcon = document.querySelector('#responsiveUser');
const searchBarHeader = document.querySelector('.first-header-searchbar');
const theRealSearch = document.querySelector('#searchInput');

const categoryButton = document.querySelector('#category-btn');
const searchBtn = document.querySelector('#search-btn');
const dropContainer = document.querySelector('#dropdownContainer')
const dropRow = document.querySelector('.dropdown-row-search');


let isSearch = false;

buttonSearchIcon.addEventListener('click', () => {
    if (!isSearch) {
        basketIcon.style.display = 'none';
        heartIcon.style.display = 'none';
        userIcon.style.display = 'none';
        categoryButton.style.display = 'none';
        searchBtn.style.display = 'none';
        searchBarHeader.style.display = 'block';
        searchBarHeader.style.position = 'absolute';
        theRealSearch.style.display = 'block';
        theRealSearch.style.position = 'absolute';
        theRealSearch.style.bottom = '22px';
        theRealSearch.style.left = '0';
        theRealSearch.style.width = '180px';
        theRealSearch.style.animation = 'left 1s ease-in'
        theRealSearch.style.border = '1px solid var(--info-product-font-color-tiny)'
        dropContainer.style.position = 'absolute';
        dropContainer.style.left = '-130px';
        dropContainer.style.top = '15px';
        dropRow.style.width = '400px';
        dropRow.style.backgroundColor = '#fff';

    } else {
        basketIcon.style.display = 'block';
        theRealSearch.style.animation = 'right 1s ease-in'
        heartIcon.style.display = 'block';
        userIcon.style.display = 'block';
        categoryButton.style.display = 'block';
        searchBtn.style.display = 'block';
        searchBarHeader.style.display = 'none';
        theRealSearch.style.display = 'none';
        dropContainer.style.display = 'none';
    }
    isSearch = !isSearch;
});


window.addEventListener('load', function() {
    const searchInput = document.querySelector('#searchInput');
    searchInput.value = '';
})

function cartResponsive() {
    const basketIcon = document.querySelector('#addToCartShopping');
    const heartIcon = document.querySelector('#responsiveHeart');
    const userIcon = document.querySelector('#responsiveUser');
    const searchBarHeader = document.querySelector('.first-header-searchbar');
    const theRealSearch = document.querySelector('#searchInput');

    const categoryButton = document.querySelector('#category-btn');
    const searchBtn = document.querySelector('#search-btn');
    const dropContainer = document.querySelector('#dropdownContainer')
    const dropRow = document.querySelector('.dropdown-row-search');


    let isSearch = false;


    const mobileSearch = document.querySelector('#mobile-col-search');
    const mobileCart = document.querySelector('#mobile-col-cart');
    const mobileAccount = document.querySelector('#mobile-col-account');

    const users = localStorage.getItem('users')
    const account = document.querySelector('#accountOrLogIn');

    if (users) {
        account.textContent = 'Sign Out'
    } else {
        account.textContent = 'Account'
    }

    mobileAccount.addEventListener('click', () => {
        window.location.href = 'sign-in.html';
    })

    mobileCart.addEventListener('click', () => {
        let cartItems = getCartItemsTwo();
        const queryString = cartItems.map(id => `id=${id}`).join('&');
        const url = `cart.html?${queryString}`;
        window.location.href = url;
    })

    mobileSearch.addEventListener('click', () => {
        if (!isSearch) {
            basketIcon.style.display = 'none';
            heartIcon.style.display = 'none';
            userIcon.style.display = 'none';
            categoryButton.style.display = 'none';
            searchBtn.style.display = 'none';
            searchBarHeader.style.display = 'block';
            searchBarHeader.style.position = 'absolute';
            theRealSearch.style.display = 'block';
            theRealSearch.style.position = 'absolute';
            theRealSearch.style.bottom = '22px';
            theRealSearch.style.left = '0';
            theRealSearch.style.width = '180px';
            theRealSearch.style.animation = 'left 1s ease-in'
            theRealSearch.style.border = '1px solid var(--info-product-font-color-tiny)'
            dropContainer.style.position = 'absolute';
            dropContainer.style.left = '-290px';
            dropContainer.style.top = '15px';
            dropRow.style.width = '400px';
            dropRow.style.backgroundColor = '#fff';
        } else {
            basketIcon.style.display = 'block';
            theRealSearch.style.animation = 'right 1s ease-in'
            heartIcon.style.display = 'block';
            userIcon.style.display = 'block';
            categoryButton.style.display = 'block';
            searchBtn.style.display = 'block';
            searchBarHeader.style.display = 'none';
            theRealSearch.style.display = 'none';
            dropContainer.style.display = 'none';
        }
        isSearch = !isSearch
    })

}
cartResponsive()