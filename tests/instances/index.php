<html>
<head>
<meta charset="utf-8" />
<title>Accordion Pro - a responsive accordion plugin for jQuery</title>
  <style>
    html { overflow-y: scroll }
    body { font: 14px/24px 'Helvetica Neue', Arial, sans-serif; color: #333; margin: 30px auto 60px; background: #eee }
    .wrapper { width: 100% }
    h1, dd { margin: 0 }
    dt { font-weight: bold }
    figure { display: block; width: 100%; height: 100%; margin: 0 }
    figcaption { padding: 10px 15px; position: absolute; bottom: 20px; right: 30px; z-index: 3; background: black; background: rgba(0,0,0,0.7); color: white;
        -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px }
  </style>
  <link rel="stylesheet" href="../../build/accordionpro_js/css/accordionpro.min.css">
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
  <script src="../../build/accordionpro_js/js/jquery.accordionpro.min.js"></script>
</head>
<body>

  <div class="wrapper">
    <?php
      // have to wrap bools in string for js

      $jQueryOptions = array(
        'one' => array(
          'orientation' => 'horizontal',
          'theme'       => 'basic'
        ),
        'two' => array(
          'orientation' => 'horizontal',
          'theme'       => 'dark'
        )
      );

      foreach ($jQueryOptions as $key => $value) { ?>
        <h2><?php echo $key; ?></h2>
        <div id="<?php echo $key; ?>">
            <ol>
                <li>
                    <h2><span>Slide One</span></h2>
                    <div>
                        <figure>
                            <img src="../../build/accordionpro_js/img-demo/1.jpg" alt="image" />
                            <figcaption class="ap-caption">Slide One</figcaption>
                        </figure>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Two</span></h2>
                    <div>
                        <figure>
                            <p>Some text goes in here.</p>
                            <!-- <iframe width="715" height="320" src="http://www.youtube.com/embed/QH2-TGUlwu4" frameborder="0" allowfullscreen></iframe> -->
                            <figcaption class="ap-caption">Slide Two</figcaption>
                        </figure>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Three</span></h2>
                    <div>
                        <figure>
                            <img src="../../build/accordionpro_js/img-demo/3.jpg" alt="image" />
                            <figcaption class="ap-caption">Slide Three</figcaption>
                        </figure>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Four</span></h2>
                    <div>
                        <figure>
                            <img src="../../build/accordionpro_js/img-demo/4.jpg" width="768" alt="image" />
                            <figcaption class="ap-caption">Slide Four</figcaption>
                        </figure>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Five</span></h2>
                    <div>
                        <figure>
                            <img src="../../build/accordionpro_js/img-demo/5.jpg" alt="image" />
                            <figcaption class="ap-caption">Slide Five</figcaption>
                        </figure>
                    </div>
                </li>
            </ol>
            <noscript>
                <p>Please enable JavaScript to get the full experience.</p>
            </noscript>
            <script>
              (function() {
                $('#<?php echo $key; ?>').accordionPro(<?php echo json_encode($value); ?>);
              })();
            </script>
        </div>
        <br /><br />
    <?php } ?>
  </div>

</body>
</html>