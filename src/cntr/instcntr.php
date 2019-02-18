<?php
namespace Obapcn;


mb_internal_encoding("UTF-8");

require __DIR__ . '/../../vendor/autoload.php';
require_once './defines.php';
require_once './crdb.php';

require_once 'auxbaseinst.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;


// create a log channel
$log = new Logger('obapcn');
$log->pushHandler(new StreamHandler(LOG_DIR, Logger::DEBUG));
$log -> debug('start', [HTTP_HOST]);

class Instcntr extends AuxBaseInst {
    public function returnResult ($answer) {
    
        ob_start();
        ob_end_clean();
        Header('Cache-Control: no-cache');
        Header('Pragma: no-cache');
        header('Content-type: application/json; charset=UTF-8');
        echo json_encode($answer);
    }
    
    protected function updcodes($ai, $ac) {
            $res = $this -> set_codes($ai, $ac);
            if($res[0] !== 'ok') {
                $this->returnResult(array('status' => 'error', 
                    'result' => 'updcodes', 'data' => $res[1]));
            } else {
                $this->returnResult(array('status' => 'success', 
                    'result' => 'updcodes', 'data'=>$res[1]));
            }        
    }


    protected function crdb() {
        
        return TRUE;
    }
    
    public function manage($operation, $params)
    {
        $this -> log -> debug('operation', [$operation]);
        if($operation == 'updcodes') {
            $this -> updcodes($params['ai'], $params['ac']);
        }

        if($operation == 'updcodes_crdb') {
            if($this -> crdb()) {
                updcodes($params['ai'], $params['ac']);
            }        
            else {
                $this->returnResult(array('status' => 'error', 
                    'result' => $operation, 'data' => $res[1]));

            }
        }
    }
};

$manager = new Instcntr($log, $_REQUEST);

if (!empty($_REQUEST) && isset($_REQUEST['operation'])) {
    $manager->manage($_REQUEST['operation'], $_REQUEST);
}

?>
