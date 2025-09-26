# RentalCar - Car Rental Service ���

## ��� Опис проекту

RentalCar - це веб-додаток для компанії з оренди автомобілів в Україні. Додаток надає користувачам можливість переглядати каталог доступних автомобілів, фільтрувати їх за різними параметрами, додавати в обрані та бронювати.

## Основні функції

- ��� **Головна сторінка** з привітанням та CTA для переходу до каталогу
- ��� **Каталог автомобілів** з можливістю перегляду всіх доступних авто
- ��� **Фільтрація** за брендом, ціною та пробігом
- ❤️ **Обрані** - можливість додавати авто в список обраних
- ��� **Детальна інформація** про кожен автомобіль
- ��� **Форма бронювання** з валідацією
- ��� **Адаптивний дизайн** (mobile-first, від 320px)
- ��� **Збереження обраних** у LocalStorage

## ��� Технології

- **React 18** - JavaScript бібліотека для створення UI
- **Vite** - швидкий збірник для веб-додатків
- **React Router v6** - маршрутизація
- **Axios** - HTTP клієнт для API запитів
- **CSS Modules** - стилізація компонентів
- **React Hot Toast** - нотифікації

## ��� Встановлення та запуск

### Передумови

- Node.js (v16+)
- npm або yarn

### Кроки встановлення

1. Клонуйте репозиторій:

```bash
git clone https://github.com/yourusername/rental-car.git
cd rental-car
```

2. Встановіть залежності:

```bash
npm install
```

3. Запустіть проект в режимі розробки:

```bash
npm run dev
```

4. Відкрийте в браузері:

```
http://localhost:5173
```

### Команди

- `npm run dev` - запуск dev сервера
- `npm run build` - збірка для продакшну
- `npm run preview` - перегляд збірки
- `npm run lint` - перевірка коду

## ��� Структура проекту

```
src/
├── assets/          # Статичні ресурси
├── components/      # Переиспользуемые компоненти
│   ├── Layout/
│   ├── Header/
│   ├── CarCard/
│   ├── CarModal/
│   ├── Filter/
│   └── ...
├── pages/          # Сторінки додатку
│   ├── HomePage/
│   ├── CatalogPage/
│   └── CarDetailsPage/
├── services/       # API сервіси
├── hooks/          # Кастомні хуки
├── utils/          # Утиліти
└── styles/         # Глобальні стилі
```

## ��� API

Додаток використовує REST API для роботи з даними автомобілів:

- Base URL: `https://car-rental-api.goit.global`
- Endpoints:
  - `GET /cars` - список автомобілів з фільтрацією
  - `GET /cars/:id` - деталі автомобіля
  - `GET /brands` - список брендів

## ��� Дизайн

- Mobile-first підхід
- Breakpoints:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1439px
  - Desktop: 1440px+
- Кольорова схема:
  - Primary: #3470FF
  - Text: #121417
  - Secondary: rgba(18, 20, 23, 0.5)

## ��� Ліцензія

MIT

## ���‍��� Автор

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourname)

## ��� Демо

[Live Demo на Vercel](https://rental-car.vercel.app)

---

Розроблено з ❤️ для GoIT
