app.controller('guideAll', function($scope, $firebaseArray) {
  $scope.schema = {
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
          },
          "link": {
            "title": "Task body link",
            "type": "string"
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

  $scope.form = [
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
                    "toolbar": [
                      "undo redo| styleselect | bold italic | link image",
                      "alignleft aligncenter alignright"
                    ]
                  }
                }
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
                  "toolbar": [
                    "undo redo| styleselect | bold italic | link image",
                    "alignleft aligncenter alignright"
                  ]
                }
              },
              "checklist[].link",
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
                  "toolbar": [
                    "undo redo| styleselect | bold italic | link image",
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
  
  $scope.model = {};
	
	var firebaseRefGuide = firebase.database().ref("guides");
	
	var list = $firebaseArray(firebaseRefGuide);
	
	//create guide
	$scope.onSubmit = function(form)
	{
    // First we broadcast an event so all fields validate themselves
    $scope.$broadcast('schemaFormValidate');
    
    // Then we check if the form is valid
		if(form.$valid)
		{
			list.$add({
				
			}).then(function(ref) {
				var id = ref.key;
				window.alert("added record with id " + id);
				list.$indexFor(id); // returns location in the array
        
				firebase.database().ref('guides/' + id).set({
          [id]: $scope.model
				//firebase.database().ref('guides/' + id + "/general").set({
				  //title: $scope.guideTitle,
				  //location: $scope.guideLocation,
				  //description: $scope.guideDescription
				});
				//firebase.database().ref('guides/' + id + "/checklist").set({
				//  task: $scope.checklistTask,
				//  description: $scope.checklistDescription,
				//  location: $scope.checklistBody,
				//  description: $scope.checklistLink
				//});
				//firebase.database().ref('guides/' + id + "/faq").set({
				//  question: $scope.faqQuestion,
				//  answer: $scope.faqAnswer
				//});
			});
		}
		else
		{
      console.log($scope.model);
			window.alert("empty");
		}
		
	};
	
	//read guide
	$scope.guides = list;
	
	$scope.guideChecked = {
		guides: []
	};
	
	//update guide
	// this refreshes the selection on when the pill is clicked
	$scope.onGuideEditClick = function() {
		if($scope.guideChecked.guides.length == 1)
		{
			var guideNameRef = firebase.database().ref("guides/" + $scope.guideChecked.guides[0] + "/name");
		
			guideNameRef.on('value', function(snapshot) {
				$scope.currentGuideName = snapshot.val();
			});
		}
		else
		{
			$scope.currentGuideName = "<no selection or too many selected>";
		}
	};
	
	$scope.newGuideName = "";
	
	//only one selection is allowed when updating the guide
	$scope.updateGuide = function() {
		
		if($scope.guideChecked.guides.length == 1)
		{
			if($scope.newGuideName.length > 0)
			{
				window.alert($scope.newGuideName);
			
				var updatedName = {
					name: $scope.newGuideName
				};
				
				var updates = {};
				updates['guides/' + $scope.guideChecked.guides[0]] = updatedName;
				
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