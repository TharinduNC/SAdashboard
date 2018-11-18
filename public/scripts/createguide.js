app.controller('createGuide', function($scope, $firebaseArray) {
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
        
        firebase.database().ref('guides/' + id).set($scope.model);
			});
		}
		else
		{
      console.log($scope.model);
			window.alert("empty");
		}
		
	};
});