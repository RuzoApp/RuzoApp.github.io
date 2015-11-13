function prepareSignUp() {
    // GET FIELD VALUES
    var firstName = $('#firstNameInput').val();
    var lastName = $('#lastNameInput').val();
    var email = $('#signUpEmailInput').val();
    var password = $('#signUpPasswordInput').val();
    var confirmedPassword = $('#confirmPasswordInput').val();
    $('#signUpEmailErrorMessage').text('');
    $('#signUpPasswordErrorMessage').text('');

    if (password !== confirmedPassword) {
        $('#signUpPasswordErrorMessage').text('The passwords must be identical.');
    } else {
        // password has to have a minimum of 6 characters
        if ($('#confirmPasswordInput').val().length >= 6) {
            signUpUser(firstName, lastName, email, password, clearPasswordFields);
        } else {
            $('#signUpPasswordErrorMessage').text('The password must have at least 6 characters.');
        }
    }
}

function prepareLogIn() {
    // GET FIELD VALUES
    var email = $('#logInEmailInput').val();
    var password = $('#logInPasswordInput').val();

    // CLEAR INPUT FIELDS
    $('#logInPasswordInput').val('');
    $('#logInEmailErrorMessage').text('');
    $('#logInPasswordErrorMessage').text('');

    logInUser(email, password);
}

function clearPasswordFields() {
    $('#signUpPasswordInput').val('');
    $('#confirmPasswordInput').val('');
}

// CREATE NEW USER
function createUser(firstName, lastName, email, password, uid) {
    var newUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        // SET DEFAULT TIME INTERVALS
        study_session_minutes: 25,
        short_break_minutes: 5,
        long_break_minutes: 15
    };

    // LOG-IN THE USER, AND AFTERWARDS PUSH THEM TO DB
    logInUser(email, password, function() {
        saveNewUser(newUser, uid);
    });
};
