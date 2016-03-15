<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Accordion Pro - a responsive accordion plugin for jQuery</title>
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
  <style>
    html { overflow-y: scroll }
    body { font: 14px/24px 'Helvetica Neue', Arial, sans-serif; color: #333; margin: 30px auto 60px; background: #fff }
    .wrapper { max-width: 900px; margin: 0 auto }
    .wrapper > ul { margin: 0; padding: 0 }
    .wrapper > ul > li { display: inline-block; padding-right: 12px; margin-right: 8px; border-right: 1px solid black; line-height: 12px; }
    .wrapper > ul > li a { text-decoration: none }
    .wrapper > ul > li a:hover { text-decoration: underline }
    .wrapper > div { margin: 0 auto }
    h2 { margin-top: 40px }
    textarea { width: 50%; height: 200px; margin-bottom: 60px; font-family: Menlo, Monaco, Consolas, "Courier New", monospace }
  </style>
  <link rel="stylesheet" href="../../css/accordionpro.css">
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
  <script src="../../js/jquery.accordionpro.min.js"></script>

</head>
<body>

  <div class="wrapper">

    <h1>Vertical Accordion Examples</h1>

    <?php

      // have to wrap bools in string for js
      $jQueryOptions = array(
        array(
          'desc' => 'Stitch theme, rounded with a dark blue colour scheme and disc icons',
          'orientation' => 'vertical',
          'theme' => 'stitch',
          'verticalWidth' => 680,
          'verticalHeight' => 550,
          'rounded' => true,
          'tab' => array(
            'selected' => 2,
            'icon' => 'disc'
          ),
          'colour' => array(
            'scheme' => 'dark-blue'
          )
        ),
        array(
          'desc' => 'Stitch theme with custom colours and icons',
          'orientation' => 'vertical',
          'theme' => 'stitch',
          'verticalWidth' => 680,
          'verticalHeight' => 550,
          'tab' => array(
            'icon' => 'custom',
            'customIcons' => array(
              '../_build/documentation/img-demo/user-alt.png',
              '../_build/documentation/img-demo/chat-alt.png',
              '../_build/documentation/img-demo/letter-alt.png',
              '../_build/documentation/img-demo/search-alt.png',
              '../_build/documentation/img-demo/leaf-alt.png'
            ),
            'customColours' => array(
              '#c25252',
              '#ca9859',
              '#96ba5f',
              '#59abb7',
              '#bb6098'
            )
          ),
        ),
        array(
          'desc' => 'Bordered theme with red colour scheme, rounded, custom tab colours, square icons',
          'orientation' => 'vertical',
          'theme' => 'bordered',
          'verticalWidth' => 680,
          'verticalHeight' => 550,
          'rounded' => true,
          'colour' => array(
            'scheme' => 'red'
          ),
          'tab' => array(
            'selected' => 4,
            'icon' => 'square'
          )
        ),
        array(
          'desc' => 'Bordered theme with green gradient colour scheme and chevron icons',
          'orientation' => 'vertical',
          'theme' => 'bordered',
          'verticalWidth' => 680,
          'verticalHeight' => 550,
          'colour' => array(
            'scheme' => 'green',
            'style' => 'gradient'
          ),
          'tab' => array(
            'selected' => 3,
            'icon' => 'chevron'
          )
        )
      );

      foreach ($jQueryOptions as $key => $value) { ?>
        <h2><?php echo $value['desc']; ?></h2>

        <div id="<?php echo $value['theme'] . $key; ?>">
            <ol>
                <li>
                    <h2><span>Slide One</span></h2>
                    <div>
                        <img src="../../_build/documentation/img-demo/1.jpg" alt="image" />
                        <p class="ap-caption">Slide One</p>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Two</span></h2>
                    <div>
                        <img src="../../_build/documentation/img-demo/2.jpg" alt="image" />
                        <p class="ap-caption">Slide Two</p>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Three</span></h2>
                    <div>
                        <img src="../../_build/documentation/img-demo/3.jpg" alt="image" />
                        <p class="ap-caption">Slide Three</p>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Four</span></h2>
                    <div>
                        <img src="../../_build/documentation/img-demo/4.jpg" width="768" alt="image" />
                        <p class="ap-caption">Slide Four</p>
                    </div>
                </li>
                <li>
                    <h2><span>Slide Five</span></h2>
                    <div>
                        <img src="../../_build/documentation/img-demo/5.jpg" alt="image" />
                        <p class="ap-caption">Slide Five</p>
                    </div>
                </li>
            </ol>
            <noscript>
                <p>Please enable JavaScript to get the full experience.</p>
            </noscript>

            <?php unset($value["desc"]); ?>

            <script>
              (function() {
                $('#<?php echo $value["theme"] . $key; ?>').accordionPro(<?php echo json_encode($value); ?>);
              })();
            </script>
        </div>

        <textarea><?php echo "$('#" . $value["theme"] . $key . "').accordionPro(" . json_encode($value) . ");"; ?></textarea>

    <?php
      }
    ?>
  </div>

</body>
</html>