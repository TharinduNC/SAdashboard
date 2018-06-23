function clubCreate()
{
	var clubName = document.getElementById("club_name").value;
	
	var firebaseRef = firebase.database().ref();
	
	if(clubName.length < 1)
	{
		window.alert("empty");
	}
	else
	{
		firebaseRef.child("club").push().child("name").set(clubName);
	}
	
	/*
	if(clubName.length < 1)
	{
		window.alert("empty");
	}
	else
	{
		window.alert(clubName);
	}*/
	
}