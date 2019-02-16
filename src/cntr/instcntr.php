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

class Instcntr extends AuxBase {
    public function returnResult ($answer) {
    
        ob_start();
        ob_end_clean();
        Header('Cache-Control: no-cache');
        Header('Pragma: no-cache');
        header('Content-type: application/json; charset=UTF-8');
        echo json_encode($answer);
    }
        
    public function manage($operation, $params)
    {
        $this -> log -> debug('operation', [$operation]);
        if($operation == 'updcodes') {
            $ai = $params['ai'];
            $ac = $params['ac'];
            $res = $this -> set_codes($ai, $ac);
            if($res[0] !== 'ok') {
                $this->returnResult(array('status' => 'error', 
                    'result' => $operation, 'data' => $res[1]));
                return;
            } else {
                $this->returnResult(array('status' => 'success', 
                    'result' => $operation, 'data'=>$res[1]));
                return;
            }
        }

        // ?
        $this->returnResult(array('status' => 'success',
            'result' => $operation, 'data'=>$operation));
    }
    
};

$manager = new Instcntr($log, $_REQUEST);

if (!empty($_REQUEST) && isset($_REQUEST['operation'])) {
    $manager->manage($_REQUEST['operation'], $_REQUEST);
}

?>
