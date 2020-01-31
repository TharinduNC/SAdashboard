app.controller('mapAll', function($scope, $firebaseArray) {
	var firebaseRefMap = firebase.database().ref("map");
	
	var list = $firebaseArray(firebaseRefMap);
	
	// Image upload
	var auth = firebase.auth();
	var storageRef = firebase.storage().ref();
	
	function handleFileSelect(evt) {
	  evt.stopPropagation();
	  evt.preventDefault();
	  var file = evt.target.files[0];
	  var metadata = {
		 'contentType': file.type
	  };
	  // Push to child path.
	  // [START oncomplete]
	  storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
		 console.log('Uploaded', snapshot.totalBytes, 'bytes.');
		 console.log('File metadata:', snapshot.metadata);
		 // Let's get a download URL for the file.
		 snapshot.ref.getDownloadURL().then(function(url) {
			$scope.mapImageResult = url;
			console.log('File available at', url);
		 });
	  }).catch(function(error) {
		 // [START onfailure]
		 console.error('Upload failed:', error);
		 // [END onfailure]
	  });
	  // [END oncomplete]
	}
	window.onload = function() {
	  document.getElementById('file').addEventListener('change', handleFileSelect, false);
	  document.getElementById('file').disabled = true;
	  auth.onAuthStateChanged(function(user) {
		 if (user) {
			var user = firebase.auth().currentUser;
			//console.log('Anonymous user signed-in.', user);
			document.getElementById('file').disabled = false;
		 } else {
			console.log('There was no session.');
		 }
	  });
	}	
	
	//create map
	$scope.createMap = function(form)
	{
		if(form.$valid)
		{	
			list.$add({
				code: $scope.mapCode,
				name: $scope.mapName,
				description: $scope.mapDescription,
				descriptionheader: $scope.mapDescriptionheader,
				image: $scope.mapImageResult
			}).then(function(ref) {
				var id = ref.key;
				//console.log("added record with id " + id);
				window.alert("added record with id " + id);
				list.$indexFor(id); // returns location in the array
				
				//try to clear the field after addition
			});
			
		}
		else
		{
			window.alert("empty");
		}
		
	};
	
	
	//read map
	$scope.maps = list;
	
	$scope.mapChecked = {
		maps: []
	};
	
	//update map
	
	$scope.onMapEditClick = function() {
		if($scope.mapChecked.maps.length == 1)
		{
			var mapRef = firebase.database().ref("map/" + $scope.mapChecked.maps[0]);
		
			mapRef.on('value', function(snapshot) {
				var currentMap = snapshot.val();
				$scope.currentMapCode = currentMap.code;
				$scope.currentMapName = currentMap.name;
				$scope.currentMapDescription = currentMap.description;
				$scope.currentMapDescriptionheader = currentMap.descriptionheader;
				$scope.currentMapmapImageResult = currentMap.mapImageResult;
			});
		}
		else
		{
			$scope.currentMapCode = "<>";
			$scope.currentMapName = "<no selection or too many selected>";
			$scope.currentMapDescription = "<>";
			$scope.currentMapDescriptionheader = "<>";
		}
	};
	
	$scope.newMapCode = "";
	$scope.newMapName = "";
	$scope.newMapDescription = "";
	$scope.newMapDescriptionheader = "";
	$scope.newMapmapImageResult = "";
	
	//only one selection is allowed when updating the map
	$scope.updateMap = function() {
		
		if($scope.mapChecked.maps.length == 1)
		{
			if($scope.newMapName.length > 0 && $scope.newMapCode.length > 0)
			{
				window.alert($scope.newMapCode + " " + $scope.newMapName);
			
				var updatedMap = {
					code: $scope.newMapCode,
					name: $scope.newMapName,
					description: $scope.newMapDescription,
					descriptionheader: $scope.newMapDescriptionheader,
					mapImageResult: $scope.newMapmapImageResult
				};
				
				var updates = {};
				updates['map/' + $scope.mapChecked.maps[0]] = updatedMap;
				
				firebase.database().ref().update(updates);
			}
			else
			{
				window.alert("empty");
			}
		}
		else
		{
			window.alert("no selection");
		}
	};
	
	//delete map
	$scope.deleteMap = function() {
		
		if($scope.mapChecked.maps.length > 0)
		{
			var i;
		
			for(i = 0; i < $scope.mapChecked.maps.length; i++)
			{
				firebase.database().ref().child("map/" + $scope.mapChecked.maps[i]).remove();
			}
			
			$scope.mapChecked = {
				maps: []
			};
		}
		else
		{
			window.alert("no selection");
		}
	};
	
});