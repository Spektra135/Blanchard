<?php
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);
//От кого письмо
$mail->setFrom('noreply@spektra.wordcord.org', 'Blanchard');
//Кому отправить
$mail->addAddress('spektra135@gmail.com');


//Тема письма
$mail->Subject = 'Письмо из Арт Галлереи';
//Тело письма
$body = '<h1> От клиента Blanchard</h1>';
$body .= '<p><b>Имя:</b> ' . $_POST['name'] . '</p>';
$body .= '<p><b>Телефон:</b> ' . $_POST['tel'] . '</p>';

$mail->Body = $body;

//Отправка
$sent = $mail->send();
if (!$sent) {
  $message = 'Ошибка';
} else {
  $message = 'Данные отправлены!';
}
$response = ['message' => $message, 'sent' => $sent];

header('Content-type: application/json');
echo json_encode($response);


