class SessionManager {
	constructor(){
		//localStorage.removeItem("kronoku"); //DEV ONLY
		
		if (!localStorage.kronoku){
			localStorage.setItem("kronoku", JSON.stringify({ guid: this.generateGUID() }));
			this.registerAnonUser();
		}
		
		this.store = JSON.parse(localStorage.getItem('kronoku'));
		this.storeRaw = localStorage.getItem('kronoku');
		this.requestPath = 'https://desolate-reaches-37166.herokuapp.com';

		this.logVisit();
	}

	getGUID(){
		return this.store.guid;
	}

	getRequestPath(){
		return this.requestPath;
	}

	registerAnonUser(){

		var request = new Request('https://desolate-reaches-37166.herokuapp.com/register_anon', 
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
		fetch(new Request('http://127.0.0.1:8080/log_anon', { 

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