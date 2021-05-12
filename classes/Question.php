<?php

class Question{

  private $sujet;
  private $explication;
  private $reponseList = [];


  public function __construct($sujet)
  {
    $this->setSujet($sujet);
  }

  public function getSujet(){
    return $this->sujet;
  }
  public function setSujet(string $sujet){
      $this->sujet = $sujet;
  }

  public function getExplication(){
    return $this->explication;
  }
  public function setExplication(string $explication){
      $this->explication = $explication;
  }


  public function addReponse(Reponse $reponse){
      array_push($this->reponseList, $reponse);
  }
  public function getReponseList(){
    return $this->reponseList;
  }

  
}

/**
 * Question 
 *  -question
 *    -getQuestion
 *    -setQuestion
 *  -ListeReponse
 *    -Object Reponse  
 *    -Object Reponse  
 *    -Object Reponse
 *  -Explication
 *      getExplication
 *      setExplication
 * 
 */