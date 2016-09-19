<?php

if (isset($_POST) and $_POST['file_name']) {

    $file_name = $_POST['file_name'];

    $data = "";

    if (isset($_POST) and $_POST['data']) {
        $data = $_POST['data'];
    }


    // write to file


    $myfile = fopen("../assets/data/".$file_name, "w");
    fwrite($myfile, $data);
    fclose($myfile);
    
    print_r(json_encode(["message" => "success"]));
    
}

