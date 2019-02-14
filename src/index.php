<?php

namespace Obapcn;
require_once("cntr/db.php");
require __DIR__ . '/../vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

?>
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <div id="b">obapcn</div>
    <script src='https://api.bitrix24.com/api/v1/'></script>
    <script src="./main.js"></script>
<?php
    dbtest();
?>
</body>

</html>