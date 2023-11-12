if ($_SERVER["REQUEST_METHOD"] == "POST") { 
    $data = json.decode(fill_get_contents("php://input"));

    $fname = $data->fname;
    $lname = $data->lname;
    $email = $data->email;
    $subject = $data->subject;
    $message = $data->message;

    $to = "enisabazi415@gmail.com";
    $subject = "New Message From $fname $lname: $subject";
    $messageBody = "Name: $fname $lname\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";

    if(mail($to , $subject , $messageBody)) { 
        http_response_code(200)
    } else { 
        http_response_code(500)
    }
}