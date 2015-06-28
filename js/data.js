//GLOBAL VARIABLES
FIREBASE_ROOT = "https://studybuddyapp.firebaseio.com";

//=====================================================================
//                              USERS
//=====================================================================


// ADD NEW USER TO THE DB
function pushNewUser(first_name, last_name, email, study_session_minutes, short_break_minutes, long_break_minutes) {
    // CREATE A REFERENCE TO FIREBASE
    var usersRef = new Firebase(FIREBASE_ROOT + '/Users/active');

    //SAVE DATA TO FIREBASE
    // I generated a reference to a new location (e.i. assigned the push into a
    // variable (newUserRef)), although it is not necessary, so that we could in the future
    // get the unique ID generated by push() by doing newUserRef.key();
    var newUserRef =  usersRef.push({
        first_name: first_name,
        last_name: last_name,
        email: email,
        study_session_minutes: study_session_minutes,
        short_break_minutes: short_break_minutes,
        long_break_minutes: long_break_minutes
    });
};

// RETRIEVE AND DISPLAY ALL USERS INFORMATION UPON REQUEST
function fetchActiveUsers() {
    var usersRef = new Firebase(FIREBASE_ROOT + '/Users/active');
    var users = [];
    // WE CAN ALWAYS ADD .limitToLast(10) TO usersRef IF WE'D WANT TO DISPLAY JUST THE FIRST 10 USERS.
    usersRef.once("value", function(snapshot) {
        $.each(snapshot.val(), function(key, value){
            users.push(value)
        });
        displayAllUsers(users);
    });
}

// MOVE USER TO DELETED
function deleteUser(userId) {
    var oldRef = new Firebase(FIREBASE_ROOT + '/Users/active/' + userId);
    var newRef = new Firebase(FIREBASE_ROOT + '/Users/deleted/' + userId);
    oldRef.once('value', function(snapshot)  {
        newRef.set(snapshot.val());
        oldRef.remove();
    });
}


//=====================================================================
//                              SUBJECTS
//=====================================================================


// Right now we are allways working with the same user, so I'm hard coding Alice's user id.
// After we'll sort user authentication, we will create the needed functionality to
// GET THE CURRENT USER
function getActiveUser() {
    // TODO: implement authentication
    return "-JsqE8CQ9Dg7LE0OKQ2P"
}

// ADD NEW SUBJECT TO THE DB
function pushNewSubject(userId, name, colour, study_session_minutes, short_break_minutes, long_break_minutes) {
    // CREATE A REFERENCE TO FIREBASE
    // In case this is the first subject to be pushed, this will create a new Subjects/active node.
    var subjectsRef = new Firebase(FIREBASE_ROOT + '/Subjects/active/' + userId);

    //SAVE DATA TO FIREBASE
    // I generated a reference to a new location (e.i. assigned the push into a
    // variable (newSubjectRef)), although it is not necessary, so that we could in the future
    // get the unique ID generated by push() by doing newSubjectRef.key();
    var newSubjectRef =  subjectsRef.push({
        name: name,
        colour: colour,
        study_session_minutes: study_session_minutes,
        short_break_minutes: short_break_minutes,
        long_break_minutes: long_break_minutes
    });
};

// RETRIEVE AND DISPLAY ALL SUBJECTS INFORMATION UPON REQUEST
function fetchActiveSubjects(userId) {
    var subjectsRef = new Firebase(FIREBASE_ROOT + '/Subjects/active/' + userId);
    subjectsRef.once("value", function(snapshot) {
        displayActiveSubjects(snapshot.val());
    });
}


// UPDATE SUBJECT'S NAME
function changeSubjectName(userId, subjectId, newName){
    var subjectsRef = new Firebase(FIREBASE_ROOT + '/Subjects/active/' + userId + "/" + subjectId);
    subjectsRef.update({
        "name": newName
    });
};


// UPDATE SUBJECT'S COLOUR
function changeSubjectColour(userId, subjectId, newColour){
    var subjectsRef = new Firebase(FIREBASE_ROOT + '/Subjects/active/' + userId + "/" + subjectId);
    subjectsRef.update({
        "colour": newColour
    });
};


// MOVE SUBJECT TO DELETED
function deleteSubject(userId, subjectId) {
    var oldRef = new Firebase(FIREBASE_ROOT + '/Subjects/active/' + userId + "/" + subjectId);
    var newRef = new Firebase(FIREBASE_ROOT + '/Subjects/deleted/' + userId + "/" + subjectId);
    oldRef.once('value', function(snapshot)  {
        newRef.set(snapshot.val());
        oldRef.remove();
    });
}


//=====================================================================
//                              TASKS
//=====================================================================


// ADD NEW TASK TO THE DB
function pushNewTask(subjectId, title, description, assigned_date, time_estimation, creation_date, status_change_date) {
    // CREATE A REFERENCE TO FIREBASE
    // In case this is the first task to be pushed, this will create a new Tasks/active node.
    var tasksRef = new Firebase(FIREBASE_ROOT + '/Tasks/active/' + subjectId);

    //SAVE DATA TO FIREBASE
    // I generated a reference to a new location (e.i. assigned the push into a
    // variable (newTaskRef)), although it is not necessary, so that we could in the future
    // get the unique ID generated by push() by doing newTaskRef.key();
    var newTaskRef =  tasksRef.push({
        title: title,
        description: description,
        assigned_date: assigned_date,
        time_estimation: time_estimation,
        creation_date: creation_date,
        status_change_date: status_change_date
    });
};


//=====================================================================
//                              CHECKLIST ITEMS
//=====================================================================


// ADD NEW CHECKLIST ITEM TO THE DB
function pushNewChecklistItem(userId, subjectId, taskId, description, is_complete) {
    // CREATE A REFERENCE TO FIREBASE
    // In case this is the first task to be pushed, this will create a new Tasks node.
    var checklistItemRef = new Firebase(FIREBASE_ROOT + '/Users/' + userId + '/Subjects/' + subjectId + '/Tasks/' + taskId + '/Checklist_Items');

    //SAVE DATA TO FIREBASE
    // I generated a reference to a new location (e.i. assigned the push into a
    // variable (newChecklistItemRef)), although it is not necessary, so that we could in the future
    // get the unique ID generated by push() by doing newChecklistItemRef.key();
    var newChecklistItemRef =  checklistItemRef.push({
        description: description,
        is_complete: is_complete
    });
};