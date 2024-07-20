<?php

require_once("templates/header.php");

if($userDAO) {
    $userDAO->destroyToken();
}