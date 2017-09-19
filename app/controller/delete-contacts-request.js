class DeleteContactsRequest {
	constructor(contactId, onComplete, onFailure){
		var onComplete = onComplete ? onComplete : function(){}
		var onFailure = onFailure ? onFailure : function(){}

		var reqBody = {
			guid: UserSession.getGUID(),
			contactId: contactId
		}

		var request = new Request(UserSession.getRequestPath() + '/delete_contact', 
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

export default DeleteContactsRequest;