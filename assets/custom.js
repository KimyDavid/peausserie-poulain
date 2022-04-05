window.onload = init;

function init(){
   let pathname = window.location.pathname;
   if(pathname == '/account/register' || pathname == '/en/account/register'){
      initRegister();
   }else if(pathname == '/cart' || pathname == '/en/cart'){
      initCart();
   }else if(pathname.includes('/products/')){
      initProduct();
   }
}

function initProduct(){
  
  var inventory = null;
  
  var selectorVariant, divInventorySingle, productSingleBottom, selectorQuantity, qtyMinus, qtyPlus, customWarnQty;
  selectorVariant = document.querySelector('[data-custom="selector-variant"]');
  divInventorySingle = document.querySelector('[data-custom="inventory-single"]');
  selectorQuantity = document.querySelector('[data-custom="selector-quantity"]');
  qtyMinus = document.querySelector('[data-custom="qty-minus"]');
  qtyPlus = document.querySelector('[data-custom="qty-plus"]');
  customWarnQty = document.querySelector('.custom-warn-qty');
  
  if(selectorVariant) inventory = selectorVariant.options[selectorVariant.selectedIndex].dataset.custom_inventory;
  else if(divInventorySingle) inventory = divInventorySingle.dataset.custom_inventory;
  
  if(selectorVariant){
    selectorVariant.addEventListener('change', function(){
      if(this.options[this.selectedIndex].dataset.custom_inventory){
      	inventory = this.options[this.selectedIndex].dataset.custom_inventory;
      }else{
      	inventory = null;                              
      }
  	});
  }
  
  if(qtyMinus && qtyPlus && inventory && selectorQuantity){
    qtyPlus.addEventListener('click', function(event){
      if(parseInt(selectorQuantity.value, 10) + 1 == inventory){
        qtyPlus.style.display = 'none';
        if(customWarnQty) customWarnQty.style.display = 'block';
      }
    });
    qtyMinus.addEventListener('click', function(event){
      qtyPlus.style.display = 'inline-block';
      if(customWarnQty) customWarnQty.style.display = 'none';
    });
  }
  
  if(selectorQuantity){ 
    selectorQuantity.addEventListener('change', function(){
    	console.log(inventory, this.value);
  	});
  }
}

function initRegister(){
  
  var inputFirstName, inputLastName, inputSiret, inputSaveSiret, inputSaveType;

  inputFirstName = document.getElementById('customer_register-first_name');
  inputLastName = document.getElementById('customer_register-last_name');
  inputSiret = document.getElementById('customer_register-siret');
  inputSaveSiret = document.getElementById('customer_register-save_siret');
  inputSaveType = document.getElementById('customer_register-save_type');
  
  document.getElementById('customer_register_professional').addEventListener('click', function(event){
    document.getElementById('customer_register_individual').checked = false;
    document.querySelector('.custom-input-hide').style.display = 'block';
    inputFirstName.style.display = 'none';
    inputFirstName.previousElementSibling.style.display = 'none';
    inputLastName.setAttribute('required', 'required');
    inputSiret.setAttribute('required', 'required');
    document.querySelector('label[for="customer_register-first_name"] span').innerHTML = '*';
    document.querySelector('label[for="customer_register-last_name"] span').innerHTML += '*';
  });
  
  document.getElementById('customer_register_individual').addEventListener('click', function(event){
    document.getElementById('customer_register_professional').checked = false;
    document.querySelector('.custom-input-hide').style.display = 'none';
    inputFirstName.removeAttribute('required');
    inputLastName.removeAttribute('required');
    inputSiret.removeAttribute('required');
    document.querySelector('label[for="customer_register-first_name"] span').innerHTML = '';
    document.querySelector('label[for="customer_register-last_name"] span').innerHTML = '';
  });
  
  document.getElementById("create_customer").addEventListener('submit', function(event){
    event.preventDefault();
    
    if(document.getElementById('customer_register_professional').checked){
      let siret = document.getElementById("customer_register-siret").value;
      let req = new XMLHttpRequest();
      req.addEventListener('load', loadResponse);
      req.responseType = 'json';
      req.open('GET', 'https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/'+siret, true);
      req.send();
    }
    else{
      inputSaveSiret.remove();
      inputSaveType.remove();
      document.getElementById("create_customer").submit();
    }
  });
  
  function loadResponse(result){
    let response = result.target.response;
    console.log(response);

    if(result.target.status == 200){
      var denomination = "";
      var nom = "";
      if(response.etablissement.unite_legale.denomination){
      	denomination = response.etablissement.unite_legale.denomination;
      }
      if(response.etablissement.unite_legale.nom){
      	denomination = response.etablissement.unite_legale.nom;
      }
      if(denomination.toUpperCleanCase() != inputLastName.value.toUpperCleanCase() && nom.toUpperCleanCase() != inputLastName.value.toUpperCleanCase()){
         displayError(401);
      }else{
        displayError(200);
        inputSaveSiret.value = inputSiret.value;
        document.getElementById("create_customer").submit();
      }
    }else{
      if(result.target.status == 404){  
        displayError(404);
      }
    }
  }

  function displayError(code){
    if(code == 200){
      document.getElementById('customer_register-siret').classList.remove('input-error');
      let error = document.querySelector('#customer_register-siret ~ .custom-error');
      error.innerHTML = '';
      error.style.display = 'none';

    }else{
      document.getElementById('customer_register-siret').classList.add('input-error');
      let error = document.querySelector('#customer_register-siret ~ .custom-error');
      error.innerHTML = error.getAttribute('data-error_'+code);
      error.style.display = 'block';
    }
  }
}

function initCart(){
  document.getElementById('form-cart').addEventListener('submit', function(event){
    if(document.querySelector("input[name='discount']").value.trim().length == 0){
      document.querySelector("input[name='discount']").value = document.querySelector("input[name='discount-hidden']").value;
    }
  });
}

function initPrice(result){
  let priceRules = result.target.response.price_rules;
  let pricePro = getPricePro(priceRules);
  
  console.log('customerPro', customerPro);
  
  if(customerPro && pricePro){
    
    console.log('customerProENTER');
    
    /* PRODUCT */
      //Display reduction on product
      if(document.querySelector('.product_price')){
        document.querySelectorAll('.product_price').forEach(function(element){
          console.log(element);
          displayReduction(element, 'product', pricePro);
        });  
      }
    
      //Display new price on product
      if(document.querySelector('.custom-price')){
        var domPrices = document.querySelectorAll(".custom-price");
        domPrices.forEach(function(element){
          changePrice(element, pricePro);
        });
      }
    
    /* CART */
    
      // Display reduction on cart
      document.querySelectorAll('.cart__total').forEach(function(element){
         console.log('CART_TOTAL');
         console.log(element);
         displayReduction(element, 'cart', pricePro);
         
      });
    
      //Display new price on cart
      if(document.querySelector('.custom-price_cart')){
        var domPrices = document.querySelectorAll(".custom-price_cart");
        domPrices.forEach(function(element){
          changePrice(element, pricePro);    
        });
      }
    	
  }
}

function displayReduction(element, type, pricePro){
  	console.log(pricePro.value);
    var price = (type=='product') ? element.querySelector('.money .custom-price').innerHTML : element.querySelector('.money').innerHTML;
  	var reductionPrice = reduction(price, pricePro.value_type, pricePro.value);
  	//console.log(reductionPrice);
  	let svg = '<svg id="custom-tags-filled"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M17.78 3.09C17.45 2.443 16.778 2 16 2h-5.165c-.535 0-1.046.214-1.422.593l-6.82 6.89c0 .002 0 .003-.002.003-.245.253-.413.554-.5.874L.738 8.055c-.56-.953-.24-2.178.712-2.737L9.823.425C10.284.155 10.834.08 11.35.22l4.99 1.337c.755.203 1.293.814 1.44 1.533z" fill-opacity=".55"></path><path d="M10.835 2H16c1.105 0 2 .895 2 2v5.172c0 .53-.21 1.04-.586 1.414l-6.818 6.818c-.777.778-2.036.782-2.82.01l-5.166-5.1c-.786-.775-.794-2.04-.02-2.828.002 0 .003 0 .003-.002l6.82-6.89C9.79 2.214 10.3 2 10.835 2zM13.5 8c.828 0 1.5-.672 1.5-1.5S14.328 5 13.5 5 12 5.672 12 6.5 12.672 8 13.5 8z"></path></svg></svg>';
  	let html = (type=='product') ? '<div class="custom-wrapper_price"><div class="cutsom-init_price">'+cleanPrice(reductionPrice[0], false)+'</div><div class="custom-init_discount"> - '+cleanPrice(reductionPrice[1], false)+'<span>'+svg+pricePro.title+'</span></div></div>' : '<div class="custom-wrapper_price custom-right"><div class="cutsom-init_price">'+cleanPrice(reductionPrice[0], false)+'</div><div class="custom-init_discount"><span>'+svg+pricePro.title+'</span> - '+cleanPrice(reductionPrice[1], false)+'</div></div>';
    if(window.location.pathname == '/cart'){
    	element.parentNode.parentNode.insertAdjacentHTML('beforebegin', html);
    }else{
    	element.insertAdjacentHTML('beforebegin', html);
    }
}

function changePrice(element, pricePro){
	var price = element.innerHTML;
    var reductionPrice = reduction(price, pricePro.value_type, pricePro.value);
    element.innerHTML = cleanPrice(reductionPrice[2], false);
}
  
function getPricePro(priceRules){
  for(let i=0; i < priceRules.length; i++){
    if(priceRules[i].title = "PRO_ACCOUNT"){
      return priceRules[i];
    }
  }
}

function reduction(price, reductionType, reductionAmount){
  if(reductionType == "percentage"){
    price = cleanPrice(price, true);
  	var reduction = parseFloat(price) * Math.abs(parseFloat(reductionAmount))/100;
    var newPrice = price - reduction;
  }
  return [price, reduction.toFixed(2), newPrice.toFixed(2)];
}

function cleanPrice(price, clean){
  if(clean){
	price = price.replace('€', '');
  	price = price.replace(',', '.');
  	return price.replace(' ', '');
  }else{
  	return price.replace('.', ',') +" €";
  }
}

String.prototype.toUpperCleanCase = function(){
    var special = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var clean = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
  
    var str = this;
    for(var i = 0; i < special.length; i++){
        str = str.replace(special[i], clean[i]);
    }
    return str.toUpperCase();
}