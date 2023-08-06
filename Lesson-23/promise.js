const p = new Promise(function(resolve, reject) {
console.log({resolve, reject});
setTimeout(resolve, 5000);
setTimeout(reject, 6000);
})

.then(
    function onSuccess() {
        console.log('promise success');
    }
)
.catch(
    function onError() {
        console.log('promise error');
    }
);
console.log( p );

console.log( 'hello everyone' );