

var tblFloors = document.getElementById('tbl_floors_list');
var databaseRef = firebase.databaseRef().ref('floors');

var floor_image = document.getElementById().ref('floor_image').value;
var floor_name = document.getElementById().ref('floor_name').value;

function save_floor(){

    alert('shit');

    var uid = firebase.databaseRef().ref().child('floors').push().key;

    var data = {
        floor_name: uid,
        floor_image: floor_image
        
    }

    var updates = {};
    updates['/floors/' + uid] = data;
    firebase.databaseRef().ref().update(updates);

    alert('The floor is created successfully !');
    reload_floor();

}

function update_floor(){

    var data = {
        floor_name: floor_name,
        floor_image: floor_image
    }

    var updates = {};
    updates['/floors/' + floor_name] = data;
    firebase.databaseRef().ref().update(updates);

    alert('The floor is updated successfully!');
    reload_floor();
    
}

function delete_floor(){

    firebase.databaseRef().ref().child('/users' + floor_name).remove();
    alert('The floor is deleted successfully!');
    
}

function reload_floor(){

    window.location.reload();
}

	
