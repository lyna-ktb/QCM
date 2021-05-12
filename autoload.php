<?php

function chargerClasse($classname)
{
  require 'classes/'.$classname.'.php';
}

spl_autoload_register('chargerClasse');