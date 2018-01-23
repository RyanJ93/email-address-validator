# E-mail validator

A very simple library that allows you to validate an e-mail address, check if it exists through online connection and check if the provider is a disposable one or not.

# E-mail validation

String validation:

`emailAddressValidator.validateString(email);`

Complete validation (async with promise support):

`emailAddressValidator.validate(email).then(function(result){}).catch(function(error)){}`

The complete validation will check address syntax first, after that will check for provider existence through DNS resolution and then will check if the given e-mail address exists.

# E-mail provider check

Check if the e-mail provider is accepted:

`emailAddressValidator.isTrustedProvider(email, disposableAllowed, strict, asynchronous);`

With accepted is meant that the provider is found within the given white list, if strict mode is not enabled, will be also checked if the provider is found within the black list, in this case will be returned "false".
If the provider is checked using strict mode will be returned "true" only if it is found within the given white list.
Both white list and black list must be plain text files and providers must be separated by a break line (\n).
This method can be executed both in synchronous and asynchronous way, in this case it will return a promise.

Check if the e-mail provider is disposable:

`emailAddressValidator.isDisposableProvider(email, asynchronous);`

This method will check if the provider is included in the given list containing the disposable providers, a list with most common disposable providers is shipped with this library (kindly offered by [@michenriksen](https://gist.github.com/michenriksen/8710649)).
Disposable providers list must be plain text files and providers must be separated by a break line (\n).
This method can be executed both in synchronous and asynchronous way, in this case it will return a promise.

Are you looking for the PHP version? Give a look [here](https://github.com/RyanJ93/php-email-address-validator).