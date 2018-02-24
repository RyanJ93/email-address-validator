const dns = require('dns');
const net = require('net');
const filesystem = require('fs');

var emailAddressValidator = {
	/**
	* @var String whiteListDatabasePath A string containing the path to the file that contains a list of accepted email providers separated by a breakline (\n).
	*/
	whiteListDatabasePath: null,
	
	/**
	* @var String whiteListDatabase A string containing the content of the providers' white list, if it is going to be cached for next uses.
	*/
	whiteListDatabase: null,
	
	/**
	* @var Boolean whiteListCache If set to "true", the content of the providers' white list will be cached for next uses, otherwise not.
	*/
	whiteListCache: false,
	
	/**
	* @var String blackListDatabasePath A string containing the path to the file that contains a list of banned email providers separated by a breakline (\n).
	*/
	blackListDatabasePath: null,
	
	/**
	* @var String blackListDatabase A string containing the content of the of the providers' black list, if it is going to be cached for next uses.
	*/
	blackListDatabase: null,
	
	/**
	* @var Boolean blackListCache If set to "true", the content of the of the providers' black list will be cached for next uses, otherwise not.
	*/
	blackListCache: false,
	
	/**
	* @var String disposableProvidersDatabasePath A string containing the path to the file that contains a list of disposable email providers separated by a breakline (\n).
	*/
	disposableProvidersDatabasePath: null,
	
	/**
	* @var String disposableProvidersDatabase A string containing the content of the of the disposable email providers' list, if it is going to be cached for next uses.
	*/
	disposableProvidersDatabase: null,
	
	/**
	* @var Boolean disposableProviderscache If set to "true", the content of the of the disposable email providers' list will be cached for next uses, otherwise not.
	*/
	disposableProvidersCache: false,
	
	/**
	* Sets the path to the file that contains the list of accepted email providers, this method is chainable.
	*
	* @param String path A string containing the path to the file.
	*
	* @throws exception If an invalid file path is provided. 
	*/
	setWhiteListDatabasePath: function(path){
		if ( typeof(path) !== 'string' ){
			throw 'Invalid path.';
		}
		if ( path === '' ){
			path = null;
		}
		if ( this.whiteListDatabasePath !== path ){
			this.whiteListDatabase = this.whiteListCache === false ? null : '';
			this.whiteListDatabasePath = path;
		}
		return this;
	},
	
	/**
	* Returns the path to the file that contains the list of accepted email providers.
	*
	* @return String A string containing the path to the file.
	*/
	getWhiteListDatabasePath: function(){
		return this.whiteListDatabasePath === '' || typeof(this.whiteListDatabasePath) !== 'string' ? null : this.whiteListDatabasePath;
	},
	
	/**
	* Sets if the list of accepted email providers shall be cached or not, this method is chainable.
	*
	* @param Boolean value If set to "true", the content of the file will be cached for next uses, otherwise not.
	*/
	setWhiteListCache: function(value){
		if ( value !== true ){
			this.whiteListCache = false;
			this.whiteListDatabase = null;
			return this;
		}
		this.whiteListCache = true;
		return this;
	},
	
	/**
	* Returns if the list of accepted email providers shall be cached or not.
	*
	* @return Boolean If the file cache is enabled will be returned "true", otherwise "false".
	*/
	getWhiteListCache: function(){
		return this.whiteListCache === false ? false : true;
	},
	
	/**
	* Cleares the content of the white list providers' cache, this method is chainable.
	*/
	invalidateWhiteListCache: function(){
		this.whiteListDatabase = null;
		return this;
	},
	
	/**
	* Loads the content of the list of accepted email providers that has been set.
	*
	* @param Boolean asynchronous If set to "false" the operation will be done in synchronous way, otherwise in asynchronous way with promise support.
	*
	* @throws exception If an error occurs while reading file contents.
	*/
	loadWhiteListCache: function(asynchronous){
		if ( asynchronous !== false ){
			return new Promise(function(resolve, reject){
				resolve(emailAddressValidator.loadWhiteListCache(false));
			});
		}
		if ( this.whiteListCache === false || this.whiteListDatabasePath === '' || typeof(this.whiteListDatabasePath) !== 'string' ){
			return false;
		}
		try{
			let content = filesystem.readFileSync(this.whiteListDatabasePath).toString();
			if ( content === '' ){
				return false;
			}
			this.whiteListDatabase = content;
			return true;
		}catch(ex){
			console.log(ex);
			throw 'Unable to load the dictionary.';
		}
	},
	
	/**
	* Sets the path to the file that contains the list of banned email providers, this method is chainable.
	*
	* @param String path A string containing the path to the file.
	*
	* @throws exception If an invalid file path is provided. 
	*/
	setBlackListDatabasePath: function(path){
		if ( typeof(path) !== 'string' ){
			throw 'Invalid path.';
		}
		if ( path === '' ){
			path = null;
		}
		if ( this.blackListDatabasePath !== path ){
			this.blackListDatabase = this.blackListCache === false ? null : '';
			this.blackListDatabasePath = path;
		}
		return this;
	},
	
	/**
	* Returns the path to the file that contains the list of banned email providers.
	*
	* @return String A string containing the path to the file.
	*/
	getBlackListDatabasePath: function(){
		return this.blackListDatabasePath === '' || typeof(this.blackListDatabasePath) !== 'string' ? null : this.blackListDatabasePath;
	},
	
	/**
	* Sets if the list of banned email providers shall be cached or not, this method is chainable.
	*
	* @param Boolean value If set to "true", the content of the file will be cached for next uses, otherwise not.
	*/
	setBlackListCache: function(value){
		if ( value !== true ){
			this.blackListCache = false;
			this.blackListDatabase = null;
			return this;
		}
		this.blackListCache = true;
		return this;
	},
	
	/**
	* Returns if the list of banned email providers shall be cached or not.
	*
	* @return Boolean If the file cache is enabled will be returned "true", otherwise "false".
	*/
	getBlackListCache: function(){
		return this.blackListCache === false ? false : true;
	},
	
	/**
	* Cleares the content of the black list providers' cache, this method is chainable.
	*/
	invalidateBlackListCache: function(){
		this.blackListDatabase = null;
		return this;
	},
	
	/**
	* Loads the content of the list of banned email providers that has been set.
	*
	* @param Boolean asynchronous If set to "false" the operation will be done in synchronous way, otherwise in asynchronous way with promise support.
	*
	* @throws exception If an error occurs while reading file contents.
	*/
	loadBlackListCache: function(asynchronous){
		if ( asynchronous !== false ){
			return new Promise(function(resolve, reject){
				resolve(emailAddressValidator.loadBlackListCache(false));
			});
		}
		if ( this.blackListCache === false || this.blackListDatabasePath === '' || typeof(this.blackListDatabasePath) !== 'string' ){
			return false;
		}
		try{
			let content = filesystem.readFileSync(this.blackListDatabasePath).toString();
			if ( content === '' ){
				return false;
			}
			this.blackListDatabase = content;
			return true;
		}catch(ex){
			console.log(ex);
			throw 'Unable to load the dictionary.';
		}
	},
	
	/**
	* Sets the path to the file that contains the list of disposable email providers, this method is chainable.
	*
	* @param String path A string containing the path to the file.
	*
	* @throws exception If an invalid file path is provided. 
	*/
	setDisposableProvidersDatabasePath: function(path){
		if ( typeof(path) !== 'string' ){
			throw 'Invalid path.';
		}
		if ( path === '' ){
			path = null;
		}
		if ( this.disposableProvidersDatabasePath !== path ){
			this.disposableProvidersDatabase = this.disposableProvidersCache === false ? null : '';
			this.disposableProvidersDatabasePath = path;
		}
		return this;
	},
	
	/**
	* Returns the path to the file that contains the list of disposable email providers.
	*
	* @return String A string containing the path to the file.
	*/
	getDisposableProvidersDatabasePath: function(){
		return this.disposableProvidersDatabasePath === '' || typeof(this.disposableProvidersDatabasePath) !== 'string' ? null : this.disposableProvidersDatabasePath;
	},
	
	/**
	* Sets if the list of disposable email providers shall be cached or not, this method is chainable.
	*
	* @param Boolean value If set to "true", the content of the file will be cached for next uses, otherwise not.
	*/
	setDisposableProvidersCache: function(value){
		if ( value !== true ){
			this.disposableProvidersCache = false;
			this.disposableProvidersDatabase = null;
			return this;
		}
		this.disposableProvidersCache = true;
		return this;
	},
	
	/**
	* Returns if the list of disposable email providers shall be cached or not.
	*
	* @return Boolean If the file cache is enabled will be returned "true", otherwise "false".
	*/
	getDisposableProvidersCache: function(){
		return this.disposableProvidersCache === false ? false : true;
	},
	
	/**
	* Cleares the content of the disposable list providers' cache, this method is chainable.
	*/
	invalidateDisposableProvidersCache: function(){
		this.disposableProvidersDatabase = null;
		return this;
	},
	
	/**
	* Loads the content of the list of disposable email providers that has been set.
	*
	* @param Boolean asynchronous If set to "false" the operation will be done in synchronous way, otherwise in asynchronous way with promise support.
	*
	* @throws exception If an error occurs while reading file contents.
	*/
	loadDisposableProvidersCache: function(asynchronous){
		if ( asynchronous !== false ){
			return new Promise(function(resolve, reject){
				resolve(emailAddressValidator.loadDisposableProvidersCache(false));
			});
		}
		if ( this.disposableProvidersCache === false || this.disposableProvidersDatabasePath === '' || typeof(this.disposableProvidersDatabasePath) !== 'string' ){
			return false;
		}
		try{
			let content = filesystem.readFileSync(this.disposableProvidersDatabasePath).toString();
			if ( content === '' ){
				return false;
			}
			this.disposableProvidersDatabase = content;
			return true;
		}catch(ex){
			console.log(ex);
			throw 'Unable to load the dictionary.';
		}
	},
	
	/**
	* Checks if a given e-mail address is valid or not.
	*
	* @param String email A string containg the e-mail address.
	*
	* @return Boolean If the given e-mail address is valid will be returned "true", otherwise "false".
	*/
	validateString: function(email){
		if ( typeof(email) !== 'string' || email === '' ){
			return false;
		}
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) === true ? true : false;
	},
	
	/**
	* Checks if a given MX host exists and if the given e-mail address is recognized by the provider.
	*
	* @param String host A string containg the MX host name.
	* @param String address A string containing the e-mail address.
	*/
	probe: function(host, address){
		return new Promise(function(resolve, reject){
			let step = 0;
			let client = net.connect({
				port: 25,
				host: host
			}, function(data){
				client.write('HELO ' + host.replace(/[\n\r<>]/g, '') + '\r\n');
			}).on('error', function(){
				client.destroy();
				resolve(false);
			}).on('close', function(){
				if ( step !== -1 ){
					resolve(false);
				}
				client.destroy();
			}).on('data', function(data){
				if ( step === -1 ){
					client.destroy();
					return;
				}
				data = data.toString('utf8').split(' ');
				data = parseInt(data);
				switch ( step ){
					case 0:{
						if ( data !== 250 && data !== 220 ){
							step = -1;
							client.destroy();
							return resolve(false);
						}
						step++;
						client.write('MAIL FROM: <no-reply@mail.com>\r\n');
						client.write('RCPT TO: <' + address.replace(/[\n\r<>]/g, '') + '>\r\n');
					}break;
					case 1:{
						client.write('QUIT');
						step = -1;
						client.destroy();
						return data !== 250 ? resolve(false) : resolve(true);
					}break;
				}
			});
		});
	},
	
	/**
	* Checks if a given e-mail address is valid and if it exists.
	*
	* @param String email A string containing the e-mail address.
	*/
	validate: function(email){
		return new Promise(function(resolve, reject){
			if ( emailAddressValidator.validateString(email) === false ){
				return resolve(false);
			}
			let components = email.split('@');
			dns.resolveMx(components[1].toLowerCase(), function(error, data){
				if ( error ){
					if ( error.errno === 'ENOTFOUND' ){
						return resolve(false);
					}
					return reject();
				}
				let connections = new Array();
				for ( let i = 0 ; i < data.length ; i++ ){
					connections.push(emailAddressValidator.probe(data[i].exchange, email));
				}
				Promise.all(connections).then(function(values){
					for ( let i = 0 ; i < values.length ; i++ ){
						if ( values[i] === true ){
							return resolve(true);
						}
					}
					resolve(false);
				}).catch(function(error){
					console.log(error);
					return reject();
				});
			});
		});
	},
	
	/**
	* Checks if a given email address or a provider is trusted (if is in a given white list and not in a given black list).
	*
	* @param String string A string containing the e-mail address or the e-mail provider.
	* @param Boolean disposableAllowed If set to "false" will be checked if the provider is a disposable one, otherwise not.
	* @param Boolean strict If set to "true" means that the given provider must be within the withe list set, otherwise it will not be accepted.
	* @param Boolean asynchronous If set to "false" the process will be made in synchronous way, otherwise will be made asynchronously with promise support.
	*
	* @return Boolean If the provider is trusted will be returned "true", otherwise "false".
	*
	* @throws exception If the provided string is not a valid e-mail address nor a valid domain name.
	* @throws exception If an error occurs while reading data from a file.
	* @throws exception If an error occurs while checking if the given address is disposable or the given provider is a disposable e-mail provider.
	*/
	isTrustedProvider: function(string, disposableAllowed, strict, asynchronous){
		if ( asynchronous !== false ){
			return new Promise(function(resolve, reject){
				try{
					resolve(emailAddressValidator.isTrustedProvider(string, disposableAllowed, strict, false));
				}catch(ex){
					reject(ex);
				}
			});
		}
		if ( string.indexOf('@') > 0 ){
			if ( this.validateString(string) === false ){
				throw 'Invalid e-mail address.';
			}
			string = string.split('@')[1];
		}
		string = string.toLowerCase();
		if ( this.whiteListDatabasePath !== '' && typeof(this.whiteListDatabasePath) === 'string' ){
			if ( this.whiteListCache === true && this.whiteListDatabase !== '' && typeof(this.whiteListDatabase) === 'string' ){
				if ( this.whiteListDatabase.indexOf('\n') < 0 && this.whiteListDatabase === string ){
					return true;
				}
				if ( this.whiteListDatabase.indexOf(string + '\n') >= 0 || this.whiteListDatabase.indexOf('\n' + string) >= 0 ){
					return true;
				}
			}else{
				try{
					let database = filesystem.readFileSync(this.whiteListDatabasePath).toString();
					if ( database !== '' ){
						if ( this.whiteListCache === true ){
							this.whiteListDatabase = database;
						}
						if ( database.indexOf('\n') < 0 && database === string ){
							return true;
						}
						if ( database.indexOf(string + '\n') >= 0 || database.indexOf('\n' + string) >= 0 ){
							return true;
						}
					}
				}catch(ex){
					console.log(ex);
					throw 'Unable to read from white list database.';
				}
			}
		}
		if ( strict === true ){
			return false;
		}
		if ( this.blackListDatabasePath !== '' && typeof(this.blackListDatabasePath) === 'string' ){
			if ( this.blackListCache === true && this.blackListDatabase !== '' && typeof(this.blackListDatabase) === 'string' ){
				if ( this.blackListDatabase.indexOf('\n') < 0 && this.blackListDatabase === string ){
					return false;
				}
				if ( this.blackListDatabase.indexOf(string + '\n') >= 0 || this.blackListDatabase.indexOf('\n' + string) >= 0 ){
					return false;
				}
			}else{
				try{
					let database = filesystem.readFileSync(this.blackListDatabasePath).toString();
					if ( database !== '' ){
						if ( this.blackListCache === true ){
							this.blackListDatabase = database;
						}
						if ( database.indexOf('\n') < 0 && database === string ){
							return false;
						}
						if ( database.indexOf(string + '\n') >= 0 || database.indexOf('\n' + string) >= 0 ){
							return false;
						}
					}
				}catch(ex){
					console.log(ex);
					throw 'Unable to read from black list database.';
				}
			}
		}
		if ( disposableAllowed === false && this.disposableProvidersDatabasePath !== '' && typeof(this.disposableProvidersDatabasePath) === 'string' ){
			try{
				if ( this.isDisposableProvider(string, false) === true ){
					return false;
				}
			}catch(ex){
				console.log(ex);
				throw 'Unable to check the given provider.';
			}
		}
		return true;
	},
	
	/**
	* Checks if a given e-mail or provider is a disposable one.
	*
	* @param String string A string containing the e-mail address or the e-mail provider.
	* @param Boolean asynchronous If set to "false" the process will be made in synchronous way, otherwise will be made asynchronously with promise support.
	*
	* @return Boolean If the provider is disposable will be returned "true", otherwise "false".
	*
	* @throws exception If the provided string is not a valid e-mail address nor a valid domain name.
	* @throws exception If no file containing the list of disposable e-mail providers has been defined.
	* @throws exception If an error occurs while reading data from a file.
	*/
	isDisposableProvider: function(string, asynchronous){
		if ( asynchronous !== false ){
			return new Promise(function(resolve, reject){
				try{
					resolve(emailAddressValidator.isDisposableProvider(string, false));
				}catch(ex){
					reject(ex);
				}
			});
		}
		if ( string.indexOf('@') > 0 ){
			if ( this.validateString(string) === false ){
				throw 'Invalid e-mail address.';
			}
			string = string.split('@')[1];
		}
		string = string.toLowerCase();
		if ( this.disposableProvidersDatabasePath === '' || typeof(this.disposableProvidersDatabasePath) !== 'string' ){
			throw 'No database defined.';
		}
		if ( this.disposableProvidersCache === true && this.disposableProvidersDatabase !== '' && typeof(this.disposableProvidersDatabase) === 'string' ){
			if ( this.disposableProvidersDatabase.indexOf('\n') < 0 && this.disposableProvidersDatabase === string ){
				return true;
			}
			if ( this.disposableProvidersDatabase.indexOf(string + '\n') >= 0 || this.disposableProvidersDatabase.indexOf('\n' + string) >= 0 ){
				return true;
			}
			return false;
		}
		try{
			let database = filesystem.readFileSync(this.disposableProvidersDatabasePath).toString();
			if ( database !== '' ){
				if ( this.blackListCache === true ){
					this.blackListDatabase = database;
				}
				if ( database.indexOf('\n') < 0 && database === string ){
					return true;
				}
				if ( database.indexOf(string + '\n') >= 0 || database.indexOf('\n' + string) >= 0 ){
					return true;
				}
			}
			return false;
		}catch(ex){
			console.log(ex);
			throw 'Unable to read from the disposable providers database.';
		}
	}
};

exports.emailAddressValidator = emailAddressValidator;