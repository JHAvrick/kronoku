class CreateContactRequest {
	constructor(contact, onComplete, onFailure){
		var onComplete = onComplete ? onComplete : function(){}
		var onFailure = onFailure ? onFailure : function(){}

		var reqBody = {
			guid: UserSession.getGUID(),
			alias: contact.alias,
			phone: contact.phone
		}
		
		var request = new Request(UserSession.getRequestPath() + '/create_contact', 
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

export default CreateContactRequest;