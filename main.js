let ul = document.querySelector('nav .ul');

function openMenu(){
    ul.classList.add('open');
}

function closeMenu(){
    ul.classList.remove('open');
}






// Objeto para armazenar itens do carrinho e suas quantidades
let cart = {};

// Referências para os elementos do DOM
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const modal = document.getElementById('modal');
const cartItemsList = document.getElementById('cart-items');
const finalizarCompraBtn = document.getElementById('finalizar-compra');

// Função para adicionar item ao carrinho
function addToCart(item) {
    if (cart[item]) {
        cart[item]++;
    } else {
        cart[item] = 1;
    }
    updateCartDisplay();
}

// Função para remover item do carrinho
function removeFromCart(item) {
    if (cart[item]) {
        cart[item]--;
        if (cart[item] === 0) {
            delete cart[item];
        }
    }
    updateCartDisplay();
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    cartCount.textContent = totalItems;
    
    // Mostra o ícone do carrinho se houver itens
    if (totalItems > 0) {
        cartIcon.style.display = 'block';
    } else {
        cartIcon.style.display = 'none';
    }
    
    // Atualiza a lista de itens no modal
    cartItemsList.innerHTML = '';
    for (const item in cart) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item} - ${cart[item]} 
            <div class="quantity-controls">
                <button onclick="addToCart('${item}')">+</button>
                <button onclick="removeFromCart('${item}')">-</button>
            </div>
        `;
        cartItemsList.appendChild(li);
    }
}

// Função para abrir o modal do carrinho
function openCart() {
    modal.style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
    modal.style.display = 'none';
}

// Adiciona event listeners para os botões de adicionar ao carrinho
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.getAttribute('data-vegetal');
        addToCart(item);

        // Mostra o modal após adicionar um item
        openCart();
    });
});

// Fechar o modal quando clicar fora dele
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Redireciona para a página de agradecimento
finalizarCompraBtn.addEventListener('click', () => {
    // Verificar se o carrinho não está vazio antes de finalizar a compra
    if (Object.keys(cart).length > 0) {
        window.location.href = 'agradecimento.html';
    } else {
        alert('Seu carrinho está vazio!');
    }
});

// Inicialização do contador e ícone
updateCartDisplay();
