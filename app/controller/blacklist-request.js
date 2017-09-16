class BlacklistRequest {
	constructor(number, onComplete, onFailure){
		var onComplete = onComplete ? onComplete : function(){}
		var onFailure = onFailure ? onFailure : function(){}

		var reqBody = {
			number: number
		}
		
		var request = new Request('https://kronoku.herokuapp.com/stage_blacklist', 
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

export default BlacklistRequest;