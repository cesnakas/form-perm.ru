<?php

if (array_key_exists("messageFF", $_POST)) {
  mail("s.cesnakas@gmail.com",
    "заполнена контактная форма с " . $_SERVER["HTTP_REFERER"],
    "Имя: " . $_POST["formName"] . "\nТелефон: " . $_POST["formPhone"] ."\nСообщение: " . $_POST["messageFF"]);
  echo $_POST["formName"];
}
