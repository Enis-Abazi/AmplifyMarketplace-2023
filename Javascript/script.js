// https://preview.themeforest.net/item/ibid-multi-vendor-auctions-woocommerce-theme/full_screen_preview/24923136?_ga=2.193713257.539786662.1694192991-1027797716.1670949604
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
            console.log(data)
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


    const url = 'https://fakestoreapi.com/products';

    let test;
    let productData;
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


    function burger() {
        const burger = document.querySelector('#hamburger-menu');
        let footer = document.querySelector('footer')
        let browse = document.querySelector('.browse')
        let contact = document.querySelector('.contact')
        let auctions = document.querySelector('.auctions')
        let blog = document.querySelector('.container');

        let sectionHide = false;

        burger.addEventListener('click', () => {
            if (sectionHide) {
                blog.style.display = 'block';
                auctions.style.display = 'block';
                contact.style.display = 'block';
                browse.style.display = 'block';
                footer.style.display = 'block';
                sectionHide = false;
            } else {
                blog.style.display = 'none';
                auctions.style.display = 'none';
                contact.style.display = 'none';
                browse.style.display = 'none';
                footer.style.display = 'none';
                sectionHide = true
            }
        })

    }
    burger()

    function logoClicked() {
        const img = document.querySelector('#logoClicked');
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            window.location.href = 'index.html'
        })
    }
    logoClicked();

    let backgroundPosition = 0
    const speed = 3;
    const productsData = [];

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

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            productsData.push(...data);
        })
        .catch(error => {
            console.log(error, 'error while fetching API at input searchbar');
        });
    fetch(url)
        .then(response => response.json())
        .then(data => {
            test = data[13];
            productData = data;

            function quickView() {
                const modalContainer = document.querySelector('#modal-container');
                const modalContent = document.querySelector('.modal-content');
                const productName = document.querySelector('#product-name');
                const productDescription = document.querySelector('#product-description');
                const closeModalButton = document.querySelector('#close-modal');
                const productPrice = document.querySelector('#product-price');
                const modalColLeft = document.querySelector('.col-left');
                const modalColRight = document.querySelector('.col-right');
                const bids = document.querySelector('#bids');
                const tags = document.querySelector('#tags');
                const reserveSpan = document.querySelector('#reserve');
                const categories = document.querySelector('#categories');
                const socialMediaRow = document.querySelector('#social-media-row');
                const socialCol = document.querySelectorAll('.col-media');

                function getRandomTag() {
                    const tagsRandom = ["black friday", "sales", "dropshipping", "amazon", "ebay", "ecommerce"];
                    const randomIndex = Math.floor(Math.random() * tagsRandom.length);
                    return tagsRandom[randomIndex];
                }

                let currentProduct = null;

                const viewAuctionsButtons = document.querySelectorAll('.quickviewbtn')


                viewAuctionsButtons.forEach((button) => {
                    button.addEventListener('click', () => {
                        const productId = button.getAttribute('data-product-id');
                        const product = productData.find((p) => p.id === parseInt(productId));
                        if (product) {
                            currentProduct = product
                            openModalWithData();
                        }
                    });
                });

                function openModalWithData() {
                    if (currentProduct) {
                        const existingImage = modalColLeft.querySelector('.product-image');
                        if (existingImage) {
                            modalColLeft.removeChild(existingImage)
                        }
                        productName.textContent = currentProduct.title;
                        productDescription.textContent = currentProduct.description;
                        productPrice.textContent = currentProduct.price + " $";
                        bids.textContent = getRandomTag();
                        tags.textContent = Math.floor(Math.random() * (100 - 20 + 1) + 20);
                        categories.textContent = currentProduct.category;
                        const productImage = document.createElement('img');
                        productImage.src = currentProduct.image;
                        productImage.classList.add('product-image');
                        modalContainer.style.display = 'flex';
                        modalContainer.style.animation = 'showModal 0.5s ease-in';
                        reserveSpan.textContent = "Reserve";
                        modalContainer.appendChild(modalContent);
                        modalContent.appendChild(modalColLeft);
                        modalColLeft.appendChild(productImage);
                        modalColLeft.appendChild(reserveSpan);
                        modalContent.appendChild(modalColRight);
                        modalColRight.appendChild(productName);
                        modalColRight.appendChild(productPrice);
                        modalColRight.appendChild(productDescription);
                        modalColRight.appendChild(categories);
                        modalColRight.appendChild(bids);
                        modalColRight.appendChild(tags);
                        modalColRight.appendChild(socialMediaRow);
                    } else {
                        console.log('Product is not defined')
                    }

                }

                socialCol.forEach(() => {
                    const twitter = document.querySelector('.col-twitter');
                    const instagram = document.querySelector('.col-instagram');
                    const facebook = document.querySelector('.col-facebook');
                    const gmail = document.querySelector('.col-gmail');
                    twitter.innerHTML = '<i class="fa-brands fa-x-twitter"></i>';
                    instagram.innerHTML = '<i class="fa-brands fa-instagram"></i>';
                    facebook.innerHTML = '<i class="fa-brands fa-facebook-f"></i>';
                    gmail.innerHTML = '<i class="fa-regular fa-envelope"></i>';
                })
                closeModalButton.addEventListener('click', () => {
                    modalContainer.style.display = 'none';
                })

                modalContainer.addEventListener('click', (event) => {
                    if (event.target === modalContainer) {
                        modalContainer.style.display = 'none';
                    }
                })
            }
            async function fetchData() {
                try {
                    const response = await fetch('https://fakestoreapi.com/products');
                    if (!response.ok) {
                        throw new Error('API request failed');
                    }
                    productData = await response.json();
                    quickView()

                } catch (error) {
                    console.log(error);
                }
            }

            fetchData();

            const removeProducts = [0, 1, 2, 3, 14, 15, 16, 17, 18, 19];
            removeProducts.sort((a, b) => b - a)
            removeProducts.forEach((index) => {
                data.splice(index, 1);
            })

            // redirect to next page view Auction

            const viewAuctionButtons = document.querySelectorAll('.view-auction-button');

            viewAuctionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-product-id');
                    window.location.href = `view-auction.html?id=${productId}`;
                });
            });

            function updateProductElement(productId) {
                const product = data.find((product) => product.id === parseInt(productId));

                if (product) {
                    const firstImageShown = document.querySelector(`.firstImageShown[data-product-id="${productId}"]`);
                    if (firstImageShown) {
                        firstImageShown.src = product.image;
                    }
                    const productNameInformation = document.querySelector(`#product-name-information[data-product-id="${productId}"]`);

                    if (productNameInformation) {
                        const words = product.title.split(' ');
                        const firstWords = words.slice(0, 3).join(' ');
                        productNameInformation.textContent = firstWords;
                    }
                }
            }
            const productIds = data.map((product) => product.id);
            productIds.forEach(updateProductElement)

            if (Array.isArray(data) && data.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.length);
                const product = data[randomIndex];

            } else {
                console.log('api does not contain expected data')
            }
            let currentIndex = 0;

            const products = [
                { id: 9, title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ", price: 64, description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system", category: "electronics" },
                { id: 11, title: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5", price: 109, description: "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.", category: "electronics" },
                { id: 12, title: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive", price: 114, description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty", category: "electronics" },
                { id: 13, title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin", price: 599, description: "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz", category: "electronics" }
            ]

            function getCartItems() {
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                return Array.isArray(cartItems) ? cartItems : [];
            }

            function addToCart(productID) {
                const cartItems = getCartItems();
                cartItems.push(productID)
                addedProduct += 1;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                localStorage.setItem('wishlist', JSON.stringify(cartItems))
                updateAddedProduct();
            }
            let addedProduct = parseFloat(localStorage.getItem('productAdded') || 0)

            function updateAddedProduct() {
                const wishlistData = localStorage.getItem('wishlist');
                const wishlist = wishlistData ? JSON.parse(wishlistData) : [];
                addedProduct = wishlist.length;
                localStorage.setItem('productAdded', addedProduct);
                displayAddedProductCount();
            }

            function displayAddedProductCount() {
                const addedProductText = document.querySelector('#addedProduct');
                const addedProductTwo = document.querySelector('#addedProductTwo');
                addedProductText.textContent = addedProduct;
                addedProductTwo.textContent = addedProduct;
            }


            function displayItems() {
                const cartItems = getCartItems()
                    // const dollarCount = document.querySelector('#items-dollar-count');
                const addedProductText = document.querySelector('#addedProduct');
                const addedProductTwo = document.querySelector('#addedProductTwo');

                updateAddedProduct()

                // dollarCount.textContent = '0';
                if (cartItems.length === 0) {
                    addedProductText.textContent = addedProduct;
                    addedProductTwo.textContent = addedProduct
                } else {
                    if (Array.isArray(cartItems)) {
                        let totalPrice = 0;
                        cartItems.forEach((itemID) => {
                            const product = products.find(p => p.id === parseInt(itemID))
                            if (product) {
                                totalPrice += product.price;
                            }
                            // dollarCount.textContent = "$" + totalPrice.toFixed(2);
                            addedProductText.textContent = addedProduct;
                            addedProductTwo.textContent = addedProduct;
                        })
                    } else {
                        console.log('cartItems is not a array', cartItems)
                    }
                }
            }
            displayItems();

            const myCart = document.querySelector('.fa-cart-shopping');
            myCart.style.cursor = 'pointer';
            const productIds2 = [];
            myCart.addEventListener('click', () => {
                const productID = myCart.getAttribute('data-product-id');
                if (productID) {
                    productIds2.push(productID)
                }
                let productAddedClick = localStorage.getItem('productAdded');
                let prodocutAddedTwoClick = localStorage.getItem('productAddedTwo');

                if (productAddedClick > 0) {
                    const queryString = productIds2.map(id => `id=${id}`.join('&'));
                    const url = `cart.html?${queryString}`;
                    window.location.href = url
                } else {
                    window.location.href = '#';
                }
                if (prodocutAddedTwoClick > 0) {
                    const queryString = productIds2.map(id => `id=${id}`.join('&'));
                    const url = `cart.html?${queryString}`;
                    window.location.href = url
                } else {
                    window.location.href = '#';
                }
                if (productAddedClick > 0 && prodocutAddedTwoClick > 0) {
                    const queryString = productIds2.map(id => `id=${id}`.join('&'));
                    const url = `cart.html?${queryString}`;
                    window.location.href = url
                }

            })

            const myFrontProducts = [
                { id: 13, title: 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin', price: 599, description: '"21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz"', category: 'electronics' },
                { id: 14, title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ", price: 999.99, description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag", category: 'electronics' },
                { id: 11, title: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5", price: 109, description: "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.", category: 'electronics' },
                { id: 10, title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s", price: 109, description: "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)", category: 'electronics' }
            ]


            function removeFromWishlist(productID) {
                const wishlistData = localStorage.getItem('wishlist');
                const wishlist = wishlistData ? JSON.parse(wishlistData) : [];
                const index = wishlist.indexOf(productID);
                if (index !== -1) {
                    wishlist.splice(index, 1);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    addedProduct -= 1;
                    localStorage.setItem('productAdded', addedProduct);
                    displayAddedProductCount();
                    displayWishListMessage('Removed');
                }
            }

            function displayWishListMessage(message) {
                const wishlistMessage = document.querySelector('#popup-wishlist');
                wishlistMessage.textContent = message;
                wishlistMessage.style.display = 'block';
                setTimeout(() => {
                    wishlistMessage.style.display = 'none';
                }, 2000);
            }

            let productAdded = parseFloat(localStorage.getItem('productAdded') || 0);


            let addedProductText = document.querySelector('#addedProduct');
            addedProductText.textContent = productAdded;
            let addedProductTwo = document.querySelector('#addedProductTwo');
            addedProductTwo.textContent = productAdded;


            const wishlistButton = document.querySelectorAll('#add-to-wishlist');

            if (localStorage.getItem('wishlist') === null) {

                localStorage.setItem('wishlist', JSON.stringify([]));
            }

            let addedProductTest = parseFloat(localStorage.getItem('productAdded') || 0);
            let addedProductNew = parseFloat(localStorage.getItem('productAdded') || 0);

            function addToWishlist() {
                const wishlistContainer = document.querySelector('#wishlist-container');
                const popup_wishlist = document.querySelector('#popup-wishlist');
                wishlistButton.forEach((button) => {
                    button.addEventListener('click', () => {
                        const productID = button.getAttribute('data-product-id');
                        const product = myFrontProducts.find(p => p.id === parseInt(productID));

                        if (product) {
                            let addedProductTest = parseFloat(localStorage.getItem('productAdded') || 0)
                            const wishlistData = localStorage.getItem('wishlist');
                            const wishlist = wishlistData ? JSON.parse(wishlistData) : [];
                            const index = wishlist.indexOf(productID);
                            if (realEmail && realEmail.length > 0) {
                                if (index !== -1) {
                                    wishlist.splice(index, 1);
                                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                                    displayWishListMessage('Product Removed');
                                    addedProductTest--;
                                    addedProductNew--
                                    const cartData = localStorage.getItem('cartItems');
                                    const cartItems = cartData ? JSON.parse(cartData) : [];
                                    const cartIndex = cartItems.indexOf(productID);
                                    if (cartIndex !== -1) {
                                        const productPrice = product.price;
                                        let currentTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;
                                        currentTotal -= productPrice;
                                        localStorage.setItem('cartTotal', currentTotal.toFixed(2));
                                        cartItems.splice(cartIndex, 1);
                                        localStorage.setItem('cartItems', JSON.stringify(cartItems));
                                    }
                                } else {
                                    wishlist.push(productID);
                                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                                    displayWishListMessage('Added to Wishlist');
                                    addedProduct++;
                                    addedProductNew++
                                }

                                addedProductTest++;
                                addedProductNew++
                                localStorage.setItem('productAdded', addedProductNew)

                                const addedProductText = document.querySelector('#addedProduct');
                                const addedProductTwo = document.querySelector('.addedProduct');

                                addedProductText.textContent = addedProductTest;
                                addedProductTwo.textContent = addedProductNew;

                                const cart = document.querySelector('.fa-cart-shopping');
                                cart.style.animation = 'bounce-in-top 2s both';


                                localStorage.setItem('productAdded', addedProductTest);
                                localStorage.setItem('productAdded', addedProductNew);
                                wishlistContainer.style.display = 'flex';
                                wishlistContainer.style.animation = 'popup 2s cubic-bezier(0.165, 0.84, 0.44, 1)';
                                popup_wishlist.textContent = 'Added to Wishlist';
                                popup_wishlist.classList = 'fa-bounce';
                                popup_wishlist.backgroundColor = 'var(--new-main-color)';



                                const productPrice = product.price;
                                let currentTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;
                                currentTotal += productPrice;
                                localStorage.setItem('cartTotal', currentTotal.toFixed(2));

                                const itemsDollarCount = document.querySelector('#items-dollar-count');
                                itemsDollarCount.textContent = "$" + currentTotal.toFixed(2);
                                addToCart(productID);

                            } else {
                                const loginSetup = document.querySelector('.login-setup');
                                loginSetup.style.display = 'none !important';
                                wishlistContainer.style.display = 'flex';
                                wishlistContainer.style.animation = 'popup 2s cubic-bezier(0.165, 0.84, 0.44, 1)';
                                popup_wishlist.textContent = 'Login Required';
                                popup_wishlist.classList = 'fa-shake';
                            }
                            // localStorage.setItem('productAdded', addedProductTest);
                            displayAddedProductCount();
                            displayItems();
                        } else {
                            console.log('product failed for id', productID)
                        }


                    });
                });

                wishlistContainer.addEventListener('click', (event) => {
                    if (event.target === wishlistContainer) {
                        wishlistContainer.style.display = 'none';
                    }
                });

                setInterval(() => {
                    if (wishlistContainer.style.display === 'flex') {
                        wishlistContainer.style.display = 'none';
                    }
                }, 200);
            }



            if (!localStorage.getItem('cartTotal')) {
                localStorage.setItem('cartTotal', "0,00")
            }

            addToWishlist();


            let currentProductIndex = -1;

            function getRandomProduct() {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * productData.length);
                } while (randomIndex === currentProductIndex);
                currentProductIndex = randomIndex;
                return productData[randomIndex];
            }

            function frontView() {

                const blog = document.querySelector('.blog');
                const container = document.querySelector('.container');
                const centerInfo = document.querySelector('#center-information');
                const centerTitle = document.querySelector('.center-title');
                const bigTitle = document.querySelector('#bigTitle');
                if (bigTitle) {
                    bigTitle.style.display = 'none'
                }

                const productImage = document.querySelector('#product-image');
                productImage.style.padding = '150px 0';
                const price = document.querySelector('#price');
                const arrow = document.querySelector('#arrow');
                arrow.style.right = '23%';
                arrow.style.animation = 'upDown 3s ease-in-out infinite';
                const progressBar = document.querySelector('#progress-bar');
                const progress = document.querySelector('progress');

                productImage.innerHTML = '';



                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * productData.length);
                } while (randomIndex === currentIndex);
                currentIndex = randomIndex

                const product = productData[currentIndex];

                const thisPrice = {
                    price: `${test.price}`
                }
                price.setAttribute('data-price', thisPrice.price);


                const firstWord = document.createElement('h1');
                firstWord.classList.add('bigTitle');
                firstWord.setAttribute('id', 'myBigTitleFirst')
                firstWord.textContent = test.title;
                let words = firstWord.textContent.split(' ');
                firstWord.textContent = words[0]

                const img = document.createElement('img');
                img.src = test.image;
                img.style.filter = 'none';
                img.classList.add('currentImg');


                blog.appendChild(container);
                container.appendChild(centerInfo);
                centerInfo.appendChild(centerTitle);
                centerTitle.appendChild(firstWord);
                centerInfo.appendChild(productImage);
                productImage.appendChild(price);
                productImage.appendChild(arrow)
                productImage.appendChild(img);
                centerInfo.appendChild(progressBar);
                progressBar.appendChild(progress);
            }

            function smoothFunction() {
                let start = null;
                const centerInformation = document.querySelector('#center-information');
                centerInformation.classList.add('smoothAnimation')
                const duration = 1000;

                setTimeout(() => {
                    centerInformation.classList.remove('smoothAnimation');
                }, 1000)

                function step(timestamp) {
                    if (!start) {
                        start = timestamp;
                    }

                    const progress = timestamp - start;
                    centerInformation.style.opacity = progress / duration;

                    if (progress < duration) {
                        requestAnimationFrame(step);
                    }
                }

                requestAnimationFrame(step);
            }


            const customProduct = [];

            function updateView() {
                const centerInformation = document.querySelector('#center-information');
                const removeBigTitle = document.querySelector('#myBigTitleFirst');
                removeBigTitle.style.display = 'none'
                const productImage = document.querySelector('#product-image');
                const price = document.querySelector('#price');
                const bigTitle = document.querySelector('.bigTitle');
                const img = productImage.querySelector('.currentImg');
                bigTitle.style.display = 'none';
                bigTitle.setAttribute('id', 'bigTitle1');
                centerInformation.style.animation = 'none'
                centerInformation.style.animation = 'checkInSecond 2s cubic-bezier(0.19, 1, 0.22, 1) !important';

                centerInformation.classList.add('checkInSecond-animation');

                centerInformation.addEventListener('animationend', () => {
                    centerInformation.classList.remove('checkInSecond-animation');
                });

                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * productData.length);
                } while (randomIndex === currentIndex);
                currentIndex = randomIndex;
                const product = productData[currentIndex];

                let words = product.title.split(' ');
                const firstWords = words[0];

                const newBigTitle = document.createElement('h1');
                newBigTitle.classList.add('bigTitle');
                newBigTitle.textContent = firstWords;

                bigTitle.parentNode.insertBefore(newBigTitle, bigTitle);
                bigTitle.remove();

                const currentProduct = {
                    image: img.src,
                    price: price.getAttribute('data-price'),
                    bigTitle: bigTitle.textContent
                }
                customProduct.push(currentProduct);
                bigTitle.textContent = product.title;
                img.src = product.image;
                img.style.aspectRatio = '20/10';
                img.style.objectFit = 'contain'
                img.style.width = '100%';

                bigTitle.classList.add('checkIn-animation');
                img.classList.add('checkIn-animation');
                price.classList.add('checkIn-animation');

                img.style.animation = 'checkInTitle 1s ease !important';
                bigTitle.style.animation = 'checkIn 3s ease ';
                price.style.animation = 'checkInTitle 1s ease !important';

                price.setAttribute('data-price', product.price);
            }

            function rightSliderFn() {
                updateView();
                smoothFunction();
            }

            const leftSlider = document.querySelector('#left-slider');

            leftSlider.addEventListener('click', rightSliderFn)

            const rightSlider = document.querySelector('#right-slider');
            rightSlider.addEventListener('click', rightSliderFn);


            function myProgress() {
                const centerInformation = document.querySelector('#center-information');
                const rightSlider = document.querySelector('#right-slider');
                const leftSlider = document.querySelector('#left-slider');

                rightSlider.addEventListener('click', () => {
                    width = 0;
                    progressBar.style.width = '0%'
                })
                leftSlider.addEventListener('click', () => {
                    width = 0;
                    progressBar.style.width = '0%';
                })

                let progressBar = document.querySelector('#progress-bar');
                progressBar.style.width = '0';
                progressBar.style.transition = 'width 0.3s linear'
                let width = 0;
                let interval = setInterval(() => {
                    if (width >= 100) {
                        width = 0;
                        centerInformation.classList.add('smoothAnimation');
                        updateView()
                    } else {
                        width++;
                        progressBar.style.width = width + '%';
                    }
                }, 80)
            }
            myProgress();
            frontView();
        }).catch(error => {
            console.log(error, "were having some troubles please try again later...");

            let blogNotFound = document.querySelector('.blogNotFound')
            let footer = document.querySelector('footer')
            let browse = document.querySelector('.browse')
            let contact = document.querySelector('.contact')
            let auctions = document.querySelector('.auctions')
            let blog = document.querySelector('.blog')

            if (error) {
                blogNotFound.style.display = 'block';
                blog.style.display = 'none';
                browse.style.display = 'none';
                contact.style.display = 'none';
                auctions.style.display = 'none';
                footer.style.display = 'none';
            } else {
                console.log('else in error LOL')
            }

            function moveBackground() {
                backgroundPosition -= speed;
                blogNotFound.style.backgroundPosition = `${backgroundPosition}px 0`;
                if (backgroundPosition < -blogNotFound.offsetWidth) {
                    backgroundPosition = 0;
                }
                requestAnimationFrame(moveBackground);
            }

            moveBackground();
        });

    let sendMessageButton = document.querySelector('#send-button');

    function firstNameMistake() {
        const fnameInput = document.querySelector('#fname-input');
        fnameInput.addEventListener('input', () => {
            if (fnameInput.value.length === 1 || fnameInput.value.length === 2 || fnameInput.value.length === 3) {
                fnameInput.style.border = '1px solid red';
                fnameInput.placeholder = 'Please Fill Required Inputs'
            } else if (fnameInput.value.length > 3) {
                fnameInput.style.border = 'none'
                fnameInput.style.borderBottom = '1px solid var(--info-product-font-color-tiny)'
            } else {
                fnameInput.innerHTML = '';
                fnameInput.textContent = '';
                fnameInput.value = '';
            }
        })
    }

    function lastNameMistake() {
        const lnameInput = document.getElementById('lname-input');
        lnameInput.addEventListener('input', () => {
            if (lnameInput.value.length === 1 || lnameInput.value.length === 2 || lnameInput.value.length === 3) {
                lnameInput.style.border = '1px solid red';
                lnameInput.placeholder = 'Please Fill Required Inputs'
            } else if (lnameInput.value.length > 3) {
                lnameInput.style.border = 'none'
                lnameInput.style.borderBottom = '1px solid var(--info-product-font-color-tiny)'
            } else {
                lnameInput.innerHTML = '';
                lnameInput.textContent = '';
                lnameInput.value = '';
            }
        })
    }

    function emailMistake() {
        const emailInput = document.getElementById('email-input');
        emailInput.addEventListener('input', () => {
            if (emailInput.value.length === 1 || emailInput.value.length === 2 || emailInput.value.length === 3 || emailInput.value.length === 4 || emailInput.value.length === 5 || emailInput.value.length === 6 || emailInput.value.length === 7 || emailInput.value.length === 8) {
                emailInput.style.border = '1px solid red';
                emailInput.placeholder = 'Please Fill Required Inputs'
            } else if (emailInput.value.length > 8) {
                emailInput.style.border = 'none'
                emailInput.style.borderBottom = '1px solid var(--info-product-font-color-tiny)'
            } else {
                emailInput.innerHTML = '';
                emailInput.textContent = '';
                emailInput.value = '';
            }
        })
    }

    function subjectMistake() {
        const subjectInput = document.getElementById('subject-input');
        subjectInput.addEventListener('input', () => {
            if (subjectInput.value.length === 1 || subjectInput.value.length === 2 || subjectInput.value.length === 3 || subjectInput.value.length === 4 || subjectInput.value.length === 5) {
                subjectInput.style.border = '1px solid red';
                subjectInput.placeholder = 'Please Fill Required Inputs'
            } else if (subjectInput.value.length > 5) {
                subjectInput.style.border = 'none'
                subjectInput.style.borderBottom = '1px solid var(--info-product-font-color-tiny)'
            } else {
                subjectInput.innerHTML = '';
                subjectInput.textContent = '';
                subjectInput.value = '';
            }
        })
    }

    fetch('https://fakestoreapi.com/products?limit=20&page=2')
        .then(response => response.json())
        .then(data => {


            function updateProductElement(productID) {
                const product = data.find((product) => product.id === parseInt(productID))

                if (product) {
                    const firstImageShown = document.querySelector(`.firstImageShown[data-product-id="${productID}"]`);
                    if (firstImageShown) {
                        firstImageShown.src = product.image;
                    }
                    const productNameInformation = document.querySelector(`#product-name-information-flex-new[data-product-id="${productID}"]`);
                    const productNameInformationTwo = document.querySelector(`#product-name-information-flex[data-product-id="${productID}"]`)
                    if (productNameInformation) {
                        const words = product.title.split(' ');
                        const firstWords = words.splice(0, 3).join(' ');
                        productNameInformation.textContent = firstWords;
                    }
                    if (productNameInformationTwo) {
                        const words = product.title.split(' ');
                        const firstWords = words.splice(0, 3).join(' ');
                        productNameInformationTwo.textContent = firstWords;
                    }
                }
            }
            const productIds = data.map((product) => product.id);
            productIds.forEach(updateProductElement);


            const products = [
                { id: 17, title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats", description: "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.", price: 39.99, category: "women's clothing" },
                { id: 18, title: "MBJ Women's Solid Short Sleeve Boat Neck V ", description: "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem", price: 9.85, category: "women's clothing" },
                { id: 19, title: "Opna Women's Short Sleeve Moisture", description: "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort", price: 7.95, category: "women's clothing" },
                { id: 20, title: "DANVOUY Womens T Shirt Casual Cotton Short", description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.", price: 12.99, category: "women's clothing" },
                { id: 5, title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet", description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.", price: 695, category: "jewellery" },
                { id: 6, title: "Solid Gold Petite Micropave ", description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.", price: 168, category: "jewellery" },
                { id: 7, title: "White Gold Plated Princess", description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...", price: 9.99, category: "jewellery" },
                { id: 8, title: "Pierced Owl Rose Gold Plated Stainless Steel Double", description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel", price: 10.99, category: "jewellery" },
                { id: 9, title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ", description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system", price: 64, category: "electronics" },
                { id: 12, title: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive", description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty", price: 114, category: "electronics" },
                { id: 15, title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats", description: "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates", price: 56.99, category: "women's clothing" },
                { id: 16, title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket", description: "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON", price: 29.95, category: "women's clothing" }
            ]

            function getCartItemsTwo() {
                const cartItems = JSON.parse(localStorage.getItem('cartItemsTwo')) || [];
                return Array.isArray(cartItems) ? cartItems : [];
            }

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


                    let productAddedClick = localStorage.getItem('productAdded');
                    let prodocutAddedTwoClick = localStorage.getItem('productAddedTwo');

                    if (productAddedClick > 0) {
                        const queryString = cartItems.map(id => `id=${id}`).join('&');
                        const url = `cart.html?${queryString}`;
                        window.location.href = url;
                    } else {
                        window.location.href = '#'
                    }
                    if (prodocutAddedTwoClick > 0) {
                        const queryString = cartItems.map(id => `id=${id}`).join('&');
                        const url = `cart.html?${queryString}`;
                        window.location.href = url;
                    } else {
                        window.location.href = '#'
                    }
                    if (productAddedClick > 0 && prodocutAddedTwoClick > 0) {
                        const queryString = cartItems.map(id => `id=${id}`).join('&');
                        const url = `cart.html?${queryString}`;
                        window.location.href = url;
                    } else {
                        window.location.href = '#';
                    }


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
                        theRealSearch.style.left = '-139px';
                        theRealSearch.style.width = '180px';
                        theRealSearch.style.animation = 'left 1s ease-in'
                        theRealSearch.style.border = '1px solid var(--info-product-font-color-tiny)'
                        dropContainer.style.position = 'absolute';
                        dropContainer.style.left = '-290px';
                        dropContainer.style.top = '15px';
                        dropRow.style.width = '400px';
                        dropRow.style.backgroundColor = '#fff';
                        // inputPrice.style.zIndex = '1';
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

            function displayAddedProductCountTwo() {
                const addedProductText = document.querySelector('#addedProduct');
                const addedProductTwo = document.querySelector('#addedProductTwo');
                addedProductText.textContent = addedProduct;
                addedProductTwo.textContent = addedProduct;
            }

            function addToCartTwo(productID) {
                const cartItems = getCartItemsTwo();

                cartItems.push(productID)
                localStorage.setItem('cartItemsTwo', JSON.stringify(cartItems));

                addedProduct += 1;
                localStorage.setItem('productAddedTwo', addedProduct);
                displayAddedProductCountTwo()

            }

            const addToCartShopping = document.querySelector('#addToCartShopping');
            addToCartShopping.addEventListener('click', () => {
                const cartItems = getCartItemsTwo();

                let productAddedClick = localStorage.getItem('productAdded');
                let prodocutAddedTwoClick = localStorage.getItem('productAddedTwo');

                if (productAddedClick > 0) {
                    const queryString = cartItems.map(id => `id=${id}`).join('&');
                    const url = `cart.html?${queryString}`;
                    window.location.href = url
                } else {
                    window.location.href = '#';
                }
                if (prodocutAddedTwoClick > 0) {
                    const queryString = cartItems.map(id => `id=${id}`).join('&');
                    const url = `cart.html?${queryString}`;
                    window.location.href = url
                } else {
                    window.location.href = '#';
                }
                if (productAddedClick > 0 && prodocutAddedTwoClick > 0) {
                    const queryString = cartItems.map(id => `id=${id}`).join('&');
                    const url = `cart.html?${queryString}`;
                    window.location.href = url
                }

            });

            let addedProduct = parseFloat(localStorage.getItem('productAddedTwo') || 0)

            function displayItemsTwo() {
                const cartItems = getCartItemsTwo()
                    // const dollarCount = document.querySelector('#items-dollar-count');
                const addedProductText = document.querySelector('#addedProduct');
                const addedProductTwo = document.querySelector('#addedProductTwo');

                // dollarCount.textContent = '0';
                if (Array.isArray(cartItems)) {
                    if (cartItems.length === 0) {
                        addedProductText.textContent = '0';
                        addedProductTwo.textContent = '0'
                    } else {
                        let totalPrice = 0;

                        cartItems.forEach((itemID) => {
                            const product = products.find(p => p.id === parseInt(itemID));

                            if (product) {
                                totalPrice += product.price;
                            }
                        });

                        // dollarCount.textContent = "$" + totalPrice.toFixed(2);
                        addedProductText.textContent = addedProduct;
                        addedProductTwo.textContent = addedProduct;
                    }
                } else {
                    console.log('cartItems is not an array:', cartItems);
                }

            }
            displayItemsTwo()


            const viewAuction = document.querySelectorAll('#view-auction-product');
            viewAuction.forEach((button) => {
                button.addEventListener('click', () => {
                    const product = button.getAttribute('data-product-id');
                    window.location.href = `view-auction.html?id=${product}`
                })
            })

            let addedProductNew = parseFloat(localStorage.getItem('productAdded') || 0);

            function flexWishlist() {
                const wishlistContainer = document.querySelector('#wishlist-container-2');
                const popup_wishlist = document.querySelector('#popup-wishlist-2');
                const wishlistButton = document.querySelectorAll('#add-to-wishlist-product');
                const responsiveHeart = document.querySelector('#responsiveHeart1');

                wishlistButton.forEach((button) => {
                    button.addEventListener('click', () => {
                        const productID = button.getAttribute('data-product-id');
                        const product = products.find(p => p.id === parseInt(productID));

                        if (realEmail && realEmail.length > 0) {
                            responsiveHeart.style.color = 'var(--red)'
                            button.setAttribute('data-added', 'true');
                            popup_wishlist.textContent = 'Added to Wishlist';
                            button.style.backgroundColor = 'var(--new-main-color)';
                            button.style.color = 'white';
                            popup_wishlist.setAttribute('id', 'popup-wishlist');
                            const productPrice = product.price;
                            let currentTotal = parseFloat(localStorage.getItem('cartTotal') || 0);
                            currentTotal += productPrice;
                            addedProductNew++
                            localStorage.setItem('productAdded', addedProductNew)
                            localStorage.setItem('cartTotal', currentTotal.toFixed(2));
                            const cartItems = JSON.parse(localStorage.getItem('cartItemsTwo')) || [];
                            const addedProduct$ = document.querySelector('#addedProduct');
                            localStorage.setItem('addedProductCount', cartItems.length);
                            addedProduct$.textContent = addedProductNew;

                            localStorage.setItem('cartTotal', addedProduct);
                            addToCartTwo(productID)
                        } else {
                            const loginSetup = document.querySelector('.login-setup');
                            loginSetup.style.display = 'none !important';
                            button.setAttribute('data-added', 'false');
                            popup_wishlist.textContent = 'Login Required';
                            button.style.backgroundColor = '';
                            button.style.color = '';
                            responsiveHeart.style.color = 'var(--big-title-color)'
                        }

                        wishlistContainer.style.display = 'flex';
                        wishlistContainer.style.animation = 'popup 2s cubic-bezier(0.165, 0.84, 0.44, 1)';
                    })
                })
                wishlistContainer.addEventListener('click', (event) => {
                    if (event.target === wishlistContainer) {
                        wishlistContainer.style.display = 'none'
                    }
                });
                setInterval(() => {
                    if (wishlistContainer.style.display = 'flex') {
                        wishlistContainer.style.display = 'none'
                    }
                }, 2000)
            }
            flexWishlist();


            function quickView() {
                const modalContainer = document.querySelector('#modal-container');
                const modalContent = document.querySelector('.modal-content');
                const productName = document.querySelector('#product-name');
                const productDescription = document.querySelector('#product-description');
                const closeModalButton = document.querySelector('#close-modal');
                const productPrice = document.querySelector('#product-price');
                const modalColLeft = document.querySelector('.col-left');
                const modalColRight = document.querySelector('.col-right');
                const bids = document.querySelector('#bids');
                const tags = document.querySelector('#tags');
                const reserveSpan = document.querySelector('#reserve');
                const categories = document.querySelector('#categories');
                const socialMediaRow = document.querySelector('#social-media-row');
                const socialCol = document.querySelectorAll('.col-media');

                function getRandomTag() {
                    const tagsRandom = ["black friday", "sales", "dropshipping", "amazon", "ebay", "ecommerce"];
                    const randomIndex = Math.floor(Math.random() * tagsRandom.length);
                    return tagsRandom[randomIndex];
                }

                let currentProduct = null;

                const viewAuctionsButtons = document.querySelectorAll('.quickview-btn-product')


                viewAuctionsButtons.forEach((button) => {
                    button.addEventListener('click', () => {
                        const productId = button.getAttribute('data-product-id');
                        const product = productData.find((p) => p.id === parseInt(productId));
                        if (product) {
                            currentProduct = product
                            openModalWithData();
                        }
                    });
                });

                function openModalWithData() {
                    if (currentProduct) {
                        const existingImage = modalColLeft.querySelector('.product-image');
                        if (existingImage) {
                            modalColLeft.removeChild(existingImage)
                        }
                        productName.textContent = currentProduct.title;
                        productDescription.textContent = currentProduct.description;
                        productPrice.textContent = currentProduct.price + " $";
                        bids.textContent = getRandomTag();
                        tags.textContent = Math.floor(Math.random() * (100 - 20 + 1) + 20);
                        categories.textContent = currentProduct.category;
                        const productImage = document.createElement('img');
                        productImage.src = currentProduct.image;
                        productImage.classList.add('product-image');
                        modalContainer.style.display = 'flex';
                        modalContainer.style.animation = 'showModal 0.5s ease-in';
                        reserveSpan.textContent = "Reserve";
                        modalContainer.appendChild(modalContent);
                        modalContent.appendChild(modalColLeft);
                        modalColLeft.appendChild(productImage);
                        modalColLeft.appendChild(reserveSpan);
                        modalContent.appendChild(modalColRight);
                        modalColRight.appendChild(productName);
                        modalColRight.appendChild(productPrice);
                        modalColRight.appendChild(productDescription);
                        modalColRight.appendChild(categories);
                        modalColRight.appendChild(bids);
                        modalColRight.appendChild(tags);
                        modalColRight.appendChild(socialMediaRow);
                    } else {
                        console.log('Product is not defined')
                    }

                }

                socialCol.forEach(() => {
                    const twitter = document.querySelector('.col-twitter');
                    const instagram = document.querySelector('.col-instagram');
                    const facebook = document.querySelector('.col-facebook');
                    const gmail = document.querySelector('.col-gmail');
                    twitter.innerHTML = '<i class="fa-brands fa-x-twitter"></i>';
                    instagram.innerHTML = '<i class="fa-brands fa-instagram"></i>';
                    facebook.innerHTML = '<i class="fa-brands fa-facebook-f"></i>';
                    gmail.innerHTML = '<i class="fa-regular fa-envelope"></i>';
                })
                closeModalButton.addEventListener('click', () => {
                    modalContainer.style.display = 'none';
                })

                modalContainer.addEventListener('click', (event) => {
                    if (event.target === modalContainer) {
                        modalContainer.style.display = 'none';
                    }
                })
            }
            async function fetchData() {
                try {
                    const response = await fetch('https://fakestoreapi.com/products');
                    if (!response.ok) {
                        throw new Error('API request failed');
                    }
                    productData = await response.json();
                    quickView()

                } catch (error) {
                    console.log(error);
                }
            }
            fetchData()

        }).catch(error => {
            console.log(error)
        })



    function messageMistake() {
        const messageInput = document.getElementById('message-input');
        messageInput.addEventListener('input', () => {
            if (messageInput.value.length === 1 || messageInput.value.length === 2 || messageInput.value.length === 3 || messageInput.value.length === 4 || messageInput.value.length === 5 || messageInput.value.length === 6) {
                messageInput.style.border = '1px solid red';
                messageInput.placeholder = 'Please Fill Required Inputs'
            } else if (messageInput.value.length > 6) {
                messageInput.style.border = 'none'
                messageInput.style.borderBottom = '1px solid var(--info-product-font-color-tiny)'
            } else {
                messageInput.innerHTML = '';
                messageInput.textContent = '';
                messageInput.value = '';
            }
        })
    }

    firstNameMistake()
    lastNameMistake()
    emailMistake()
    subjectMistake()
    messageMistake()


    sendMessageButton.addEventListener('click', function() {
        const fname = document.getElementById('fname-input');
        const lname = document.getElementById('lname-input');
        const email = document.getElementById('email-input');
        const subject = document.getElementById('subject-input');
        const message = document.getElementById('message-input');
        const modal = document.querySelector('#myModal');
        const modalMessage = document.querySelector('#modal-message');

        if (fname.value.length > 3 && lname.value.length > 3 && email.value.length > 8 && subject.value.length > 5 && message.value.length >= 6) {
            const formData = {
                firstName: fname.value,
                lastName: lname.value,
                email: email.value,
                subject: subject.value,
                message: message.value
            }

            localStorage.setItem('contactFormData', JSON.stringify(formData));

            fname.value = '';
            lname.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';


            modalMessage.textContent = 'Message Sent!';

            if (localStorage.getItem('contactFormData')) {
                modal.style.display = 'block';
                setTimeout(function() {
                    modal.style.display = 'none'
                }, 3000)
            }

        } else {
            console.log('Please fill the required inputs');
        }

        function getStoredData() {
            const storedData = localStorage.getItem('contactFormData');
            if (storedData) {
                JSON.parse(storedData);
            }
        }
        getStoredData();

    })

})




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
const inputPrice = document.querySelector('#price');

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
        theRealSearch.style.left = '-139px';
        theRealSearch.style.width = '180px';
        theRealSearch.style.animation = 'left 1s ease-in'
        theRealSearch.style.border = '1px solid var(--info-product-font-color-tiny)'
        dropContainer.style.position = 'absolute';
        dropContainer.style.left = '-290px';
        dropContainer.style.top = '15px';
        dropRow.style.width = '400px';
        dropRow.style.backgroundColor = '#fff';
        inputPrice.style.zIndex = '1';
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