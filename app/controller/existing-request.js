class ExistingRequest {
	constructor(onComplete, onFailure){
		var onComplete = onComplete ? onComplete : function(){}
		var onFailure = onFailure ? onFailure : function(){}

		var request = new Request('https://kronoku.herokuapp.com/existing_reminders', 
								{
									method: 'POST', 
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({ guid: UserSession.getGUID() })
								});

		fetch(request).then((response) => {

			response.json().then((result) => {
				
				onComplete(result);

			});

		}).catch((data) => {

			onFailure();

		});
		
	}

}

export default ExistingRequest;