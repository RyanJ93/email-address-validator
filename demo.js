const emailAddressValidator = require('email-address-validator').emailAddressValidator;

//Setting up lists.
emailAddressValidator.setWhiteListDatabasePath(__dirname + '/whitelist.txt');
emailAddressValidator.setBlackListDatabasePath(__dirname + '/blacklist.txt');
emailAddressValidator.setDisposableProvidersDatabasePath(__dirname + '/disposable.txt');

let email = 'foo.bar@mail.com';
let disposable = 'foo.bar@yourdomain.com';

//Checking if the e-mail address is valid.
let result = emailAddressValidator.validateString(email);
console.log('Is a valid e-mail address? ' + ( result === true ? 'Yes' : 'No' ));

//Checking if the e-mail address is valid and existing.
emailAddressValidator.validate(email).then(function(result){
	console.log('Is a valid and existing e-mail address? ' + ( result === true ? 'Yes' : 'No' ));
}).catch(function(error){
	console.log(error);
});

//Checking if the e-mail address is accepted (its provider can be within the white list but not in the black list).
emailAddressValidator.isTrustedProvider(disposable, false, true).then(function(result){
	console.log('Is an accepted e-mail address? ' + ( result === true ? 'Yes' : 'No' ));
}).catch(function(error){
	console.log(error);
});

//Checking if the provider of the e-mail address is disposable or not.
emailAddressValidator.isDisposableProvider(disposable).then(function(result){
	console.log('Is a disposable e-mail address? ' + ( result === true ? 'Yes' : 'No' ));
}).catch(function(error){
	console.log(error);
});