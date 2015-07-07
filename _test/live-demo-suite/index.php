<?php
  // ini_set('display_errors',1);
  // ini_set('display_startup_errors',1);
  // error_reporting(-1);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Accordion Pro Demo Suite</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <style>
      body { padding-top: 30px }
      h1, h3 { font-size: 24px; border-bottom: 2px solid #333333; margin: 30px 0 10px; text-shadow: 1px 1px 0 white; clear: both; }
      h1 { overflow: hidden; line-height: 90px; border-top: 2px solid #333333; }
      h1 img { width: 80px; height: 80px; float: right; margin: 5px 0 5px 5px; }
      .container > p { font-size: 16px; line-height: 1.5em; margin-bottom: 15px; }
      .container > p:last-of-type { margin-bottom: 30px }
      fieldset {
        width: 100%;
        margin-bottom: 30px;
        -webkit-column-break-inside: avoid;
        -moz-column-break-inside: avoid;
        column-break-inside: avoid;
        transform: translateZ(0); /* fixes Chrome multi column bug. */
      }
      fieldset .form-group { width: 100%; margin-bottom: 5px !important; position: relative; }
      fieldset .form-control { display: inline-block; }
      fieldset p { position: absolute; top: 26px; left: 0; z-index: 100; display: none; padding: 5px 10px;
        background: #0074a2; color: white; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1); border-radius: 3px; width: 239px }
      fieldset i { vertical-align: middle; display: inline-block; height: 16px; width: 16px; background: #0074a2; color: white; font-style: normal;
        text-align: center; border-radius: 20px; font-weight: normal; font-size: 12px; line-height: 18px; margin-right: 6px; cursor: pointer }
      label { width: 40% }
      input, select { width: 40% !important }
      #linkable ul { margin: 0; padding: 0; width: 100% }
      #linkable li { display: inline-block }
      textarea { width: 50%; height: 200px; margin-bottom: 60px; font-family: Menlo, Monaco, Consolas, "Courier New", monospace }
      #reset { float: right }

      @media (min-width: 992px) {
        .container { width: 930px }
      }

      @media (min-width: 600px) {
        form {
          -webkit-column-count: 2; -moz-column-count: 2; column-count: 2;
          -webkit-column-gap: 30px; -moz-column-gap: 30px; column-gap: 30px;
          -webkit-column-fill: balance; -moz-column-fill: balance; column-fill: balance;
        }
      }
    </style>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script src="js/jquery.accordionpro.min.js"></script>
    <script src="js/analytics.js"></script>
</head>
<body>

<div class="container">

  <div id="demo" class="accordionPro">
      <ol>
          <li>
              <h2><span>Slide One</span></h2>
              <div>
                  <img src="img-demo/1.jpg" alt="image" />
              </div>
          </li>
          <li>
              <h2><span>Slide Two</span></h2>
              <div>
                  <img src="img-demo/2.jpg" alt="image" />
              </div>
          </li>
          <li>
              <h2><span>Slide Three</span></h2>
              <div>
                  <img src="img-demo/3.jpg" alt="image" />
              </div>
          </li>
          <li>
              <h2><span>Slide Four</span></h2>
              <div>
                  <img src="img-demo/4.jpg" alt="image" />
              </div>
          </li>
          <li>
              <h2><span>Slide Five</span></h2>
              <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mene ergo et Triarium dignos existimas, apud quos turpiter loquare? <a href='http://loripsum.net/' target='_blank'>Quibus ego vehementer assentior.</a> Res enim se praeclare habebat, et quidem in utraque parte. Vitae autem degendae ratio maxime quidem illis placuit quieta. An vero, inquit, quisquam potest probare, quod perceptfum, quod. Deinde qui fit, ut ego nesciam, sciant omnes, quicumque Epicurei esse voluerunt? Hoc est dicere: Non reprehenderem asotos, si non essent asoti. <mark>Prioris generis est docilitas, memoria;</mark> Duo Reges: constructio interrete. </p>

                <p>Sed virtutem ipsam inchoavit, nihil amplius. <a href='http://loripsum.net/' target='_blank'>Cave putes quicquam esse verius.</a> Eam si varietatem diceres, intellegerem, ut etiam non dicente te intellego; <b>Ecce aliud simile dissimile.</b> <mark>Qui est in parvis malis.</mark> Bestiarum vero nullum iudicium puto. Ita multo sanguine profuso in laetitia et in victoria est mortuus. </p>

                <ul>
                  <li>Eodem modo is enim tibi nemo dabit, quod, expetendum sit, id esse laudabile.</li>
                  <li>Quis contra in illa aetate pudorem, constantiam, etiamsi sua nihil intersit, non tamen diligat?</li>
                  <li>Fortitudinis quaedam praecepta sunt ac paene leges, quae effeminari virum vetant in dolore.</li>
                  <li>An vero, inquit, quisquam potest probare, quod perceptfum, quod.</li>
                  <li>Si enim, ut mihi quidem videtur, non explet bona naturae voluptas, iure praetermissa est;</li>
                  <li>Nos vero, inquit ille;</li>
                </ul>

                <p>Ut in geometria, prima si dederis, danda sunt omnia. <i>Si longus, levis dictata sunt.</i> Egone quaeris, inquit, quid sentiam? <a href='http://loripsum.net/' target='_blank'>Quid de Pythagora?</a> </p>
              </div>
          </li>
      </ol>
      <noscript>
          <p>Please enable JavaScript to get the full experience.</p>
      </noscript>
  </div>

  <h1>
    <span>Accordion Pro Demo Suite</span>
    <a href="http://codecanyon.net/item/accordion-pro/1506395?ref=StitchUI" class="tn buy right" title="horizontal accordion plugin for WordPress"><img src="/wp-content/uploads/thumbnail_accordion_pro_wp.jpg" alt="Accordion Pro WP"></a>
    <a href="http://codecanyon.net/item/accordion-pro-js-responsive-jquery-accordion/5480772?ref=StitchUI" class="tn buy right" title="responsive jQuery accordion plugin"><img src="/wp-content/uploads/thumbnail_accordion_pro_js.jpg" alt="Accordion Pro JS"></a>
  </h1>
  <p>This demo suite is intended to help users of Accordion Pro JS and Accordion Pro WP design their own accordion implementation.  Use to options below to configure
    your setup visually - any changes made will be reflected in the plugin instance above.</p>
  <p>As an added bonus, users of Accordion Pro JS can use the generated code output to instantiate the plugin on their own websites.</p>
  <p><b>Please note: </b>not all of the tab customisation options are available in this demo. For information on how to set set custom colours and icons for each tab, please see the documentation. <b>Some of these features are not yet available in Accordion Pro WP.</b></p>
  <p><b><a href="http://codecanyon.net/item/accordion-pro-js-responsive-jquery-accordion/5480772?ref=StitchUI">Buy Accordion Pro JS</a></b> or <b><a href="http://codecanyon.net/item/accordion-pro/1506395?ref=StitchUI">Buy Accordion Pro WP</a></b> from CodeCanyon <b>now!</b></p>

  <form class="form-inline" method="GET" name="demo">

  <?php
    $defaults = array(
      'Layout' => array(
        'orientation' => array(
          'desc' => 'Create a <b>horizontal</b> or <b>vertical</b> accordion',
          'value' => array('horizontal', 'vertical')
        ),
        'startClosed' => array(
          'desc' => 'Start accordion in a closed position',
          'value' => false
        )
      ),

      'Aesthetics' => array(
        'theme' => array(
          'desc' => 'Select a theme - <b>basic</b>, <b>bordered</b>, <b>stitch</b> or <b>transparent</b>',
          'value' => array('basic', 'bordered', 'stitch', 'transparent')
        ),

        'colour.scheme' => array(
          'desc' => 'Colour scheme, <b>charcoal</b> set by default',
          'value' => array('charcoal', 'white', 'silver', 'grey', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'light-blue', 'blue', 'dark-blue')
        ),

        'colour.style' => array(
          'desc' => 'Choose from <b>flat</b> or <b>gradient</b>',
          'value' => array('flat', 'gradient')
        ),

        'rounded' => array(
          'desc' => 'Display square or rounded corners where supported',
          'value' => false
        ),
        'rtl' => array(
          'desc' => 'Set right to left layout',
          'value' => false
        )
      ),

      'Horizontal Accordion Options' => array(
        'responsive' => array(
          'desc' => 'Accordion will adapt itself to the page layout, based on width of parent element',
          'value' => true
        ),
        'horizontalWidth' => array(
          'desc' => 'Base width; fixed (px [integer]) - responsive scaling is relative to this value',
          'value' => 900
        ),
        'horizontalHeight' => array(
          'desc' => 'Base height; fixed (px [integer]) - responsive scaling is relative to this value',
          'value' => 300
        )
      ),

      'Vertical Accordion Options' => array(
        'verticalWidth' => array(
          'desc' => 'Base width; Fixed (px [integer]) or fluid (% [string])',
          'value' => '100%'
        ),
        'verticalHeight' => array(
          'desc' => 'Base height; fixed (px [integer])',
          'value' => 500
        ),
        'verticalSlideHeight' => array(
          'desc' => 'Vertical accordion slide heights can be fixed or fitToContent',
          'value' => array('fixed', 'fitToContent')
        )
      ),

      'Tab Options' => array(
        'tab.size' => array(
          'desc' => 'Set tab size',
          'value' => 48
        ),
        'tab.fontSize' => array(
          'desc' => 'Set tab font size',
          'value' => 16
        ),
        'tab.font' => array(
          'desc' => 'Set tab font family',
          'value' => array('Arial', 'Verdana', 'Georgia', 'Monospace', 'Comic Sans MS')
        ),
        'tab.icon' => array(
          'desc' => 'Set tab icon, choose from <b>none</b>, <b>number</b>, <b>chevron</b>, <b>disc</b>, <b>square</b>, and <b>custom</b>',
          'value' => array('number', 'chevron', 'disc', 'square', 'custom', 'none')
        ),
        'tab.customIcons' => array(
          'desc' => 'Set a custom image for each icon',
          'value' => 'Not available in demo.'
        ),
        'tab.customColours' => array(
          'desc' => 'Set a custom colour for each tab',
          'value' => 'Not available in demo.'
        ),
        'tab.selected' => array(
          'desc' => 'Display slide number (n) on page load',
          'value' => 1
        )
      ),

      'Panel Options' => array(
        'panel.scrollable' => array(
          'desc' => 'Trigger scrollbar on vertical overflow',
          'value' => false
        ),
        'panel.scaleImages' => array(
          'desc' => 'Scale images to fit slide width and height',
          'value' => true
        )
      ),

      'Events' => array(
        'activateOn' => array(
          'desc' => 'Activate accordion either on <b>click</b> or <b>mouseover</b>',
          'value' => array('click', 'mouseover')
        )
      ),

      'Animations' => array(
        'autoPlay' => array(
          'desc' => 'Automatically cycle through slides',
          'value' => false
        ),
        'cycleSpeed' => array(
          'desc' => 'Set time between slide cycles (ms)',
          'value' => 6000
        ),
        'slideSpeed' => array(
          'desc' => 'Set slide animation speed',
          'value' => 800,
        )
      ),

      'Miscellaneous Options' => array(
        'pauseOnHover' => array(
          'desc' => 'Pause animation when hovering mouse over accordion',
          'value' => true,
        ),
        'linkable' => array(
          'desc' => 'Link to slides via hash',
          'value' => false
        )
      )
    );

    // flatten top level of defaults so that structure is same as $_GET array
    $flatten = array();
    foreach ($defaults as $default => $value) {
      foreach ($value as $key => $val) {
        foreach ($val as $k => $v) {
          if ($k === 'value') {
            switch (gettype($v)) {
              case 'array': // push non-dupes to new array
                $flatten[$key] = $v[0];
                break;
              default:
                $flatten[$key] = $v;
                break;
            }
          }
        }
      }
    }

    // get $_GET if exists
    if (isset($_GET['AP'])) {
      // TODO: filter
      $args = $_GET['AP'];

      // all GET items are strings, so cast integers
      foreach ($args as $key => $value) {
        if (gettype($flatten[$key]) === 'boolean') {
          $args[$key] = ($value === 'true') ? true : false;
        }
        if (gettype($flatten[$key]) === 'integer') {
          $args[$key] = (int) $value;
        }
      }

    } else {
      // defaults
      $args = $flatten;
    }

    foreach ($defaults as $section => $def) {
        echo "<fieldset>";
        echo "<legend>$section</legend>";
        foreach ($def as $key => $value) {
            echo "<div class='form-group'>";
            echo "<i>?</i>";
            echo "<label for='$key' class='control-label'>$key</label>";
            $value = array_reverse($value);
            foreach ($value as $k => $v) {
              if ($k == 'desc') {
                echo "<p>$v</p>";
                echo "</div>";
              } else {
                $t = gettype($v);

                switch ($t) {
                  case 'boolean':
                    echo "<select id='$key' class='form-control' name='AP[$key]'>";
                    if ($args[$key]) {
echo <<<EOT
                        <option name="false" value="false">false</option>
                        <option name="true" value="true" selected="selected">true</option>
EOT;
                    } else {
echo <<<EOT
                        <option name="false" value="false" selected="selected">false</option>
                        <option name="true" value="true">true</option>
EOT;
                    }
                    echo "</select>";
                    break;
                  case 'integer':
                  case 'string':
                    echo "<input type='text' id='$key' class='form-control' name='AP[$key]' value='$args[$key]' />";
                    break;
                  case 'array':
                    echo "<select id='$key' class='form-control' name='AP[$key]'>";
                    foreach ($v as $a => $b) {
                      // if $_GET opt val...
                      $selected = $b === $args[$key] ? 'selected=selected' : '';
                      echo "<option name='$b' value='$b' autocomplete='off' $selected>$b</option>";
                    }
                    echo "</select>";
                  default:
                    break;
                }

              }
            }
        }
        echo "</fieldset>";
    }
  ?>

  </form>

  <div id="linkable">
    <ul>
      <li><a href="#demo-slide-1">#demo-slide-1</a></li>
      <li><a href="#demo-slide-2">#demo-slide-2</a></li>
      <li><a href="#demo-slide-3">#demo-slide-3</a></li>
      <li><a href="#demo-slide-4">#demo-slide-4</a></li>
      <li><a href="#demo-slide-5">#demo-slide-5</a></li>
    </ul>
  </div>

  <?php
    // create js object from defaults or passed in options
    // strip defaults if necessary
    $output = array();

    foreach ($args as $key => $value) {
      switch (gettype($value)) {
        case 'array': // push non-dupes to new array
          if ($flatten[$key][0] !== $value[0]) {
            $output[$key] = $value[0];
          }
          break;
        case 'boolean': // dedupe, cast bool to str
          if ($flatten[$key] !== $value) {
            $output[$key] = ($value) ? 'true' : 'false';
          }
          break;
        default:
          if ($flatten[$key] !== $value) {
            $output[$key] = $value;
          }
          break;
      }
    }

    // if default settings, cast array to string
    if (empty($output)) $output = null;

    // echo "<pre>";
    // print_r(json_encode($output));
    // echo "</pre>";
  ?>

  <input type="hidden" id="demo-output" value='<?php echo json_encode($output); ?>' />

  <div id="output">
    <h3>Output</h3>
    <textarea></textarea>
    <input id='reset' type='button' value='reset' />
  </div>

</div>

</body>
</html>