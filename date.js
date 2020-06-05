exports.getDate=function(){
var today=new Date(); // day is in no. format
	var day;
	var work;
	var options={
		weekday:'long',
		day:'numeric',
		month:'long'
	};
	return today.toLocaleDateString("en-US",options);	// To set today's day and date.
	// See stackoverflow for more information on how to change the date info to string.

}
