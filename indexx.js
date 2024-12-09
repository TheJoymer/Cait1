  // Доступные товары
        //getRandomPrice()
        let availableProducts = [
            { name: "БИЛЕТ НА ФАН ВСТРЕЧУ", price: 2500 },
            { name: "Аккаунт с игрой", price: 1500 },
            { name: "Фигурка крипера", price: 2000 },
            { name: "Голова крипера картонная", price: 500 },
            { name: "Лего набор (случайный)", price: 1750 },
            { name: "Светильник факел", price: 800 },
            { name: "Светильник зелье", price: 1000 },
        ];
    
        // Корзина
        let cart = [];
    
        // Функция для генерации случайной цены
        function getRandomPrice() {
            return Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
        }
    
        // Функция для обновления цены "Билета на фан встречу"
/*        function updateTicketPrice() {
    let ticket = availableProducts.find(product => product.name === "БИЛЕТ НА ФАН ВСТРЕЧУ");
    if (ticket) {
        ticket.price = getRandomPrice();
        renderAvailableProducts();
    } else {
        console.error("Продукт с именем 'БИЛЕТ НА ФАН ВСТРЕЧУ' не найден");
    }
}*/
        // Функция для отображения списка доступных товаров
        function renderAvailableProducts(products = availableProducts) {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            products.forEach((product, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div><strong>${product.name}</strong></div>
                    <div>Цена: ${product.price} руб.</div>
                    <button onclick="addToCart(${index})">Добавить в корзину</button>
                `;
                productList.appendChild(li);
            });
        }
    
        // Функция для добавления товара в корзину
        function addToCart(productIndex) {
            const product = availableProducts[productIndex];
            
            // Проверяем ограничения для "Билета на фан встречу"
            if (product.name === "БИЛЕТ НА ФАН ВСТРЕЧУ") {
                const existingTicket = cart.find(item => item.name === product.name);
                if (existingTicket) {
                    alert("Вы уже добавили билет на фан встречу в корзину!");
                    return;
                }
            }
    
            const existingProduct = cart.find(item => item.name === product.name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                // Сохраняем текущую цену при добавлении в корзину
                cart.push({ ...product, quantity: 1 });
            }
            renderCart();
        }
    
        // Функция для отображения корзины
        function renderCart() {
            const cartDiv = document.getElementById('cart');
            cartDiv.innerHTML = ''; // Очистка перед обновлением
            cart.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'card';
    
                card.innerHTML = `
                    <h3>${item.name}</h3>
                    <div class="child1">
                    <p>Цена: ${item.price} руб.</p>
                    <p>Количество: ${item.quantity}</p>
                    <p>Сумма: ${item.price * item.quantity} руб.</p>
                    </div>
                    <div class="child2">
                    <button onclick="increaseQuantity(${index}, 1)">Добавить</button>
                    <button onclick="decreaseQuantity(${index}, 1)">Уменьшить</button>
                    <button onclick="removeItem(${index})">Удалить</button>
                    </div>
                `;
    
                cartDiv.appendChild(card);
            });
            updateTotalPrice();
        }
    
        // Функции управления корзиной
        function increaseQuantity(index, amount) {
            cart[index].quantity += amount;
            renderCart();
        }
    
        function decreaseQuantity(index, amount) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= amount;
                renderCart();
            } else {
                alert('Количество не может быть меньше 1!');
            }
        }
    
        function removeItem(index) {
            cart.splice(index, 1);
            renderCart();
        }
    
        function updateTotalPrice() {
            const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            document.getElementById('totalPrice').textContent = totalPrice;
        }
    
        // Функция для сортировки доступных товаров
        function sortProducts(order) {
            if (order === 'asc') {
                availableProducts.sort((a, b) => a.price - b.price);
            } else if (order === 'desc') {
                availableProducts.sort((a, b) => b.price - a.price);
            }
            renderAvailableProducts();
        }
    
        // Функция для фильтрации
        function applyFilter() {
            const a = parseFloat(document.getElementById('lowerBound').value);
            const b = parseFloat(document.getElementById('upperBound').value);
            const filtered = availableProducts.filter(item => item.price >= a && item.price <= b);
            renderAvailableProducts(filtered);
        }
    
        // Инициализация
        renderAvailableProducts();
        renderCart();
    
        // Запускаем обновление цены каждые 5 секунд
        setInterval(updateTicketPrice, 1000);
        const mainDiv = document.querySelector('.main'); // Находим div с классом main

document.addEventListener('mousemove', (event) => {
    // Получаем размеры окна
    const { innerWidth: width, innerHeight: height } = window;

    // Уменьшаем масштаб движения, корректируя коэффициенты
    const xOffset = ((event.clientX / width) - 0.5) * 20; // Диапазон от -10 до 10
    const yOffset = ((event.clientY / height) - 0.5) * 20; // Диапазон от -10 до 10

    // Изменяем стиль псевдоэлемента через переменные CSS
    mainDiv.style.setProperty('--bg-x', `${50 + xOffset}%`);
    mainDiv.style.setProperty('--bg-y', `${50 + yOffset}%`);
});
function purchaseItems() {
    if (cart.length === 0) {
        alert("Ваша корзина пуста! Добавьте товары перед покупкой.");
        return;
    }

    const ticket = cart.find(item => item.name === "БИЛЕТ НА ФАН ВСТРЕЧУ");
    if (ticket) {
        const ticketCode = generateTicketCode();
        alert("Спасибо за покупку!"); 
        alert(`Вот ваш билет: ${ticketCode}`);
    } else {
        alert("Спасибо за покупку!");
    }

    cart = []; // Очищаем корзину
    renderCart(); // Обновляем отображение корзины
    updateTotalPrice(); // Обновляем итоговую стоимость
}

// Генерация уникального кода для билета
function generateTicketCode() {
    const getRandomChar = (chars) => chars[Math.floor(Math.random() * chars.length)];
    const vowels = "AEIOUYaeiouy"; // Гласные
    const consonants = "BCDFGHJKLMNPQRSTVWXZbcdfghjklmnpqrstvwxz"; // Согласные
    const digits = "0123456789"; // Цифры

    const part1 = getRandomChar(vowels.toUpperCase()) + getRandomChar(vowels.toUpperCase());
    const part2 = Array(3).fill(null).map(() => getRandomChar(vowels)).join("");
    const part3 = Array(5).fill(null).map(() => getRandomChar(digits)).join("");
    const part4 = Array(4).fill(null).map(() => getRandomChar(consonants)).join("");
    const part5 = getRandomChar(vowels.toUpperCase());
    const part6 = Array(2).fill(null).map(() => getRandomChar(digits)).join("");

    return `${part1}${part2}${part3}${part4}${part5}${part6}`;
}
