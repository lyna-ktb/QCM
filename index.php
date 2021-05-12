<?php include "partiels/header.php" ?>


<section>
  <div class="container max-width-adaptive-lg">
    <div class="margin-bottom-lg">
      <h1 class="text-center">QCM</h1>
    </div>

    <div class="grid gap-sm">
      <div class="bg-contrast-lower radius-md padding-md text-center flex@md flex-column@md col-4@md">
        <svg class="icon icon--xl color-contrast-low margin-x-auto margin-bottom-xxxxs" aria-hidden="true" width="64" height="64" viewBox="0 0 64 64">
          <polygon points="2 36 17 2 26 2 15 36 26 36 26 62 2 62 2 36" />
          <polygon points="38 36 53 2 62 2 51 36 62 36 62 62 38 62 38 36" />
        </svg>

        <blockquote class="line-height-md margin-bottom-md 1">
          <?php
          include './autoload.php';
          $qcm = new Qcm();
          $question1 = new Question('A quoi sert SQL'); ?>
          </legend>

          <ul class="flex flex-column gap-xxxs">
            <?php
            $question1->addReponse(new Reponse('envoie une requête au serveur Web (HTTP) '));
            $question1->addReponse(new Reponse('manipulation et le contrôle de sécurité de données', Reponse::BONNE_REPONSE));
            $question1->addReponse(new Reponse("soustraire du système d'exploitation"));
            $question1->setExplication('Sans commentaires si vous avez eu faux :-°');
            $qcm->addQuestion($question1);

            // $qcm->setAppreciation(array('0-10' => 'Pas top du tout ...',
            //                             '10-20' => 'Très bien ...'));
            $qcm->generer();  ?>
        </blockquote>

      </div>

      <div class="bg-contrast-lower radius-md padding-md text-center flex@md flex-column@md col-4@md">
        <svg class="icon icon--xl color-contrast-low margin-x-auto margin-bottom-xxxxs" aria-hidden="true" width="64" height="64" viewBox="0 0 64 64">
          <polygon points="2 36 17 2 26 2 15 36 26 36 26 62 2 62 2 36" />
          <polygon points="38 36 53 2 62 2 51 36 62 36 62 62 38 62 38 36" />
        </svg>

        <blockquote class="line-height-md margin-bottom-md">
          <blockquote class="line-height-md margin-bottom-md 2">
            <?php
            $qcm = new Qcm();
            $question1 = new Question('POO signifie'); ?>
            </legend>

            <ul class="flex flex-column gap-xxxs">
              <?php
              $question1->addReponse(new Reponse('Php Orienté Objet'));
              $question1->addReponse(new Reponse('ProgrammatiOn Orientée'));
              $question1->addReponse(new Reponse('Programmation Orientée Objet', Reponse::BONNE_REPONSE));
              $question1->setExplication('Sans commentaires si vous avez eu faux :-°');
              $qcm->addQuestion($question1);

              // $qcm->setAppreciation(array('0-10' => 'Pas top du tout ...',
              //                             '10-20' => 'Très bien ...'));
              $qcm->generer();  ?>
          </blockquote>

      </div>

      <div class="bg-contrast-lower radius-md padding-md text-center flex@md flex-column@md col-4@md">
        <svg class="icon icon--xl color-contrast-low margin-x-auto margin-bottom-xxxxs" aria-hidden="true" width="64" height="64" viewBox="0 0 64 64">
          <polygon points="2 36 17 2 26 2 15 36 26 36 26 62 2 62 2 36" />
          <polygon points="38 36 53 2 62 2 51 36 62 36 62 62 38 62 38 36" />
        </svg>

        <blockquote class="line-height-md margin-bottom-md">
          <blockquote class="line-height-md margin-bottom-md">
            <blockquote class="line-height-md margin-bottom-md 3">
              <?php
              $qcm = new Qcm();
              $question1 = new Question('Acronyme récursif pour PHP'); ?>
              </legend>

              <ul class="flex flex-column gap-xxxs">
                <?php
                $question1->addReponse(new Reponse('Hypertext Markup Language'));
                $question1->addReponse(new Reponse('Preprocessor Hypertext'));
                $question1->addReponse(new Reponse(' Hypertext Preprocessor', Reponse::BONNE_REPONSE));
                $question1->setExplication('Sans commentaires si vous avez eu faux :-°');
                $qcm->addQuestion($question1);

                // $qcm->setAppreciation(array('0-10' => 'Pas top du tout ...',
                //                             '10-20' => 'Très bien ...'));
                $qcm->generer();  ?>
            </blockquote>
      </div>
    </div>
    
  <button class="btn " aria-controls="dialog-sticky">VALIDER</button>
  

  <div id="dialog-sticky" class="dialog dialog--sticky js-dialog" data-animation="on">
    <div class="dialog__content max-width-xxs" role="alertdialog" aria-labelledby="dialog-sticky-title" aria-describedby="dialog-sticky-description">
      <div class="text-component">
        <h4 id="dialog-sticky-title">Are you sure you want to permanently delete this file?</h4>
        <p id="dialog-sticky-description">This action cannot be undone.</p>
      </div>

      <footer class="margin-top-md">
        <div class="flex justify-end gap-xs flex-wrap">
          <button class="btn btn--subtle js-dialog__close">Cancel</button>
          <button class="btn btn--accent">Delete</button>
        </div>
      </footer>
    </div>
  </div>
  </div>
  </div>
</section>




<?php include "partiels/footer.php" ?>