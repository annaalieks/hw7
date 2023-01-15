'use strict';

// 1. Є наступний код:

console.log('start'); // displays 'start' in console log
const promise1 = new Promise((resolve, reject) => { // initialize and declare promise1 variable with the promise constructor value that takes a call back function with two arguments
    console.log(1)  // promise immidiately displays '1' in console log
    resolve(2) // fulfilled promise function returns 2
})
promise1.then(res => { // invokes promise1 function, which immidiately displays '1' in console log
    console.log(res) // displays '2' in console.log, which is returned value of promise function once it is fulfilled
})

console.log('end');  // displays 'end' in console log

// Яким буде результат його виклику? Чому? Опишіть як працює цей код.

// Результат виклику: 
// start
// 1
// end
// 2
// Першим у console.log виводиться 'start', оскільки цей console.log першим потрапляє у call stack і одразу виконується. 
// У 10-му рядку ми змінною promise1, викликаємо promis, який потрапляє у call stack, одразу виводить у console.log значення 1 і потрапляє у task queue
// Тим часом у call stack потрапляє console.log 'end', який одразу виконується і очищує call stack для виконання промісу
// Promise fulfilled, а отже викликається then, який хендлить fulfilled promise і виводить у console log його результат '2'

// 2. Є наступний код:

Promise.resolve(1) // creates fulfilled promise with value 1
	.then((x) => x + 1) // handles promise fulfillment from previous line with value 1 and returnes value 2
	.then((x) => { throw new Error('My Error') })  // handles promise fulfillment from previous line with value 2 and throws an exception "My Error" error
	.catch(() => 1) // handles promise rejection from previous line and returnes value 1
	.then((x) => x + 1) // handles promise fulfillment from previous line with value 1 and returnes value 2
	.then((x) => console.log(x)) // handles promise fulfillment from previous line with value 2 and displays it in console log
	.catch(console.error) // is not invoked as far as there is no error

// Яким буде результат його виклику? Чому? Опишіть як працює цей код.

// Результат виклику: 2. У консоль лог (рядок 35) виводиться значення, отримане в рядку 34, де x - це значення, поверенене в рядку 33.

// 3. Є наступний код:

const promise = new Promise(res => res(2));  // initialize and declare promise variable with the promise constructor value that takes a call back function, which returnes '2' once fulfilled 
	promise.then(v => { // invokes promise function 
	        console.log(v); // once promise is fulfilled displays its value '2' into console log
	        return v * 2; // this new promise returns 4
	    })
	    .then(v => { // once promise returned by previous .then method is fulfilled
	        console.log(v); // displays its value '4' into console log
	        return v * 2; // this new promise returns 8
	    })
        .finally(v => { // once promise returned by previous .then method is settled
	        console.log(v); // displays value of 'v' into console log, but as soon as .finally ignores what callbacks return, it doesn't see the value of 'v' variable, so it displays 'undefined'
	        return v * 2; // returns NaN as a result of (undefined * 2)
	    })
	    .then(v => { // once previous promise, invoked by 'then' in line 49 is fulfilled
	        console.log(v);  // displays its value '8' into console log
	    });

// Яким буде результат його виклику? Чому? Опишіть як працює цей код.

// Результат виклику: 
// 2
// 4
// undefined
// 8
// Як тільки promis з рядку 44 виконається, метод .then() обробляє його і виводить у console.log значення '2' та повертає 4
// Metod .then() з 49 рядку обробляє fulfilled promise з 44 рядку та виводить у console.log значення '4', повертає 8
// Metod .finally() обробляє будь-які settled проміси, ігноруючи їх значення, тож у console.log виводиться 'undefined', оскільки значення змінної v ця фунція не бачить
// Metod .then() з 57 рядку обробляє fulfilled promise з 49 рядку та виводить у console.log значення '8'.
