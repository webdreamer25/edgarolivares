<?php
	$emailSubject = 'Contacting you';
	$webMaster = 'edgarolivares29@yahoo.com';

	$nameField = $_POST ['name'];
	$emailField = $_POST ['email'];
	$subjectField = $_POST ['subject'];
	$messageField = $_POST ['message'];

	$body = <<<EOD 
	<br><hr><br>
	Name: $nameField <br>
	Email: $emailField <br>
	Subject: $subjectField <br>
	Message: $messageField <br>
	EOD;

	$headers = "From: $emailField\r\n";
	$headers .= "Content-type: text/html\r\n";

	$success = mail($webMaster, $emailSubject, $body, $headers);

	echo "$theResults";
?>