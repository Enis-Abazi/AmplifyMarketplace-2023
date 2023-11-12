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


let url = 'https://fakestoreapi.com/products';

let productData;
let total = 0;
let finalPrice = 5;

const container = document.querySelector('.row');
container.style.flexDirection = 'row-reverse';
const colLeft = document.querySelector('.col-left');
const colRight = document.querySelector('.col-right');
const titleProduct = document.querySelector('#titleProduct');

const backShop = document.createElement('div');
backShop.classList.add('backShop');
backShop.innerHTML = `
<span class="backToShop"><img src="../Images/back.png" class="backIcon"> Back to Amplify Marketplace</span>
`;
backShop.addEventListener('click', () => {
    window.location.href = 'index.html'
})

fetch(url)
    .then(response => response.json())
    .then(data => {

        cartItemsStorage();
        cartItemsStorageTwo()
    }).catch((error) => {
        console.log(error)
    });


function cartItemsStorage() {

    const cartItemsTwo = localStorage.getItem('cartItemsTwo');

    if (cartItemsTwo) {
        const cartItemTwo = JSON.parse(cartItemsTwo);
        const cartItemsNumber = cartItemTwo.map(item => parseInt(item));
        const newUniqueIds = [...new Set(cartItemsNumber)]

        const productData = [];

        const fetchDataForUniqueIds = async() => {
            for (const id of newUniqueIds) {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (response.ok) {
                    const product = await response.json();
                    productData.push(product);
                } else {
                    console.log('failed' + id);
                }
                productData.forEach(product => {
                    generateProductElements(product);
                });
            }
        }

        fetchDataForUniqueIds();
    } else {
        console.log('failed to get localstorage from new');
    }

}

function cartItemsStorageTwo() {
    const cartItems = localStorage.getItem('cartItems');
    const wishlistItems = localStorage.getItem('wishlist');
    if (cartItems) {
        const cartsItemArray = JSON.parse(wishlistItems);
        const cartItemsNumber = cartsItemArray.map(item => parseInt(item));
        const uniqueIds = [...new Set(cartItemsNumber)];



        const productData = [];

        const fetchDataForIds = async() => {
            for (const id of uniqueIds) {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (response.ok) {
                    const product = await response.json();
                    productData.push(product);
                }
            }

            productData.forEach(product => {
                generateProductElements(product);
            });
        }

        fetchDataForIds();
    } else {
        console.log('failed to get storage');
    }
}

function noPrice() {
    const wishlist = localStorage.getItem('wishlist');
    const cartItemsTwo = localStorage.getItem('cartItemsTwo');
    const totalPrice = document.querySelector('#totalPrice');
    const finalTotalPrice = document.querySelector('#finalTotalPrice')
    const button = document.querySelector('#orderNow');

    if (!wishlist) {
        totalPrice.textContent = "$" + 0;
        finalTotalPrice.textContent = "$" + 0;
    } else if (!cartItemsTwo) {
        totalPrice.textContent = "$" + 0;
        finalTotalPrice.textContent = "$" + 0;
    } else if (!wishlist && !cartItemsTwo) {
        totalPrice.textContent = "$" + 0;
        finalTotalPrice.textContent = "$" + 0
    } else {
        console.log('this should succedd')
    }


}
noPrice();



function bothStorages() {
    const cartItemsTwo = JSON.parse(localStorage.getItem('cartItemsTwo') || '[]');
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const commonIds = cartItemsTwo.filter(id => wishlistItems.includes(id));

    if (commonIds.length > 0) {

        displayCommonIds(commonIds);
    } else if (cartItemsTwo.length > 0 || wishlistItems.length > 0) {
        updateItemCountAndTotal(cartItemsTwo.length, wishlistItems.length);
    }


}

function displayCommonIds(commonIds) {
    const productData = [];

    const fetchDataForCommonIds = async() => {
        for (const id of commonIds) {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            if (response.ok) {
                const product = await response.json();
                productData.push(product);
            } else {
                console.log('failed id' + id);
            }
        }
        productData.forEach(product => {
            generateProductElements(product)
        })
        updateItemCountAndTotal(cartItemsTwo.length, wishlistItems.length)
    }
    fetchDataForCommonIds()
}


function updateItemCountAndTotal(cartItemsCount, wishlistItemsCount) {
    const itemCount = document.querySelector('#itemsCount');
    const itemCountTotal = document.querySelector('#itemsTotal');

    const totalItemCount = cartItemsCount + wishlistItemsCount;

    itemCount.textContent = `${totalItemCount} item${totalItemCount !== 1 ? 's' : ''}`;
    itemCountTotal.textContent = `${totalItemCount} item${totalItemCount !== 1 ? 's' : ''}`;
}



bothStorages();

function updateWishlistItemsCount() {
    const itemCount = document.querySelector('#itemsCount');
    const itemCountTotal = document.querySelector('#itemsTotal');
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || []);

    const itemCountOne = wishlist.length;

    itemCount.textContent = `${itemCountOne} item${itemCountOne !== 1 ? 's' : ''}`;
    itemCountTotal.textContent = `${itemCountOne} item${itemCountOne !== 1 ? 's' : ''}`;
}

function updateCartItemsCount() {
    const itemCount = document.querySelector('#itemsCount');
    const itemCountTotal = document.querySelector('#itemsTotal');
    const cartItemsTwo = JSON.parse(localStorage.getItem('cartItemsTwo') || []);

    const itemCountOne = cartItemsTwo.length;

    itemCount.textContent = `${itemCountOne} item${itemCountOne !== 1 ? 's' : ''}`;
    itemCountTotal.textContent = `${itemCountOne} item${itemCountOne !== 1 ? 's' : ''}`;
}

const displayProductsIds = new Set()

function generateProductElements(product) {
    if (!displayProductsIds.has(product.id)) {
        displayProductsIds.add(product.id)
        const words = product.title.split(' ');
        const randomWord = words.slice(0, 2);
        const finalTitleWords = randomWord.join(' ');
        const productDiv = document.createElement('div');
        productDiv.classList.add('flex');
        productDiv.innerHTML = `
        <div class="col-flex">
            <div class="img">
                <img src="${product.image}" class="imageAddedToCart" id="imageAddedToCart">
            </div>
        </div>
        <div class="col-flex">
            <h2 id="categoryProduct">${product.category}</h2>
            <h3 id="titleProduct">${finalTitleWords}</h3>
        </div>
        <div class="col-flex">
            <h2 id="quantityProduct">1</h2>
        </div>
        <div class="col-flex">
            <h2 id="priceProduct">$${product.price}</h2>
        </div>
    `;

        const productPrice = parseFloat(product.price);
        total += productPrice;
        finalPrice += productPrice;

        const totalPriceDiv = document.querySelector('#totalPrice');
        totalPriceDiv.textContent = `$${total.toFixed(2)}`

        const finalTotalPrice = document.querySelector('#finalTotalPrice');
        finalTotalPrice.textContent = `$${finalPrice.toFixed(2)}`

        container.appendChild(colRight);
        container.appendChild(colLeft)
        colLeft.appendChild(productDiv);

        colLeft.appendChild(backShop)
        return productDiv;
    }

}


function openModal() {
    const btnOrderNow = document.querySelector('#orderNow')
    const modal = document.querySelector('.modal');

    btnOrderNow.addEventListener('click', () => {
        modal.style.display = 'flex';
        modal.style.animation = 'fadeIn .4s ease-in'
    })
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    })


}
openModal();


const specialCodes = ['Riot', 'Enzo', 'Enis', 'Daddy', 'InnovationAcademy'];
const codeInput = document.querySelector('.code-input');
const approveButton = document.querySelector('#sendRequestForCodeDiscountButton');


function handleCodeDiscount() {
    let inputValue = codeInput.value.toLowerCase();
    let codeFound = false;
    for (let i = 0; i < specialCodes.length; i++) {
        if (specialCodes[i].toLowerCase() === inputValue) {
            codeFound = true;
            break;
        }
    }
    if (codeFound) {
        if (finalPrice > 400) {
            finalPrice -= 200;
        } else if (finalPrice < 399) {
            finalPrice -= 10;
        }
        approveButton.innerHTML = 'Approved!';
        approveButton.style.backgroundColor = 'var(--main-second-color)';
        approveButton.style.transition = '0.3s ease-in';
        codeInput.disabled = true;
        approveButton.disabled = true;

        const finalPriceDiv = document.querySelector('#finalTotalPrice');
        finalPriceDiv.textContent = `$${finalPrice.toFixed(2)}`


    } else {
        codeInput.style.border = '2px solid #df4343';
        codeInput.style.animation = '';
        window.getComputedStyle(codeInput).animation;
        codeInput.style.animation = 'shake 0.3s ease-in';
        console.log('not working');
    }
}

approveButton.addEventListener('click', handleCodeDiscount);
codeInput.addEventListener('input', () => {
    codeInput.style.border = ''
})

function creditCardInformation() {
    const nameInput = document.querySelector('#nameInput');
    const cardNumberInput = document.querySelector('#cardNumberInput');
    const expiryDate = document.querySelector('#expiryDate');
    const expiryYear = document.querySelector('#expiryYear');
    const cvcInput = document.querySelector('#cvcInput');
    const informationIcon = document.querySelector('.informationIcon');
    const confirmAndPay = document.querySelector('#confirmAndPay');
    const completeProgress = document.querySelector('.myLoader');
    const modalContainer = document.querySelector('.modalContainer');
    const thisLoader = document.querySelector('.thisLoader');

    nameInput.addEventListener('input', () => {
        if (nameInput.value.length > 20) {
            nameInput.value = nameInput.value.slice(0, 19)
        }
    })
    nameInput.addEventListener('keyDown', (e) => {
        if (nameInput.value.length >= 20 && e.key !== 'Backspace') {
            e.preventDefault();
        }
    })

    cardNumberInput.addEventListener('input', () => {
        if (cardNumberInput.value.length > 16) {
            cardNumberInput.value = cardNumberInput.value.slice(0, 14)
        }
    });
    cardNumberInput.addEventListener('keyDown', (e) => {
        if (cardNumberInput.value.length >= 20 && e.key !== 'Backspace') {
            e.preventDefault();
        }
    })

    expiryDate.addEventListener('input', () => {
        if (expiryDate.value.length > 2) {
            expiryDate.value = expiryDate.value.slice(0, 2);
        }
    })
    expiryDate.addEventListener('keyDown', (e) => {
        if (expiryDate.value.length >= 2 && e.key !== 'Backspace') {
            e.preventDefault();
        }
    })
    cvcInput.addEventListener('input', () => {
        if (cvcInput.value.length > 3) {
            cvcInput.value = cvcInput.value.slice(0, 2)
        }
    })
    cvcInput.addEventListener('keyDown', (e) => {
        if (cvcInput.value.length >= 3 && e.key !== 'Backspace') {
            e.preventDefault();
        }
    })

    expiryYear.addEventListener('input', () => {
        if (expiryYear.value.length > 4) {
            expiryYear.value = expiryYear.value.slice(0, 3)
        }
    });
    expiryYear.addEventListener('keyDown', (e) => {
        if (expiryYear.value >= 4 && e.key !== 'Backspace') {
            e.preventDefault();
        }
    })
    const firstRadio = document.getElementById('firstRadio');
    const secondRadio = document.getElementById('secondRadio');
    firstRadio.addEventListener('change', checkInputFilled);
    secondRadio.addEventListener('change', checkInputFilled);

    function checkInputFilled() {
        const name = nameInput.value;
        const cardNumber = cardNumberInput.value;
        const expiryDateValue = expiryDate.value;
        const expiryYearValue = expiryYear.value;
        const cvc = cvcInput.value;


        const isRadioChecked = firstRadio.checked || secondRadio.checked;

        if (name && cardNumber && expiryDateValue && expiryYearValue && cvc && isRadioChecked) {
            confirmAndPay.disabled = false;
        } else {
            confirmAndPay.disabled = true;
        }
    }
    nameInput.addEventListener('input', checkInputFilled);
    cardNumberInput.addEventListener('input', checkInputFilled);
    expiryDate.addEventListener('input', checkInputFilled);
    expiryYear.addEventListener('input', checkInputFilled);
    cvcInput.addEventListener('input', checkInputFilled);


    const savedCreditCardInformation = localStorage.getItem('creditCardInformation');

    if (savedCreditCardInformation) {
        const creditCardInfo = JSON.parse(savedCreditCardInformation);
        nameInput.value = creditCardInfo.name;
        cardNumberInput.value = creditCardInfo.cardNumber;
        expiryDate.value = creditCardInfo.expiryDate;
        expiryYear.value = creditCardInfo.expiryYear;
        cvcInput.value = creditCardInfo.cvcInput;
    }
    confirmAndPay.addEventListener('click', () => {

        const wishlistData = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const cartItemsTwo = JSON.parse(localStorage.getItem('cartItemsTwo') || '[]');
        const productIds = [...new Set([...wishlistData, ...cartItemsTwo])]

        function showProducts() {
            const products = [];

            const fetchProductData = async() => {
                for (const id of productIds) {
                    try {
                        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                        if (response.ok) {
                            const product = await response.json();
                            products.push({
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                description: product.description,
                                image: product.image
                            })
                        }
                    } catch (error) {
                        console.log('error', 'error for completing your products!')
                    }
                }
                localStorage.setItem('yourProducts', JSON.stringify(products))
            }
            fetchProductData()
        }

        if (wishlistData.length > 0) {
            showProducts()
        } else {
            console.log('failed to order online')
        }
        if (cartItemsTwo.length > 0) {
            showProducts()
        }



        const name = nameInput.value;
        const cardNumber = cardNumberInput.value;
        const expiryDateValue = expiryDate.value;
        const expiryYearValue = expiryYear.value;
        const cvc = cvcInput.value;

        modalContainer.style.display = 'none';
        modalContainer.style.animation = 'fadeDown 0.2s ease-out'
        completeProgress.style.display = 'block';

        setTimeout(function() {
            completeProgress.style.display = 'none';
            thisLoader.style.display = 'block';

            setTimeout(function() {
                window.location.href = 'index.html';
                localStorage.removeItem('productAdded');
                localStorage.removeItem('cartTotal');
                localStorage.removeItem('productAddedTwo');
                localStorage.removeItem('cartItemsTwo')
                localStorage.removeItem('cartItems')
                localStorage.removeItem('wishlist')
            }, 1500)

        }, 1500)

        const creditCardInfo = {
            name,
            cardNumber,
            expiryDateValue,
            expiryYearValue,
            cvc,
            creditCards: localStorage.getItem('creditCards')
        }


        localStorage.setItem('creditCardInformation', JSON.stringify(creditCardInfo));
    })

}
creditCardInformation();

function logoClicked() {
    const img = document.querySelector('#logoClicked');
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        window.location.href = 'index.html'
    })
}
logoClicked();


function btnDisabled() {
    let button = document.querySelector('#orderNow');
    const wishlistData = localStorage.getItem('wishlist');
    const cartItems = localStorage.getItem('cartItems');
    const cartItemsTwo = localStorage.getItem('cartItemsTwo');


    if (wishlistData !== null || cartItems !== null || cartItemsTwo !== null) {
        button.disabled = false;
    } else {
        button.disabled = true;

    }


}
btnDisabled();

function logoClicked() {
    const img = document.querySelector('#logoClicked');
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        window.location.href = 'index.html'
    })
}
logoClicked();

const firstRadio = document.querySelector('#firstRadio');
const secondRadio = document.querySelector('#secondRadio');
firstRadio.addEventListener('click', () => {
    if (firstRadio.checked) {
        firstRadio.checked = true;
        secondRadio.checked = false;
        localStorage.setItem('creditCards', 'Paypal')
    } else {
        firstRadio.checked = false;
        secondRadio.checked = true;
    }
});

secondRadio.addEventListener('click', () => {
    if (secondRadio.checked) {
        secondRadio.checked = true;
        firstRadio.checked = false;
        localStorage.setItem('creditCards', 'Mastercard and Visa')
    } else {
        secondRadio.checked = false;
        firstRadio.checked = true;
    }
});
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