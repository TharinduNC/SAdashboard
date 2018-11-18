app.controller('guideAll', function($scope, $firebaseArray) {
  
	var firebaseRefGuide = firebase.database().ref("guides");
	
	var list = $firebaseArray(firebaseRefGuide);
	
	//read guide
	$scope.guides = list;
	
	$scope.guideChecked = {
		guides: []
	};
  
   $scope.gEditSchema = {
  "type": "object",
  "title": "Guides",
  "properties": {
    "name": {
      "title": "Guide Name",
      "type": "string"
    },    
    "date": {
      "title": "Guide Date",
      "type": "string",
      "format": "date"
    },
    "general": {
      "type": "array",
      "items": {
        "type":"object",
        "properties": {
          "title": {
            "title": "Guide Title",
            "type": "string"
          },
          "location": {
            "title": "Guide Location",
            "type": "string"
          },
          "description": {
            "type": "string",
            "format": "html",
            "title": "Guide Description",
            "description": "Enter guide details"
          },
          "header": {
            "title": "Guide Header",
            "type": "string"
          }        
        }
      }
    },
    "checklist": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "task": {
            "title": "Task name",
            "type": "string"
          },
          "description": {
            "title": "Task description",
            "type": "string"
          },
          "body": {
            "type": "string",
            "format": "html",
            "title": "Task body",
            "description": "Enter task details"
          }         
        }
      }
    },
    "faq": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "question": {
            "title": "Question",
            "type": "string"
          },
          "answer": {
            "type": "string",
            "format": "html",
            "title": "Answer",
            "description": "Enter details"
          }
        }
      }
    }    
  },
  "required": [
    "guideName",
    "guideTitle",
    "guideDescription"
    ]
}

  $scope.gEditForm = [
    {
      type: "tabs",
      tabs: [
        {
          "title": "general",
          "items": [
            "name",
            {
              "key": "date",
              "minDate": "1995-09-01",
              "format": "yyyy-mm-dd"
            },
            {
              "key": "general",
              "title": "General",
              "add": null,
              "items": [
                "general[].title",
                "general[].location",
                {
                  "key": "general[].description",
                  "tinymceOptions": {
                    "plugins": "link",
                    "toolbar": [
                      "insert | undo redo| styleselect | bold italic | link",
                      "alignleft aligncenter alignright"
                    ]
                  }
                },
                "general[].header"
              ]
            }            
          ]
        },
        {
          "title": "checklist",
          "items": [
          {
            "key": "checklist",
            "type": "tabarray",
            "add": "New",
            "remove": "Delete",
            "style": {
              "remove": "btn-danger"
            },
            "title": "{{ value.name || 'Task '+$index }}",
            "items": [
              "checklist[].task",
              "checklist[].description",      
              {
                "key": "checklist[].body",
                "tinymceOptions": {
                  "plugins": "link",
                  "toolbar": [
                    "insert | undo redo| styleselect | bold italic | link",
                    "alignleft aligncenter alignright"
                  ]
                }
              }
            ]
          }            
          ]
        },
        {
          "title": "faq",
          "items": [
          {
            "key": "faq",
            "type": "tabarray",
            "add": "New",
            "remove": "Delete",
            "style": {
              "remove": "btn-danger"
            },
            "title": "{{ value.name || 'Question '+$index }}",
            "items": [
              "faq[].question",    
              {
                "key": "faq[].answer",
                "tinymceOptions": {
                  "plugins": "link",
                  "toolbar": [
                    "insert | undo redo| styleselect | bold italic | link",
                    "alignleft aligncenter alignright"
                  ]
                }
              }
            ]
          }            
          ]
        }
      ]
    },
  {
    "type": "submit",
    "style": "btn-success",
    "title": "Submit"
  }
]
  
  $scope.gEditModel = {};
	
	//update guide
	// this refreshes the selection on when the pill is clicked
	$scope.onGuideEditClick = function() {
		if($scope.guideChecked.guides.length == 1)
		{
			var guideNameRef = firebase.database().ref("guides/" + $scope.guideChecked.guides[0]);
		
			guideNameRef.on('value', function(snapshot) {
				var currentGuide = snapshot.val();
        $scope.gEditModel = currentGuide;
			});
		}
		else
		{
			$scope.currentGuideName = "<no selection or too many selected>";
		}
	};
  
	//edit guide
	$scope.onSubmit = function(gEditForm)
	{
    // First we broadcast an event so all fields validate themselves
    $scope.$broadcast('schemaFormValidate');
    
    // Then we check if the form is valid
		if(gEditForm.$valid)
		{
      if($scope.guideChecked.guides.length == 1)
      {      
        var updates = {};
        updates['guides/' + $scope.guideChecked.guides[0]] = $scope.gEditModel;
        
        firebase.database().ref().update(updates);
        window.alert("Guide has been updated.");
      }
      else
      {
        window.alert("Please select the guide you wish to update in the view tab.");
      }
		}
		else
		{
      console.log($scope.gEditModel);
			window.alert("Please complete the form.");
		}
	};  
	
	//$scope.newGuideName = "";
	//
	////only one selection is allowed when updating the guide
	//$scope.updateGuide = function() {
	//	
	//	if($scope.guideChecked.guides.length == 1)
	//	{
	//		if($scope.newGuideName.length > 0)
	//		{
	//			window.alert($scope.newGuideName);
	//		
	//			var updatedName = {
	//				name: $scope.newGuideName
	//			};
	//			
	//			var updates = {};
	//			updates['guides/' + $scope.guideChecked.guides[0]] = updatedName;
	//			
	//			firebase.database().ref().update(updates);
	//		}
	//		else
	//		{
	//			window.alert("empty");
	//		}
	//	}
	//	else
	//	{
	//		window.alert("no selection");
	//	}
	//};
	
	//delete guide
	$scope.deleteGuide = function() {
		
		if($scope.guideChecked.guides.length > 0)
		{
			var i;
		
			for(i = 0; i < $scope.guideChecked.guides.length; i++)
			{
				firebase.database().ref().child("guides/" + $scope.guideChecked.guides[i]).remove();
			}
			
			$scope.guideChecked = {
				guides: []
			};
		}
		else
		{
			window.alert("no selection");
		}
	};
	
});