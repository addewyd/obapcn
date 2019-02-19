<?php
namespace Obapcn;


mb_internal_encoding("UTF-8");

require __DIR__ . '/../../vendor/autoload.php';
require_once './defines.php';
require_once './crdb.php';

require_once 'auxbase.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;


// create a log channel
$log = new Logger('obapcn');
$log->pushHandler(new StreamHandler(LOG_DIR, Logger::DEBUG));
$log -> debug('start', [HTTP_HOST]);

class Maincntr extends AuxBase {
    public function returnResult ($answer) {
    
        ob_start();
        ob_end_clean();
        Header('Cache-Control: no-cache');
        Header('Pragma: no-cache');
        header('Content-type: application/json; charset=UTF-8');
        echo json_encode($answer);
    }
    
    protected function upddb($dbname) {
        $this -> log -> debug('upddb', [$dbname]);
    }
    
    // .........................................................................
    
    public function manage($operation, $params)
    {
        $this -> log -> debug('operation', [$operation]);
        switch($operation) {
            case 'upddb': 
                $this -> upddb($params['dbname']);
                break;

            default: break;
        }
    }


}


$manager = new Maincntr($log, $_REQUEST);

if (!empty($_REQUEST) && isset($_REQUEST['operation'])) {
    $manager->manage($_REQUEST['operation'], $_REQUEST);
}
