<?php

/**
 * @file
 * Contains \Drupal\witai\Controller\HelloController.
 */

namespace Drupal\witai\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class witaiController extends ControllerBase {

  function witai_get_apikey() {

    $obj = new \stdClass();
    $obj->label="API Keys for the assistent";
    $obj->data = array ( 'wit' => 'Your API Key here', 'flickr'=>'Your flickr API Key here',);

    return new JsonResponse($obj);
  }

  public function content() {

    // Start building the content.
    $build = array();
    // Main container DIV. We give it a unique ID so that the JavaScript can
    // find it using jQuery.
    $build['content'] = array(
      '#markup' => '<center style="text-align: center;"> <div id="microphone"></div></center> <pre id="result"></pre>
      <div id="info"></div> <div id="error"></div></div>  <div id="results"> </div> <gcse:searchresults-only></gcse:searchresults-only>
      <div id="images"></div><a href="#" id="demo"></a',
    );



    // Attach library containing css and js files.
    // Add our script. It is tiny, but this demonstrates how to add it. We pass
    // our module name followed by the internal library name declared in
    // libraries yml file.


    $build['#attached']['library'][] = 'witai/witai';
    $build['#attached']['library'][] = 'witai/plugins';
    $build['#attached']['library'][] = 'witai/app';
    $build['#attached']['library'][] = 'witai/speech';
    $build['#attached']['library'][] = 'witai/google_customsearch';
    $build['#attached']['library'][] = 'witai/google_cal';
    $build['#attached']['library'][] = 'witai/witai_stylesheet';
    $build['#attached']['library'][] = 'witai/twig';

    return $build;
  }
}


?>
