<?php
  ini_set('display_errors',1);
  ini_set('display_startup_errors',1);
  error_reporting(-1);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Accordion Pro Demo Suite</title>

    <link rel="stylesheet" href="../../build/accordionpro_js/css/accordionpro.min.css">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.min.css" rel="stylesheet">

    <style>
      #demo { text-align: center; margin: 0 auto }
    </style>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script src="../../build/accordionpro_js/js/jquery.accordionpro.min.js"></script>
</head>
<body>

<?php

    $options = array(
        'Layout' => array(
            'orientation' => array(
              'label' => 'Create a <b>horizontal</b> or <b>vertical</b> accordion',
              'value' => array('horizontal', 'vertical')
            ),
            'startClosed' => array(
              'label' => 'Start accordion in a closed position',
              'value' => false
            ),
            'firstSlide' => array(
              'label' => 'Display slide number (n) on page load',
              'value' => 1
            )
        ),
        'Aesthetics' => array(
            'theme' => array(
              'label' => 'Select a theme - <b>basic</b>, <b>dark</b>, <b>light</b>, <b>stitch</b> or <b>transparent</b>',
              'value' => array('basic', 'dark', 'light', 'stitch', 'transparent')
            ),
            'rounded' => array(
              'label' => 'Display square or rounded corners where supported',
              'value' => false
            ),
            'rtl' => array(
              'label' => 'Set right to left layout',
              'value' => false
            ),
            'showSlideNumbers' => array(
              'label' => 'Display numbers on slides',
              'value' => true
            )
        ),
        'Horizontal Accordion Options' => array(
            'responsive' => array(
              'label' => 'Accordion will adapt itself to the page layout, based on width of parent element',
              'value' => true
            ),
            'scaleImages' => array(
              'label' => 'Scale images to fit slide width and height',
              'value' => true
            ),
            'horizontalWidth' => array(
              'label' => 'Base width; fixed (px [integer]) - responsive scaling is relative to this value',
              'value' => 900
            ),
            'horizontalHeight' => array(
              'label' => 'Base height; fixed (px [integer]) - responsive scaling is relative to this value',
              'value' => 300
            )
        ),
        'Vertical Accordion Options' => array(
            'verticalWidth' => array(
              'label' => 'Base width; Fixed (px [integer]) or fluid (% [string])',
              'value' => array('integer', 'percentage')
            ),
            'verticalHeight' => array(
              'label' => 'Base height; fixed (px [integer])',
              'value' => 500
            ),
            'verticalSlideHeight' => array(
              'label' => 'Vertical accordion slide heights can be fixed or fitToContent',
              'value' => array('fixed', 'fitToContent')
            )
        ),
        'Events' => array(
            'activateOn' => array(
              'label' => 'Activate accordion either on <b>click</b> or <b>mouseover</b>',
              'value' => array('click', 'mouseover')
            ),
            'touchEnabled'          => array(
              'label' => 'Are touch events enabled?',
              'value' => true
            )
        ),
        'Animations' => array(
            'autoPlay' => array(
              'label' => 'Automatically cycle through slides',
              'value' => false
            ),
            'cycleSpeed' => array(
              'label' => 'Set time between slide cycles (ms)',
              'value' => 6000
            ),
            'slideSpeed' => array(
              'label' => 'Set slide animation speed',
              'value' => 800,
            ),
            'easing' => array(
              'label' => 'Set animation easing',
              'value' => array('linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out')
            )
        ),
        'Miscellaneous Options' => array(
            'pauseOnHover' => array(
              'label' => 'Pause animation when hovering mouse over accordion',
              'value' => true,
            ),
            'linkable' => array(
              'label' => 'Link to slides via hash',
              'value' => false
            )
        )
    );

    foreach ($options as $section => $opt) {
        echo "<h2>$section<h2>";
        foreach ($opt as $key => $value) {
            echo "<h3>$key</h3>";
            foreach ($value as $k => $v) {
              if ($k == 'label') {
                echo "<p><label for='$key'>$v</label>";
              } else {
                $t = gettype($v);

                switch ($t) {
                  case 'boolean':
                  ?>
                    <p>
                      <label for="<?php echo $key; ?>"><?php echo $key; ?></label>
                      <select id="<?php echo $key; ?>" name="<?php echo $key; ?>">
                        <option value="false" selected="<?php echo $v; ?>">false</option>
                        <option value="true" selected="<?php echo $v; ?>">true</option>
                      </select>
                    </p>
                  <?php
                    break;
                  case 'integer':
                    echo 'integer';
                    break;
                  case 'array':
                    echo 'array';
                  default:
                    break;
                }
              }
            }
        }
    }
?>

  <div class="container">
      <div id="demo">
          <ol>
              <li>
                  <h2><span>Slide One</span></h2>
                  <div>
                      <img src="../../build/accordionpro_js/img-demo/1.jpg" alt="image" />
                      <p class="ap-caption">Slide One</p>
                  </div>
              </li>
              <li>
                  <h2><span>Slide Two</span></h2>
                  <div>
                      <img src="../../build/accordionpro_js/img-demo/2.jpg" alt="image" />
                      <p class="ap-caption">Slide One</p>
                  </div>
              </li>
              <li>
                  <h2><span>Slide Three</span></h2>
                  <div>
                      <img src="../../build/accordionpro_js/img-demo/3.jpg" alt="image" />
                      <p class="ap-caption">Slide One</p>
                  </div>
              </li>
              <li>
                  <h2><span>Slide Four</span></h2>
                  <div>
                      <img src="../../build/accordionpro_js/img-demo/4.jpg" alt="image" />
                      <p class="ap-caption">Slide One</p>
                  </div>
              </li>
              <li>
                  <h2><span>Slide Five</span></h2>
                  <div>
                      <img src="../../build/accordionpro_js/img-demo/5.jpg" alt="image" />
                      <p class="ap-caption">Slide One</p>
                  </div>
              </li>
          </ol>
          <noscript>
              <p>Please enable JavaScript to get the full experience.</p>
          </noscript>
      </div>

    <h2>Accordion Pro Demo Suite</h2>





  </div>







  <script src="js/demosuite.js"></script>

</body>
</html>