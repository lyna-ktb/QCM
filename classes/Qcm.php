<?php

class Qcm
{
  private $QuestionList = [];

  public function addQuestion(Question $question)
  {
    array_push($this->QuestionList, $question);
  }
  public function getQuestion()
  {
    return $this->QuestionList;
  }

  public function generer()
  {
    foreach ($this->QuestionList as $question) {
      echo '<h4>' . $question->getSujet() . '</h4>' . '<br>';
      foreach ($question->getReponseList() as $reponse) {
?>
        <li>
          <input class="radio radio--bg" type="radio" name="<?= $question->getSujet() ?>" id="radio">
          <label for="radio"> <?= $reponse->getTextReponse() ?></label>
        </li>
        <br>
        
<?php
      }
    }
  }
}
