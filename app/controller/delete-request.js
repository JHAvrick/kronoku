class DeleteRequest {
	constructor(groupId, onComplete, onFailure){
		var onComplete = onComplete ? onComplete : function(){}
		var onFailure = onFailure ? onFailure : function(){}

		var reqBody = {
			groupId: groupId
		}
		
		var request = new Request(UserSession.getRequestPath() + '/delete_reminder', 
								{
									method: 'POST', 
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify(reqBody)
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

export default DeleteRequest;