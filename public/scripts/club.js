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

/*
code for table looping duplicates

https://www.w3schools.com/code/tryit.asp?filename=FSOMG40PE1MZ
*/

function clubView()
{
	var firebaseRef = firebase.database().ref();
	
	
}


