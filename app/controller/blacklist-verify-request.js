class BlacklistVerifyRequest {
	constructor(number, pin, onComplete, onFailure){
		var onComplete = onComplete ? onComplete : function(){}
		var onFailure = onFailure ? onFailure : function(){}

		var reqBody = {
			number: number,
			pin: pin
		}
		
		var request = new Request('https://kronoku.herokuapp.com/verify_blacklist', 
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

export default BlacklistVerifyRequest ;