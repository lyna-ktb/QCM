<?php 

class Reponse{
  private $textReponse;
  private $isBonneReponse; 
  
  const BONNE_REPONSE = true;


  public function __construct(string $text, bool $isTrue = false)
  {
    $this->setTextReponse($text);
    $this->setIsBonneReponse($isTrue);
  }

  public function setTextReponse($text){
    $this->textReponse = $text;
  }
  public function getTextReponse(){
    return $this->textReponse;
  }


  public function setIsBonneReponse($isTrue){
    $this->isBonneReponse = $isTrue;
  }
  public function getIsBonneReponse(){
    return $this->isBonneReponse;
  }

}