const emailAddressValidator = require('./email-address-validator').emailAddressValidator;

//Setting up lists.
emailAddressValidator.setWhiteListDatabasePath('whitelist.txt');
emailAddressValidator.setBlackListDatabasePath('blacklist.txt');
emailAddressValidator.setDisposableProvidersDatabasePath('disposable.txt');

let email = 'foo.bar@mail.com';
let disposable = 'foo.bar@yourdomain.com';

//Checking if the e-mail address is valid and existing.
emailAddressValidator.validate(email).then(function(value){
	console.log('Valid and existing: ' + value);
}).catch(function(error){
	console.log(error);
});

//Checking if the e-mail address is accepted (its provider can be within the white list but not in the black list).
emailAddressValidator.isTrustedProvider(disposable, false, true).then(function(value){
	console.log('Trusted and not disposable provider: ' + value);
}).catch(function(error){
	console.log(error);
});

//Checking if the provider of the e-mail address is disposable or not.
emailAddressValidator.isDisposableProvider(disposable).then(function(value){
	console.log('Disposable provider: ' + value);
}).catch(function(error){
	console.log(error);
});