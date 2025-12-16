document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('authSubmit');
  var userInput = document.getElementById('user');
  var passInput = document.getElementById('pass');
  var resultBox = document.getElementById('authResultError');

  if (!btn || !userInput || !passInput || !resultBox) return;

  function getStoredAccount() {
    var data = localStorage.getItem('account');
    return data ? JSON.parse(data) : null;
  }

  btn.addEventListener('click', function () {
    var Ten = userInput.value;
    var MatKhau = passInput.value;
    var account = getStoredAccount();

    resultBox.style.display = 'block';

    if (Ten === '') {
      resultBox.textContent = 'Tên không được để trống';
      userInput.focus();
      return;
    }

    if (MatKhau === '') {
      resultBox.textContent = 'Mật khẩu không được để trống';
      passInput.focus();
      return;
    }

    if (account) {
      if (Ten !== account.username || MatKhau !== account.password) {
        resultBox.textContent = 'Sai tên đăng nhập hoặc mật khẩu';
        return;
      }
      resultBox.textContent = 'Đăng nhập thành công';
      return;
    }

    if (Ten !== 'admin') {
      resultBox.textContent = 'Không phải admin';
      userInput.focus();
      return;
    }

    if (MatKhau !== '123456') {
      resultBox.textContent = 'Sai mật khẩu';
      passInput.focus();
      return;
    }

    resultBox.textContent = 'Thành công';
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const contactError = document.getElementById('contactError');
  const contactSuccess = document.getElementById('contactSuccess');

  if (!contactForm || !contactError || !contactSuccess) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    contactError.style.display = 'none';
    contactSuccess.style.display = 'none';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      contactError.textContent = 'Vui lòng nhập đầy đủ Họ tên, Email và Nội dung.';
      contactError.style.display = 'block';
      return;
    }

    const subject = encodeURIComponent('Liên hệ từ ' + name);
    const body = encodeURIComponent(
      'Họ và tên: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      'Nội dung:\n' + message
    );

    window.location.href = 'mailto:trainingvhhhk@gmail.com?subject=' + subject + '&body=' + body;

    contactSuccess.textContent = 'Trình email của bạn sẽ mở để gửi liên hệ tới chúng tôi.';
    contactSuccess.style.display = 'block';
    contactForm.reset();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var signupBtn = document.getElementById('signupSubmit');
  var signupUser = document.getElementById('signupUser');
  var signupPass = document.getElementById('signupPass');
  var signupPass2 = document.getElementById('signupPass2');
  var signupResult = document.getElementById('signupResult');

  if (!signupBtn || !signupUser || !signupPass || !signupPass2 || !signupResult) return;

  signupBtn.addEventListener('click', function () {
    var u = signupUser.value;
    var p1 = signupPass.value;
    var p2 = signupPass2.value;

    signupResult.style.color = 'red';

    if (u === '' || p1 === '' || p2 === '') {
      signupResult.textContent = 'Vui lòng nhập đầy đủ thông tin.';
      return;
    }

    if (p1 !== p2) {
      signupResult.textContent = 'Mật khẩu nhập lại không khớp.';
      return;
    }

    if (p1.length < 4) {
      signupResult.textContent = 'Mật khẩu phải có ít nhất 4 ký tự.';
      return;
    }

    localStorage.setItem('account', JSON.stringify({ username: u, password: p1 }));

    signupResult.style.color = 'green';
    signupResult.textContent = 'Đăng ký thành công. Bây giờ bạn có thể đăng nhập.';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const cartCountEl = document.getElementById('cart-count');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartTableBody = document.getElementById('cart-table-body');
  const cartTotalEl = document.getElementById('cart-total');

  function loadCart() {
    const data = localStorage.getItem('cartItems');
    return data ? JSON.parse(data) : [];
  }

  function saveCart(cart) {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }

  function updateCartCount() {
    if (!cartCountEl) return;
    const cart = loadCart();
    let totalQty = 0;
    cart.forEach(function (item) {
      totalQty += item.qty;
    });
    cartCountEl.textContent = totalQty;
  }

  function addToCart(product) {
    const cart = loadCart();
    let found = false;

    cart.forEach(function (item) {
      if (item.id === product.id) {
        item.qty += 1;
        found = true;
      }
    });

    if (!found) {
      cart.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        qty: 1,
      });
    }

    saveCart(cart);
    updateCartCount();
    alert('Đã thêm "' + product.name + '" vào giỏ hàng.');
  }

  function renderCartPage() {
    if (!cartTableBody || !cartTotalEl) return;
    const cart = loadCart();
    cartTableBody.innerHTML = '';

    let total = 0;

    cart.forEach(function (item, index) {
      const row = document.createElement('tr');
      const lineTotal = item.price * item.qty;
      total += lineTotal;

      row.innerHTML =
        '<td>' + (index + 1) + '</td>' +
        '<td>' + item.name + '</td>' +
        '<td>' + item.brand + '</td>' +
        '<td>' + item.price.toLocaleString('vi-VN') + '₫</td>' +
        '<td>' + item.qty + '</td>' +
        '<td>' + lineTotal.toLocaleString('vi-VN') + '₫</td>';

      cartTableBody.appendChild(row);
    });

    cartTotalEl.textContent = total.toLocaleString('vi-VN') + '₫';
  }

  addToCartButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const brand = btn.getAttribute('data-brand');
      const price = Number(btn.getAttribute('data-price')) || 0;

      addToCart({ id: id, name: name, brand: brand, price: price });
    });
  });

  updateCartCount();
  renderCartPage();
});
