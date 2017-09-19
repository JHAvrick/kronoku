class ReminderRequest {
	constructor(reminder, onComplete, onFailure){
		var onComplete = onComplete ? onComplete : function(){}
		var onFailure = onFailure ? onFailure : function(){}

		var diff = this._getTimeFromNow(reminder);
		var reqBody = {
			guid: UserSession.getGUID(),
			msFromNow: diff,
			recipients: reminder.recipients, //an array of contactIDs
			message: reminder.message
		}
		
		var request = new Request(UserSession.getRequestPath() + '/register_reminder', 
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

	//Returns difference between now an another date in milliseconds
	_getTimeFromNow(date){

		var hour = date.hour;
    if (!date.pm && date.hour === 12)
      hour = 0;
    else if (date.pm && date.hour === 12)
      hour = 12;
    else if (date.pm)
      hour = date.hour + 12;

    var date = new Date(date.year, date.month - 1, date.day, hour, date.minute);  

    return date - new Date();

	}

}

export default ReminderRequest;