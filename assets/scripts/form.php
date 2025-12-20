<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
//header("Content-Type:application/json");
header("Access-Control-Allow-Methods:GET, POST");
if (!empty($_POST)) {
try{
    

    # Proteção contra XSS
    $nomeS=htmlspecialchars($_POST["nome"]);
    $emailS=htmlspecialchars($_POST["email"]);
    $assuntoS=htmlspecialchars($_POST["assunto"]);
    $conteudoS=htmlspecialchars($_POST["mensagem"]);
   
    # Proteção contra tags html
   /* $nomeFILTTERCHARS=filter_input(INPUT_POST, $_POST["nome"], FILTER_SANITIZE_SPECIAL_CHARS);
    $emailFILTTERCHARS=filter_input(INPUT_POST, $emailS, FILTER_SANITIZE_EMAIL);
    $assuntoFILTTERCHARS=filter_input(INPUT_POST, $assuntoS, FILTER_SANITIZE_SPECIAL_CHARS);
    $conteudoFILTTERCHARS=filter_input(INPUT_POST, $conteudoS, FILTER_SANITIZE_SPECIAL_CHARS);*/
    $connection=new PDO("mysql:dbname=portfolio; host=localhost","Gabriel","2007");
    $query="INSERT INTO msm(nome,email,assunto,content) VALUES(:n,:e,:a,:c);";
    $stmt=$connection->prepare($query);
    $stmt->bindValue(":n", $nomeS);
    $stmt->bindValue(":e",$emailS);
    $stmt->bindValue(":a",$assuntoS);
    $stmt->bindValue(":c",$conteudoS);
  $stmt->execute();
 
   echo "Salvo com Sucesso";
 
    

}
catch(PDOException $erro){
    echo "Erro do PDO: $erro->getMessage()";
}catch(Exception $erro){
echo "Erro: $erro->getMessage()";
return "Erro ao Salvar";
}
}
else {
    
    echo '{
      "Dadoss":"Vazio"  
    }';
    print_r($_POST);

    echo ".............GET...............";
    print_r($_GET);
}