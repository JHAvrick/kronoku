class FetchContactsRequest {
	constructor(onComplete, onFailure){
		var onComplete = onComplete ? onComplete : function(){}
		var onFailure = onFailure ? onFailure : function(){}

		var reqBody = {
			guid: UserSession.getGUID()
		}

		var request = new Request(UserSession.getRequestPath() + '/fetch_contacts', 
								{
									method: 'POST', 
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify(reqBody)
								});

		fetch(request).then((response) => {

			response.json().then((result) => {
				
				onComplete(result);

			});

		}).catch(() => {

			onFailure();

		});
		
	}

}

export default FetchContactsRequest;