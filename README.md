### Команди для запуска (для запуска потрібен docker compose)

```
cp .env.example .env && npm run server:rebuild
```

### Завдання 2

```
Having done the work above to create a prototype of the URL shortener service,
let's think about this at a larger scale. What if this service needed to scale to
10,000 URL generation requests per second? How about 100,000 URL resolve
requests per second? Describe how you'd actually architect a system like this.
Specifically, how would the URL generation work at scale (and what generation
method you'd use) and how the URL resolving would work at scale. How would
you store the data? How long would you keep it around?
```

```
Щодо хайлоада, я би використовува Redis як кеш що дозволить зменшити кількість запитів до бази даних в рази. 
Він повинен витримати доволі таки високе навантаження якщо не витримає я би подумав про встановлення кластера 
для редіса але я думаю одного інстанса буде достатньо. Інший  варіант можна поставити якись гетевей перед бекендом
який буде кешувати запити і бек буде завантажений лише на створені силки. Все таки по домену даного сервіса єдиний
кейс завантаженості це те що умовний блогер створив short link і кинув в чат з сотнями тисяч людей
і вони всі переходять по ній і це один і той же запит який можна закешувати. 
Або варіант дудоса, але тут треба вже ресерчити якись дудос протектор. Або писати свій)))
```
