class SessionManager {
	constructor(){
		//localStorage.removeItem("kronoku"); //DEV ONLY
			
		if (!localStorage.kronoku){
			localStorage.setItem("kronoku", JSON.stringify({ guid: this.generateGUID(), contacts: [] }));
			this.registerAnonUser();
		}
		
		this.store = JSON.parse(localStorage.getItem('kronoku'));
		this.storeRaw = localStorage.getItem('kronoku');
		this.requestPath = 'https://kronoku.herokuapp.com';
		//this.requestPath = 'http://localhost:8080';

		this.logVisit();
	}

	addUserContact(name, number){
		this.store.contacts.push({ name: name, number: number });
		localStorage.setItem("kronoku", JSON.stringify(this.store));
	}

	getUserContacts(){
		return JSON.parse(localStorage.getItem('kronoku')).contacts;
	}

	//Will always return a GUID, even if localStorage is cleared to prevent it
	getGUID(){
		return JSON.parse(localStorage.getItem('kronoku')).guid || this.generateGUID();
	}

	getRequestPath(){
		return this.requestPath;
	}

	registerAnonUser(){

		var request = new Request(this.getRequestPath() + '/register_anon', 
								{
									method: 'POST', 
									headers: {
										'Content-Type': 'application/json'
									},
									body: localStorage.getItem('kronoku')
								});

		fetch(request).then((response) => {

			response.json().then((result) => {
				
			});

		}).catch((data) => {

			console.log("Error registering new user.");

		});

	}


	logVisit(){
		fetch(new Request(this.getRequestPath() + '/log_anon', { 

									method: 'POST', 
									headers: { 'Content-Type': 'application/json' },
									body: this.storeRaw })

		).catch(() => {

			console.log("Log Failed: Could not contact server.");

		});
	}

	//This code from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	generateGUID(){
		function s4() {
		  return Math.floor((1 + Math.random()) * 0x10000)
		    .toString(16)
		    .substring(1);
		}

	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
	}


}

export default SessionManager;