let postBtn = document.querySelectorAll('.post__btn');
let products = document.querySelector('.post__products');
let modal = document.querySelector('.modal');
let movi = document.querySelector('.video');
let modalmes = document.querySelector('.modal__messages');
render(photos);
postBtn.forEach(function (item) {
  item.addEventListener('click', function () {
    for (let i of postBtn) {
      i.classList.remove('post__btnActiv')
    }
    item.classList.add('post__btnActiv');
    if (item.value == 1) {
      render(photos);
    }
    else if (item.value == 2) {
      render(videos);
    }
    else if (item.value == 3) {
      render(tagged);
    }
  });
});
function render(item) {
  products.innerHTML = "";
  for (let i of item) {
    let divs = document.createElement('div');
    divs.className = 'post__items col-xs-4';
    divs.innerHTML = `
    <div class="post__content">
      <i class="bi post__icn bi-play-fill"></i>
      <img src="${i.img}" alt="img">
      <span class="post__span">
      <div class="post__icons">
        <i class="bi post__messages bi-heart-fill"></i> ${i.like}k
        <i class="bi post__messages chat bi-chat-fill"></i> ${i.messages}
      </div>
      </span>
    </div>`
    products.append(divs);
    divs.addEventListener('click', function () {
      modal.classList.add('modal--block');
      modalRender(i.madal,i,i.like);
      document.querySelector('.modal__btn').addEventListener('click', function () {
        movi.innerHTML = '';
        modal.classList.remove('modal--block');
      });
    });
  }
}
function modalRender(madal,like,lastlike) {
  movi.innerHTML = '';
  for (let i in madal) {
    if (i == 'video') {
      movi.innerHTML = `<video controls autoplay src="${madal[i]}"></video>`;
      document.querySelector('.modal__views-span').textContent = 'views';
      document.querySelector('.modal__views').textContent = "52,732";
    }
    if (i == 'imgs') {
      movi.innerHTML = `<img src="${madal[i]}" alt="im">`;
      document.querySelector('.modal__views-span').textContent = 'likes';
      likly(movi,like,lastlike);
    }
    if (i == 'commet') {
      modalMessages(madal[i]);
    }
  }
}
function modalMessages(item) {
  modalmes.innerHTML = '';
  for (let i of item) {
    let modaldiv = document.createElement('div');
    modaldiv.className = 'modal__messages-links';
    modaldiv.innerHTML = `
    <div class="modal__messages-link">
      <div class="modal__messages-inner">
        <img class="modal__messages-img" src="${i.user}" alt="img">
      </div>
      <div>
        <a href="#" class="modal__messages-ink">${i.userN}</a>
        <span class="modal__messages-mess">${i.userM}</span>
      </div>
    </div>`
    modalmes.append(modaldiv);
  }
}
function likly(movi,like,lastlike){
  let idf = [like];
  document.querySelector('.modal__views').textContent = lastlike;
  movi.addEventListener('dblclick',function(){
    for(let i of idf){
      if(!i.onlike){
        i.onlike = true;
        i.like = +i.like + 1;
        document.querySelector('.modal__views').textContent = i.like;
      }
      else if(i.onlike){
        i.onlike = false;
        i.like = i.like - 1;
        document.querySelector('.modal__views').textContent = i.like;
      }
    }
  });
}