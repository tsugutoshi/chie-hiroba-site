const games = {
  letters: { image: '390-game0', title: '「あ」のおと、どこかな？', description: '読み上げを聞いて、同じ文字をタッチ。\nひらがなと音を、遊びながらつなげます。', alt: 'もじさがしのアプリ画面。読み上げられたひらがなを選ぶ' },
  numbers: { image: '390-game19', title: 'ゆびでたどって、すうじと出会う。', description: '数字の道を、ゆっくりなぞってみよう。\n手を動かして、形になじんでいきます。', alt: 'すうじなぞりのアプリ画面。数字の道を指でなぞる' },
  brushing: { image: '390-game15', title: 'ごしごし、ぴかぴか、きもちいい。', description: 'どうぶつたちの歯をみがいて、ぴかぴかに。\n毎日の暮らしも、楽しいあそびに。', alt: '歯みがきのアプリ画面。どうぶつの歯の汚れをこすって落とす' },
  space: { image: 'pilot-rings', title: 'ロケットで、ほしのわをくぐろう。', description: 'ロケットを動かして、輪を目指して出発。\n宇宙の冒険の、はじめの一歩に。', alt: '星の輪くぐりのアプリ画面。ロケットを上下に操縦する' }
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectGame(tab) {
  const game = games[tab.dataset.game];
  if (!game) return;
  tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  document.getElementById('game-panel').setAttribute('aria-labelledby', tab.id);
  const image = document.getElementById('game-image');
  image.src = `images/${game.image}.png`;
  image.alt = game.alt;
  document.getElementById('game-title').textContent = game.title;
  document.getElementById('game-description').textContent = game.description;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectGame(tab));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = tabs[(index + 1) % tabs.length];
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = tabs[(index + tabs.length - 1) % tabs.length];
    else if (event.key === 'Home') target = tabs[0];
    else if (event.key === 'End') target = tabs.at(-1);
    if (target) { event.preventDefault(); selectGame(target); target.focus(); }
  });
});
