const characters = [
  {
    id: 'yuki',
    name: '雪柚',
    en: 'Yuki & Xiao Tan',
    role: '温柔的双生猫少女',
    image: 'assets/yuki-cats.jpg',
    tone: 'violet',
    quote: '在柔软的日常里，找到彼此的光。',
    intro: '来自冬日小镇的两位猫少女，总是形影不离。她们喜欢晒太阳、分享零食，也把每一次拥抱都当作珍贵的收藏。',
    traits: ['慢热', '猫咪', '甜点'],
    info: [['姓名', '雪柚 & 小棠'], ['种族', '雪猫 / 黑猫'], ['身高', '142 cm / 148 cm'], ['喜好', '奶油、午后、拥抱']],
    colors: ['#aebeff', '#f2c7d2', '#474954']
  },
  {
    id: 'huanye',
    name: '幻叶',
    en: 'Huanye',
    role: '森林里的风之精灵',
    image: 'assets/huanye-green.jpg',
    tone: 'green',
    quote: '愿每一阵风，都把好消息带到你身边。',
    intro: '幻叶住在会发光的森林边缘。她能听懂叶片的低语，喜欢收集清晨的露水，把安静而清新的力量分享给每一个路过的人。',
    traits: ['自然', '微风', '温柔'],
    info: [['姓名', '幻叶'], ['种族', '森之精灵'], ['身高', '156 cm'], ['喜好', '风、树叶、柠檬茶']],
    colors: ['#83d7ae', '#c6efcc', '#537a69']
  },
  {
    id: 'seira',
    name: '星澜',
    en: 'Seira',
    role: '来自星海的梦旅人',
    image: 'assets/seira-blue.jpg',
    tone: 'blue',
    quote: '把星星装进口袋，就能照亮很远的路。',
    intro: '星澜从遥远的星海而来，借住在一颗蓝色小行星上。她擅长记录梦境，也总能在最意外的时刻发现闪闪发光的小事。',
    traits: ['星海', '探索', '幻想'],
    info: [['姓名', '星澜'], ['种族', '星之兽'], ['身高', '128 cm'], ['喜好', '星星、牛奶、软绵绵']],
    colors: ['#79bdf4', '#c9e7ff', '#3c72b7']
  },
  {
    id: 'natsu',
    name: '柠夏',
    en: 'Natsu',
    role: '把阳光装进口袋的女孩',
    image: 'assets/natsu-lime.jpg',
    tone: 'lime',
    quote: '今天也要闪闪发亮，去喜欢更大的世界。',
    intro: '柠夏的笑容像盛夏一样明亮。她热爱音乐、冒险和一切新鲜事，总会拉着朋友一起出发，把平凡日子变成值得纪念的故事。',
    traits: ['阳光', '音乐', '冒险'],
    info: [['姓名', '柠夏'], ['年龄', '16'], ['身高', '158 cm'], ['喜好', '阳光、音乐、零食']],
    colors: ['#e7f45e', '#80df9f', '#56634f']
  }
];

function setupMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('is-open')));
}

function cardTemplate(character, compact = false) {
  return `<article class="character-card ${compact ? 'character-card--compact' : ''}" data-tone="${character.tone}">
    <a class="character-card__image-wrap" href="detail.html?id=${character.id}" aria-label="查看${character.name}的详细资料">
      <img class="character-card__image" src="${character.image}" alt="${character.name}角色插画" loading="lazy">
      <span class="character-card__index">0${characters.indexOf(character) + 1}</span>
      <span class="character-card__arrow" aria-hidden="true">↗</span>
    </a>
    <div class="character-card__body">
      <div>
        <p class="eyebrow">${character.en}</p>
        <h3>${character.name}</h3>
      </div>
      <p class="character-card__role">${character.role}</p>
      <div class="character-card__footer"><span>${character.traits.join(' · ')}</span><span class="tone-dot"></span></div>
    </div>
  </article>`;
}

function initHome() {
  const featured = document.querySelector('[data-featured-grid]');
  if (featured) featured.innerHTML = characters.map((character) => cardTemplate(character)).join('');
}

function initGallery() {
  const grid = document.querySelector('[data-gallery-grid]');
  if (!grid) return;
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const render = (filter = 'all') => {
    const result = filter === 'all' ? characters : characters.filter((character) => character.tone === filter);
    grid.innerHTML = result.map((character) => cardTemplate(character)).join('');
    document.querySelector('[data-result-count]').textContent = String(result.length).padStart(2, '0');
  };
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    render(button.dataset.filter);
  }));
  render();
}

function initDetail() {
  const id = new URLSearchParams(window.location.search).get('id') || 'huanye';
  const character = characters.find((item) => item.id === id) || characters[1];
  document.title = `${character.name} · huanye`;
  document.documentElement.style.setProperty('--character-accent', character.colors[0]);
  document.querySelector('[data-detail-name]').textContent = character.name;
  document.querySelector('[data-detail-en]').textContent = character.en;
  document.querySelector('[data-detail-role]').textContent = character.role;
  document.querySelector('[data-detail-quote]').textContent = character.quote;
  document.querySelector('[data-detail-intro]').textContent = character.intro;
  document.querySelector('[data-detail-image]').src = character.image;
  document.querySelector('[data-detail-image]').alt = `${character.name}角色插画`;
  document.querySelector('[data-detail-index]').textContent = `0${characters.indexOf(character) + 1} / 04`;
  document.querySelector('[data-detail-tags]').innerHTML = character.traits.map((trait) => `<span>${trait}</span>`).join('');
  document.querySelector('[data-detail-info]').innerHTML = character.info.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
  document.querySelector('[data-detail-colors]').innerHTML = character.colors.map((color) => `<span style="--swatch:${color}" title="${color}"></span>`).join('');
  const index = characters.indexOf(character);
  const previous = characters[(index - 1 + characters.length) % characters.length];
  const next = characters[(index + 1) % characters.length];
  document.querySelector('[data-previous]').href = `detail.html?id=${previous.id}`;
  document.querySelector('[data-next]').href = `detail.html?id=${next.id}`;
  document.querySelector('[data-previous] .pager-name').textContent = previous.name;
  document.querySelector('[data-next] .pager-name').textContent = next.name;
  document.querySelector('[data-related]').innerHTML = characters.filter((item) => item.id !== character.id).slice(0, 3).map((item) => cardTemplate(item, true)).join('');
}

setupMenu();
if (document.body.dataset.page === 'home') initHome();
if (document.body.dataset.page === 'gallery') initGallery();
if (document.body.dataset.page === 'detail') initDetail();
