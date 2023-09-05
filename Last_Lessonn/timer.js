document.addEventListener('DOMContentLoaded', function() {
    // кінцева дата
    const deadline = new Date(2023, 10, 1);
    // Зберігання ідентифікатора таймера здійснюється в змінній timerId:
    let timerId = null;
    // функція використовується для відмінювання чисельних:
    function declensionNum(num, words) {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // рахуємо різницю дат і встановлюємо час, що залишився, як вміст елементів
    // Розрахунок часу, що залишився, здійснюється за допомогою віднімання поточної дати з кінцевої
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      // Обчислення кількості d,h,m,s що залишилася. Функція Math.floor використовується для округлення числа
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      $days.textContent = days < 10 ? '0' + days : days;
      $hours.textContent = hours < 10 ? '0' + hours : hours;
      $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
      $days.dataset.title = declensionNum(days, ['day', 'day', 'days']);
      $hours.dataset.title = declensionNum(hours, ['hour', 'hours', 'hours']);
      $minutes.dataset.title = declensionNum(minutes, ['minute', 'minutes', 'minutes']);
      $seconds.dataset.title = declensionNum(seconds, ['second', 'seconds', 'seconds']);
    }
    // отримуємо елементи які мають компоненти дати
    const $days = document.querySelector('.timer-days');
    const $hours = document.querySelector('.timer-hours');
    const $minutes = document.querySelector('.timer-minutes');
    const $seconds = document.querySelector('.timer-seconds');
    // викликаємо функцію countdownTimer
    countdownTimer();
    // викликаємо функцію countdownTimer кожну секунду
    timerId = setInterval(countdownTimer, 1000);
  });