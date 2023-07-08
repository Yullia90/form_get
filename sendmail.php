<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require "phpmailer/src/Exception.php";
  require "phpmailer/src/PHPMailer.php";

  $mail = new PHPMailer(true);
  $mail->CharSet = "UTF-8";
  $mail->setLanguage("ru", "phpmailer/language/");
  $mail->IsHTML(true);

  // від кого лист
  $mail->setFrom("yulliatcarenko@gmail.com", >Yuliia);
  //Кому відправити
  $mail->addAddress("y.tsarenko@harwind.com.ua");
  //Тема листа
  $mail->Subject = "Привіт!";

  //Рука
  $hand = "Права";
  if($_POST["hand"]=="left"){
    $hand = "Ліва";
  }

  //Тіло листа
$body = "<h1>Зустрічайте супер лист</h1>";

if(trim(!empty($_POST["name"]))){
    $body.="<p><strong>Ім'я:</strong> ".$_POST["name"]."</p>";
}

if(trim(!empty($_POST["email"]))){
    $body.="<p><strong>E-mail:</strong> ".$_POST["email"]."</p>";
} 

if(trim(!empty($_POST["hand"]))){
    $body.="<p><strong>Рука:</strong> ".$_hand."</p>";
} 

if(trim(!empty($_POST["age"]))){
    $body.="<p><strong>Вік:</strong> ".$_POST["age"]."</p>";
} 

if(trim(!empty($_POST["message"]))){
    $body.="<p><strong>Сообщение:</strong> ".$_POST["message"]."</p>";
} 

// прикріпити файл
if(!empty($_FILES["image"]["tmp_name"])){
  //шлях завантаження файлу
  $filePath = _DIR_ . "/files/" . $_FILES["image"]["name"];
  //завантажуємо файл
  if (copy($_FILES[ïmage]["tmp_name"], $filePath)){
    $fileAttach = $filePath;
    $body.="<p><strong>Фото в приложении</strong>";
    $mail->addAttachment($fileAttach);
  }
}

$mail->Body =$body;

//Відправляємо
if(!$mail->send()){
    $message = "Помилка";  
}else{
    $message = "Дані відправлені";  
}

$response = ["message" => $message];

header("Content-type: application/json");
echo json_encode($response);

?>
