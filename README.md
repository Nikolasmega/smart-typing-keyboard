# ⌨️ Smart Typing Keyboard v2.6 Pro Plus

> A Google Chrome extension that simulates real human typing with full keystroke dynamics simulation.
> Расширение для Google Chrome, имитирующее живую печать человека с полной симуляцией keystroke dynamics.

---

## 🇬🇧 ENGLISH

### What is this

Smart Typing Keyboard is a Chrome browser extension that types a given text into any text field on a website the way a real human does: with realistic inter-key delays, random pauses, fatigue simulation, and even typos with auto-correction.

Built specifically to handle sites using **keystroke dynamics** (keyboard biometric analysis) for human verification.

---

### Installation

1. Download the archive `Smart-Typing-Keyboard-v2.6-FINAL.zip`
2. Unzip it — a folder called `typing-keyboard` will appear
3. Open Chrome and navigate to: `chrome://extensions/`
4. Enable **Developer Mode** (toggle in the top-right corner)
5. Click **"Load unpacked"**
6. Select the `typing-keyboard` folder
7. Extension installed ✅

> **Updating:** If you have an older version installed, remove it before installing the new one.

---

### How to Use

**Step 1.** Go to the target website and **refresh the page** (F5) after the first installation.

**Step 2.** **Click inside the text field** on the website where you want the text to be typed. Make sure the cursor is blinking inside the field.

**Step 3.** Click the extension icon in the Chrome toolbar (top-right corner).

**Step 4.** Paste or type your text into the large `Your Text` field.

**Step 5.** Choose your **typing duration**: 2, 5, 10, 15, 20, 30, 45 minutes, or 1 hour.

**Step 6.** (Optional) Toggle **Pro Mode** if you need accelerated high-speed typing simulation.

**Step 7.** Click the **▶ Start** button.

**Step 8.** The popup will close after 0.8 seconds. A **5-second countdown** overlay will appear on the page — use this time to switch back to the text field. Typing will begin automatically when the countdown ends.

**To stop:** Press **ESC** anywhere on the page at any time. Or reopen the extension and click **■ Stop**.

---

### ⚠️ Important Note on Timing

> **The selected typing duration is an approximate target, not a guarantee.**

**Due to the realistic simulation algorithm (random pauses, fatigue, typos, punctuation delays), the actual typing time may differ from the selected duration by 10–25%.**

**It is strongly recommended to:**
- Run a **test typing session** with a small piece of text before your main task
- **Time the test** from start to finish
- Adjust the selected time window based on the result

---

### Engine Features

| Feature | Description |
|---|---|
| Keystroke Dynamics | Dwell time 85ms ± 28ms (Gaussian distribution) |
| **Pro Mode** | **Accelerated ultra-fast typing simulation engine for quick tasks** |
| Express Timing | New **2-minute** short typing window option added |
| Bigram acceleration | 50 common letter pairs (`th`, `he`, `in`, `er`…) typed faster |
| Fatigue model | Speed gradually slows ~20% toward end of text |
| Typo simulation | 2% chance of typo → Backspace → correction |
| Thinking pauses | 4% chance of 800ms+ pause between characters |
| Punctuation delay | Long pause after `.` `!` `?`, short after `,` |
| ESC stop | Instant stop at any moment |
| 5-sec countdown | Time to switch back to the page |

---

### Supported Field Types

- `<input type="text">`, `email`, `search`, `url`, `tel`, `password`
- `<textarea>`
- `contenteditable` elements (rich editors, React fields)

---

### Troubleshooting

**Nothing happens when I click Start:**
→ Make sure you clicked inside the text field on the site before pressing Start.

**Text doesn't appear:**
→ Refresh the page (F5) and try again.

**Error when loading the extension:**
→ Make sure you selected the `typing-keyboard` folder, not the ZIP archive itself.

**Extension not working on some pages:**
→ Chrome restricts extensions on `chrome://...` pages and the Chrome Web Store. This is a browser limitation.

---

### 💛 Support the Project

If this extension was useful to you, consider supporting its development with a donation. Every contribution motivates further development and new features.

**Crypto Wallet Address:**

**`0x9c0E67b2792aCf0c73CfB5891d58861167aD9918`**

**Supported Networks:** Polygon · BNB Chain

Any amount is welcome and greatly appreciated 🙏

---
---

## 🇷🇺 РУССКИЙ

### Что это такое

Smart Typing Keyboard — расширение для браузера Chrome, которое печатает заданный текст в любое текстовое поле на сайте так, как это делает живой человек: с реалистичными задержками между клавишами, случайными паузами, усталостью и даже опечатками с автоисправлением.

Разработано с учётом систем защиты на основе **keystroke dynamics** (анализ биометрии клавиатурного ввода).

---

### Установка

1. Скачай архив `Smart-Typing-Keyboard-v2.6-FINAL.zip`
2. Распакуй его — появится папка `typing-keyboard`
3. Открой Chrome и перейди по адресу: `chrome://extensions/`
4. Включи **Режим разработчика** (переключатель в правом верхнем углу)
5. Нажми **«Загрузить распакованное расширение»**
6. Выбери папку `typing-keyboard`
7. Расширение установлено ✅

> **Обновление:** Если у тебя уже установлена старая версия — удали её перед установкой новой.

---

### Как пользоваться

**Шаг 1.** Перейди на нужный сайт и **обнови страницу** (F5) после первой установки расширения.

**Шаг 2.** **Кликни мышкой в текстовое поле** на сайте, куда нужно напечатать текст. Убедись, что курсор мигает внутри поля.

**Шаг 3.** Нажми на иконку расширения в панели браузера (правый верхний угол).

**Шаг 4.** Вставь или введи текст в большое поле `Your Text`.

**Шаг 5.** Выбери **время печати**: 2, 5, 10, 15, 20, 30, 45 минут или 1 час.

**Шаг 6.** (Опционально) Включи режим **Pro Mode** для активации ускоренной симуляции печати.

**Шаг 7.** Нажми кнопку **▶ Start**.

**Шаг 8.** Popup закроется через 0.8 секунды. На странице появится счётчик обратного отсчёта **5 секунд** — за это время вернись к текстовому полю. Через 5 секунд начнётся автоматическая печать.

**Остановка:** Нажми **ESC** в любой момент прямо на странице. Либо снова открой расширение и нажми **■ Stop**.

---

### ⚠️ Важное предупреждение о времени

> **Указанное время печати является приблизительным ориентиром, а не гарантией.**

**Из-за алгоритма реалистичной симуляции (случайные паузы, усталость, опечатки, задержки после знаков препинания) фактическое время печати может отличаться от выбранного на 10–25%.**

**Настоятельно рекомендуется:**
- Перед выполнением основной задачи проведи **тестовую печать** с небольшим фрагментом текста
- **Засеки время** от начала до конца тестовой печати
- Исходя из результата скорректируй выбранное временное окно

---

### Возможности движка

| Функция | Описание |
|---|---|
| Keystroke Dynamics | Dwell time 85ms ± 28ms (распределение Гаусса) |
| **Pro Mode** | **Режим ускоренной печати Pro для быстрого прохождения полей** |
| Экспресс-тайминг | Добавлена новая опция быстрой печати за **2 минуты** |
| Bigram acceleration | 50 частых пар букв (`th`, `he`, `in`, `er`…) печатаются быстрее |
| Fatigue model | К концу текста скорость снижается на ~20% |
| Typo simulation | 2% вероятность опечатки → Backspace → исправление |
| Thinking pauses | 4% вероятность паузы 800ms+ между символами |
| Punctuation delay | Долгая пауза после `.` `!` `?`, короткая после `,` |
| ESC stop | Мгновенная остановка в любой момент |
| 5-сек таймер | Время переключиться обратно на страницу |

---

### Поддержанные типы полей

- `<input type="text">`, `email`, `search`, `url`, `tel`, `password`
- `<textarea>`
- `contenteditable` элементы (редакторы, React-поля)

---

### Устранение неполадок

**Расширение не реагирует на Start:**
→ Убедись, что перед нажатием Start ты кликнул в текстовое поле на сайте.

**Текст не появляется:**
→ Обнови страницу (F5) и попробуй снова.

**Ошибка при загрузке расширения:**
→ Убедись, что выбрана папка `typing-keyboard`, а не сам ZIP-архив.

**Расширение недоступно на некоторых страницах:**
→ Chrome запрещает работу расширений на служебных страницах `chrome://...` и в Интернет-магазине Chrome. Это ограничение браузера.

---

### 💛 Поддержать проект

Если расширение оказалось полезным, ты можешь поддержать разработку донатом. Любой вклад мотивирует развитие проекта и добавление новых функций.

**Адрес криптокошелька:**

**`0x9c0E67b2792aCf0c73CfB5891d58861167aD9918`**

**Поддерживаемые сети:** Polygon · BNB Chain

Любая сумма приветствуется и очень ценится 🙏

---

*Smart Typing Keyboard v2.6 Pro Plus — Keystroke Dynamics Engine*
